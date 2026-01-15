import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { center } from '@shopify/react-native-skia';

const { height } = Dimensions.get('window');

const AssessmentResult = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Image Section */}
      <ImageBackground
        source={require('../../../assets/images/Assessment/2.png')}
        style={styles.imageSection}
      >
        <View style={styles.overlay}>
          <Text style={styles.score}>12 / 20</Text>
        </View>
      </ImageBackground>

      {/* Floating Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Summary Points</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>S.no</Text>
            <Text style={styles.headerText}>Course Lesson</Text>
            <Text style={styles.headerText}>Points</Text>
          </View>

          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.rowText}>001</Text>
              <Text style={styles.rowText}>Course 1</Text>
              <Text style={styles.rowText}>4/5</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Remaining Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>
          You have answered a few questions wrong related to Course 1
        </Text>

        <Text style={styles.subHeading}>
          Based on your assessment, you are suggested to start your lecture from
          here
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('Video')}
          >
            Start Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssessmentResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  imageSection: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 14,
  },

  score: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    color: '#FFFFFF',
  },

  content: {
    padding: 20,
    paddingTop: 30, // space after floating card
  },

  table: {
    backgroundColor: '#F8F9FC',
    borderRadius: 12,
    padding: 12,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  headerText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1E3A8A',
  },

  rowText: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },

  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 6,
    color: '#111',
    textAlign: 'center',
  },

  subHeading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 15,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
    color: '#111',
    textAlign: 'center',
  },

  summaryCard: {
    marginTop: -100, // 👈 overlap amount
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
