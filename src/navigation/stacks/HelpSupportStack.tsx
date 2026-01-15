import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HelpSupportScreen from "../../modules/support/screens/HelpSupportScreen";

const Stack = createNativeStackNavigator();

export default function HelpSupportStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "700",
          color: "#0A2A66",
        },
      }}
    >
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{ title: "Help & Support" }}
      />
    </Stack.Navigator>
  );
}
