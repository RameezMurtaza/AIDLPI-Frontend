import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../modules/home/screens/HomeScreen';
import ChatbotScreen from '../../modules/chatbot/screens/ChatbotScreen';
import LessonScreen from '../../modules/lessons/screens/LessonScreen';
import LessonDetails from '../../modules/lessons/screens/LessonDetails';
import AssessmentComplete from '../../modules/lessons/screens/AssessmentComplete';
import Assessments from '../../modules/lessons/screens/Assessments';
import AssessmentResult from '../../modules/lessons/screens/AssessmentResult';
import VideoLayout from '../../modules/lessons/screens/VideoLayout';
import AnalyticsScreen from '../../modules/analytics/screens/AnalyticsScreen';
import ContentLibraryScreen from '../../modules/content-library/screens/ContentLibraryScreen';
import PdfViewerScreen from '../../modules/content-library/screens/PdfViewerScreen';
import ContentSectionScreen from '../../modules/content-library/screens/ContentSectionScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // ✅ CENTER TITLE
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: '#0A2A66',
          fontFamily: 'Poppins-bold'
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
      <Stack.Screen name="ContentLibrary" component={ContentLibraryScreen} />
      <Stack.Screen name='PdfViewer' component={PdfViewerScreen}/>
      <Stack.Screen name="LessonScreen" component={LessonScreen} />
      <Stack.Screen name="LessonDetails" component={LessonDetails} />
      <Stack.Screen name="Assessments" component={Assessments} />
      <Stack.Screen name="AssessmentComplete" component={AssessmentComplete} />
      <Stack.Screen name='AssessmentResult' component={AssessmentResult}/>
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name='Video' component={VideoLayout}/>
      <Stack.Screen name='ContentSection' component={ContentSectionScreen}/>
    </Stack.Navigator>
  );
}
