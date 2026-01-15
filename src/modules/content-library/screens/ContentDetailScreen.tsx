import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const ContentDetailScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>
            Dummy Heading
          </Text>

          <Text style={styles.content}>
            This is a dummy content text. Replace this with actual content from
            your content library. This area is designed to support long-form
            reading with proper spacing, line height, and comfortable margins.
            {"\n\n"}
            You can safely add more paragraphs here without breaking the layout.
            The ScrollView ensures smooth vertical scrolling and the card layout
            keeps the content visually separated from the background.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB', // light app background
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    // Elevation (Android)
    elevation: 4,
  },

  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A1A1A',
    marginBottom: 12,
  },

  content: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
    lineHeight: 24,
  },
});
