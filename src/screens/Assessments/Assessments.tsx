import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary role of a vaccinator?',
    options: [
      'Administer vaccines safely',
      'Prescribe medicines',
      'Perform surgeries',
      'Diagnose diseases',
    ],
  },
  {
    id: 2,
    question: 'Which document is mandatory before vaccination?',
    options: [
      'Vaccination card',
      'National ID',
      'Hospital slip',
      'Prescription',
    ],
  },
  // 👉 Add up to 30 questions
];

const Assessments = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  return (
    <View style={styles.container}>
      {/* ===== Header ===== */}
      <Text style={styles.counter}>
        Question {currentIndex + 1} / {QUESTIONS.length}
      </Text>

      {/* ===== Question Card ===== */}
      <View style={styles.card}>
        <Text style={styles.questionText}>
          {currentQuestion.question}
        </Text>

        {/* ===== Options ===== */}
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
              onPress={() => setSelectedOption(index)}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color={isSelected ? '#0A2A66' : '#777'}
              />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ===== Navigation Buttons ===== */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.disabledButton,
          ]}
          disabled={currentIndex === 0}
          onPress={() => {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption(null);
          }}
        >
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>

        {!isLastQuestion ? (
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedOption === null && styles.disabledButton,
            ]}
            disabled={selectedOption === null}
            onPress={() => {
              setCurrentIndex(currentIndex + 1);
              setSelectedOption(null);
            }}
          >
            <Text style={styles.navText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedOption === null && styles.disabledButton,
            ]}
            onPress={() => navigation.replace('AssessmentComplete')}

          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Assessments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },

  counter: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    // color: '#555',
    marginBottom: 12,
    fontWeight: 700,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#111',
    marginBottom: 16,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },

  optionSelected: {
    borderColor: '#0A2A66',
    backgroundColor: '#EEF2FF',
  },

  optionText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    flex: 1,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  navButton: {
    flex: 1,
    backgroundColor: '#0A2A66',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  submitButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  navText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },

  disabledButton: {
    opacity: 0.5,
  },
});
