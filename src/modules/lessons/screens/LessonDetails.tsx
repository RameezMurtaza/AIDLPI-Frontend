import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const renderAccordion = (
  index: number,
  title: string,
  subtitle: string,
  icon: string,
  openIndex: number | null,
  toggle: (i: number) => void
) => {
  const isOpen = openIndex === index;

  return (
    <View style={styles.accordionWrapper}>
      <TouchableOpacity
        style={styles.accordionItem}
        onPress={() => toggle(index)}
        activeOpacity={0.8}
      >
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={24} color="#0A2A66" />
        </View>

        <View style={styles.accordionContent}>
          <Text style={styles.accordionTitle}>{title}</Text>
          <Text style={styles.accordionSubtitle}>{subtitle}</Text>
        </View>

        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={26}
          color="#333"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.accordionBody}>
          <Text style={styles.bodyText}>• Detailed explanation</Text>
          <Text style={styles.bodyText}>• Interactive content</Text>
          <Text style={styles.bodyText}>• Progress tracking included</Text>
        </View>
      )}
    </View>
  );
};


const LessonDetails = ({navigation} : any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Introduction ===== */}
      <Text style={styles.heading}>Introduction to the Course</Text>

      <View style={styles.card}>
        <Text style={styles.description}>
          This course is designed to give you a strong foundation in the subject.
          You will learn core concepts step by step with practical examples.
          Each stage prepares you for the next level of learning.
          By the end of this course, you will be confident and job-ready.
        </Text>
      </View>

      {/* ===== Overview ===== */}
      <Text style={styles.heading}>Course Stages Overview</Text>

      <View style={styles.card}>
        {/* Top Divider */}
        <View style={styles.divider} />

        {/* ===== Accordion 1 ===== */}
        {renderAccordion(
          0,
          'Pre-course Assessment',
          '30 Questions',
          'assignment',
          openIndex,
          toggleAccordion
        )}

        {/* ===== Accordion 2 ===== */}
        {renderAccordion(
          1,
          'Course Content',
          '5 Lectures',
          'menu-book',
          openIndex,
          toggleAccordion
        )}

        {/* ===== Accordion 3 ===== */}
        {renderAccordion(
          2,
          'Post Course Assessment',
          '30 Questions',
          'quiz',
          openIndex,
          toggleAccordion
        )}

        {/* ===== Accordion 4 ===== */}
        {renderAccordion(
          3,
          'Course Completion',
          '15 mins',
          'timer',
          openIndex,
          toggleAccordion
        )}

        {/* Bottom Divider */}
        <View style={styles.divider} />

        {/* Get Started Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText} onPress={(() => navigation.navigate("Assessments"))}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LessonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },

  heading: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#0A2A66',
    marginBottom: 10,
    marginTop: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },

  accordionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  accordionContent: {
    flex: 1,
  },

  accordionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#111',
  },

  accordionSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#16A34A',
    marginTop: 2,
  },

  accordionBody: {
    paddingLeft: 56,
    paddingBottom: 12,
  },

  bodyText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    marginBottom: 6,
  },

  button: {
    marginTop: 16,
    backgroundColor: '#0A2A66',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
