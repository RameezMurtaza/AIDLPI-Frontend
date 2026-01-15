import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { CONTENT_LIBRARY } from '../data/contentLibrary';
import { isPdfDownloaded } from '../services/fileService';
import { logError } from '../utils/logger';

export default function ContentLibraryScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [pdfs] = useState(CONTENT_LIBRARY);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    NetInfo.fetch()
      .then(state => {
        console.log('🌐 Network status:', state.isConnected);
        setIsOnline(state.isConnected ?? true);
      })
      .catch(err => logError('NetInfo.fetch', err));

    checkDownloads();
  }, []);

  const checkDownloads = async () => {
    try {
      const status: Record<string, boolean> = {};
      for (const pdf of CONTENT_LIBRARY) {
        status[pdf.id] = await isPdfDownloaded(pdf.fileName);
      }
      setDownloaded(status);
    } catch (error) {
      logError('checkDownloads', error);
    }
  };

  const filtered = pdfs.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardExcerpt}>{item.excerpt}</Text>

      <TouchableOpacity
        style={styles.readMoreBtn}
        onPress={() => {
          try {
            navigation.navigate('PdfViewer', {
              pdf: item,
              isDownloaded: downloaded[item.id],
            });
          } catch (error) {
            logError('Navigation', error, { pdfId: item.id });
          }
        }}
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>

      {downloaded[item.id] && (
        <Text style={styles.offlineText}>Available Offline</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search PDFs..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Offline Banner */}
      {!isOnline && (
        <Text style={styles.offlineBanner}>Offline Mode</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  /* Search */
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  /* List */
  listContainer: {
    paddingBottom: 24,
  },

  /* Card */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },

  cardExcerpt: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 12,
  },

  /* Button */
  readMoreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  readMoreText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  /* Status */
  offlineText: {
    marginTop: 8,
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '500',
  },

  offlineBanner: {
    color: '#DC2626',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '500',
  },
});
