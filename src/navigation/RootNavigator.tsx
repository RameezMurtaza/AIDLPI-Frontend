import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import AuthStack from "./stacks/AuthStack";
import SplashScreen from "../screens/SplashScreen/SplashScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
