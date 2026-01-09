import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const AssessmentComplete = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Top Background Image (55%) */}
      <ImageBackground
        source={require('../../assets/images/Assessment/1.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      />

      {/* Bottom Content (45%) */}
      <View style={styles.content}>
        <Text style={styles.heading}>
          Thank you for completing your assessment
        </Text>

        <Text style={styles.description}>
          Your responses have been successfully submitted.
          You can now review your score and personalized recommendations
          based on your performance.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AssessmentResult')}
        >
          <Text style={styles.buttonText}>
            Check your score & recommendations
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssessmentComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  imageBackground: {
    height: height * 0.55,
    width: '100%',
  },

  content: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24, // smooth overlap with image
  },

  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#0A2A66',
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },

  button: {
    backgroundColor: '#0A2A66',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
