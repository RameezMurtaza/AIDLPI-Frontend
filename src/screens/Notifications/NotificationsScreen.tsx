import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Notification Card */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.iconWrapper}>
              <MaterialIcons
                name="notifications"
                size={20}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.alertText}>Alert</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Message */}
          <Text style={styles.message}>
            Your session will expire soon. Please save your work to avoid losing
            any progress.
          </Text>
        </View>

        {/* Another Notification */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconWrapper}>
              <MaterialIcons
                name="warning"
                size={20}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.alertText}>Alert</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.message}>
            A new update is available. Update the app to access the latest
            features.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0A2A5E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  alertText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#0A2A5E",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  message: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#374151",
    lineHeight: 22,
  },
});
