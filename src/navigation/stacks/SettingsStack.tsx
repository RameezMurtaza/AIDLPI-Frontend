import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../../screens/Settings/SettingsScreen";
import EditProfileScreen from "../../screens/Edit_Profile/EditProfile";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTitleStyle: {
          fontWeight: "700",
          color: "#0A2A66",
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}
