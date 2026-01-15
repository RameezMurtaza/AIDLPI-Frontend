import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native-video'

const { height } = Dimensions.get('window')

const VideoLayout = ({ navigation }: any) => {
  const [showAssessmentBtn, setShowAssessmentBtn] = useState(false)

  return (
    <View style={styles.container}>

      {/* 🎥 Video Section */}
      <View style={styles.videoContainer}>
        <Video
          source={{
            uri: 'https://drive.google.com/uc?export=download&id=1C7FFwNgz2iyjbICsKlZ5N3nFG0e4xkSv',
          }}
          style={styles.video}
          controls
          resizeMode="contain"
          onEnd={() => setShowAssessmentBtn(true)}
        />

        {/* ✅ Button appears after video ends */}
        {showAssessmentBtn && (
          <TouchableOpacity
            style={styles.assessmentBtn}
            onPress={() => navigation.navigate('Assessments')}
          >
            <Text style={styles.assessmentBtnText}>
              Start Assessment
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 📄 Description Section */}
      <View style={styles.descriptionContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>Lesson 1: Introduction</Text>
            <Text style={styles.description}>
              This is a dummy lesson description.
              Here you will explain what the student will learn in this video,
              key concepts covered, and any important notes.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </ScrollView>
      </View>

    </View>
  )
}

export default VideoLayout


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  videoContainer: {
    height: height * 0.5,
    backgroundColor: '#000',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  descriptionContainer: {
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1E293B',
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },

  assessmentBtn: {
  position: 'absolute',
  bottom: 16,
  alignSelf: 'center',
  backgroundColor: '#2563EB',
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 24,
  elevation: 5,
},

assessmentBtnText: {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: '600',
},

})
