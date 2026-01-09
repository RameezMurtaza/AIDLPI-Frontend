import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/Home/HomeScreen';
import ChatbotScreen from '../../screens/Chatbot/ChatbotScreen';
import ContentLibrayScreen from '../../screens/Content_Library/ContentLibrayScreen';
import LessonScreen from '../../screens/Lessons/LessonScreen';
import LessonDetails from '../../screens/Lesson_Details/LessonDetails';
import Assessments from '../../screens/Assessments/Assessments';
import AssessmentComplete from '../../screens/Assessments/AssessmentComplete';
import AnalyticsScreen from '../../screens/Analytics/AnalyticsScreen';
import AssessmentResult from '../../screens/Assessments/AssessmentResult';
import VideoLayout from '../../screens/Video/VideoLayout';
import ContentDetailScreen from '../../screens/Content_Library/ContentDetailScreen';

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
      <Stack.Screen name="ContentLibrary" component={ContentLibrayScreen} />
      <Stack.Screen name="LessonScreen" component={LessonScreen} />
      <Stack.Screen name="LessonDetails" component={LessonDetails} />
      <Stack.Screen name="Assessments" component={Assessments} />
      <Stack.Screen name="AssessmentComplete" component={AssessmentComplete} />
      <Stack.Screen name='AssessmentResult' component={AssessmentResult}/>
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name='Video' component={VideoLayout}/>
      <Stack.Screen name='ContentDetailScreen' component={ContentDetailScreen}/>
    </Stack.Navigator>
  );
}
