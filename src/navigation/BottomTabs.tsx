import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";

import HomeStack from "./stacks/HomeStack";
import SettingsStack from "./stacks/SettingsStack";
import NotificationsStack from "./stacks/NotificationsStack";
import HelpSupportStack from "./stacks/HelpSupportStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0A2A66",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: { height: 60, paddingBottom: 6 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications-none" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="HelpSupport"
        component={HelpSupportStack}
        options={{
          title: "Help",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="help" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
