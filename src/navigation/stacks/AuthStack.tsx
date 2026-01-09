import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../../screens/Auth/SignInScreen";
import ResetPasswordScreen from "../../screens/Auth/ResetPasswordScreen";
import OnboardingScreen from "../../screens/OnboardingScreen/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
