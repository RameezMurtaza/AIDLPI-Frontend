import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native'
import React from 'react'

const ContentLibraryScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>

      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search content..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* 📚 Content Cards */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {[1, 2, 3].map((item, index) => (
          <View key={index} style={styles.card}>

            {/* Title */}
            <Text style={styles.cardTitle}>
              Safe Vaccine Storage
            </Text>

            {/* Excerpt */}
            <Text style={styles.cardExcerpt} numberOfLines={2}>
              Learn how to properly store vaccines to maintain potency
              and ensure patient safety in the field.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.readMoreBtn}
              onPress={() =>
                navigation.navigate('ContentDetailScreen', {
                  id: item,
                  title: 'Safe Vaccine Storage',
                })
              }
            >
              <Text style={styles.readMoreText}>
                Read More
              </Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>

    </View>
  )
}

export default ContentLibraryScreen


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
})
