import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {
  isPdfDownloaded,
  downloadPdf,
  deletePdf,
} from '../services/fileService';
import { logError } from '../utils/logger';
import {
  saveContentList,
  getCachedContentList,
} from '../services/contentCache';
import { API_BASE_URL } from '@env';

export default function ContentLibraryScreen({ navigation, route }: any) {
  const [search, setSearch] = useState('');
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [isOnline, setIsOnline] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { categoryKey, categoryTitle } = route.params;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadOfflineContent(); // always load cache first

    if (isOnline) {
      fetchContent(); // refresh if online
    }
  }, [isOnline]);

  useEffect(() => {
    navigation.setOptions({ title: categoryTitle });
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        `http://10.199.23.15:3000/content?category=${categoryKey}`,
        {
          headers: {
            'x-admin-key': 'z9srWb95rY5YeiJy9GuchsD9VI3C4D',
          },
        },
      );

      console.log('Base URL:', API_BASE_URL);

      const mapped = response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        excerpt: item.description,
        fileName: item.fileName,
        fileUrl: `http://10.199.23.15:3000/content/${item.id}/file`,
        categoryKey: item.category?.key,
      }));

      setPdfs(mapped);
      await saveContentList(categoryKey, mapped);
      await checkDownloads(mapped);
    } catch (error) {
      logError('fetchContent', error);
    }
  };

  const loadOfflineContent = async () => {
    try {
      const cached = await getCachedContentList(categoryKey);
      console.log(cached);
      // 👉 IMPORTANT: only show PDFs that actually exist on disk
      const offlineOnly: any[] = [];

      for (const item of cached) {
        const exists = await isPdfDownloaded(item.id, item.fileName);
        if (exists) {
          offlineOnly.push(item);
        }
      }

      setPdfs(offlineOnly);
      await checkDownloads(offlineOnly);
      console.log(offlineOnly);
    } catch (error) {
      logError('loadOfflineContent', error);
    }
  };

  const checkDownloads = async (items: any[]) => {
    const status: Record<string, boolean> = {};
    for (const pdf of items) {
      status[pdf.id] = await isPdfDownloaded(pdf.id, pdf.fileName);
    }
    setDownloaded(status);
  };

  const handleSave = async (item: any) => {
    try {
      setLoadingId(item.id);

      await downloadPdf(item.fileUrl, item.id, item.fileName);

      setDownloaded(prev => ({ ...prev, [item.id]: true }));

      // 🔥 ENSURE METADATA IS SAVED FOR OFFLINE
      const updated = [...pdfs];
      await saveContentList(categoryKey, updated);
    } catch (error) {
      Alert.alert('Error', 'Failed to save PDF');
    } finally {
      setLoadingId(null);
    }
  };

  const reloadContent = async () => {
    if (isOnline) {
      await fetchContent();
    } else {
      await loadOfflineContent();
    }
  };

  const handleDelete = (item: any) => {
    Alert.alert('Delete PDF', 'Remove this PDF from offline storage?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            // 1️⃣ Delete file from disk
            await deletePdf(item.id, item.fileName);

            // 2️⃣ Remove item from UI state (THIS FIXES YOUR ISSUE)
            const updatedList = pdfs.filter(p => p.id !== item.id);
            setPdfs(updatedList);

            // 3️⃣ Update offline cache
            await saveContentList(categoryKey, updatedList);

            // 4️⃣ Update downloaded state
            setDownloaded(prev => {
              const copy = { ...prev };
              delete copy[item.id];
              return copy;
            });
          } catch (error) {
            Alert.alert('Error', 'Delete failed');
          }
        },
      },
    ]);
  };

  const filtered = pdfs.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: any) => {
    const canRead = isOnline || downloaded[item.id];

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardExcerpt}>{item.excerpt}</Text>

        <View style={styles.actions}>
          {canRead && (
            <TouchableOpacity
              style={styles.readBtn}
              onPress={() =>
                navigation.navigate('PdfViewer', {
                  pdf: item,
                  isDownloaded: downloaded[item.id],
                })
              }
            >
              <Text style={styles.btnText}>Read More</Text>
            </TouchableOpacity>
          )}

          {!downloaded[item.id] && isOnline && (
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => handleSave(item)}
            >
              <Text style={styles.btnText}>
                {loadingId === item.id ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          )}

          {downloaded[item.id] && (
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>

        {downloaded[item.id] && (
          <Text style={styles.offlineText}>Available Offline</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search PDFs..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {!isOnline && <Text style={styles.offlineBanner}>Offline Mode</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardExcerpt: { fontSize: 13, marginVertical: 8 },
  actions: { flexDirection: 'row', gap: 10 },
  readBtn: { backgroundColor: '#2563EB', padding: 8, borderRadius: 8 },
  saveBtn: { backgroundColor: '#16A34A', padding: 8, borderRadius: 8 },
  deleteBtn: { backgroundColor: '#DC2626', padding: 8, borderRadius: 8 },
  btnText: { color: '#fff', fontSize: 13 },
  offlineText: { marginTop: 6, color: '#16A34A', fontSize: 12 },
  offlineBanner: { textAlign: 'center', color: '#DC2626' },
});
