import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const SECTIONS = [
  {
    key: 'epi_pakistan',
    title: 'EPI Pakistan',
    description: 'EPI guidelines and official documents',
  },
  {
    key: 'course_work',
    title: 'Course Work',
    description: 'Training and learning materials',
  },
  {
    key: 'faqs',
    title: 'FAQs',
    description: 'Frequently asked questions',
  },
];

const ContentSectionScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {SECTIONS.map(section => (
        <TouchableOpacity
          key={section.key}
          style={styles.card}
          onPress={() =>
            navigation.navigate('ContentLibrary', {
              categoryKey: section.key,
              categoryTitle: section.title,
            })
          }
        >
          <Text style={styles.cardTitle}>{section.title}</Text>
          <Text style={styles.cardDesc}>{section.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ContentSectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardDesc: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
  },
});
