import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileImage} />
        <Text style={styles.name}>WELCOME TO YOUR PORTAL !</Text>
        <Text style={styles.welcome}>START LEARNING NOW</Text>
        <Text style={styles.name}>VACCINATOR</Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {/* AI Chatbot */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <Image source={require("../../assets/images/HomeScreen/1.png")} />
          <Text style={styles.cardText}>AI Chatbot</Text>
        </TouchableOpacity>

        {/* Content Library */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ContentLibrary")}
        >
          <Image source={require("../../assets/images/HomeScreen/2.png")} />
          <Text style={styles.cardText}>Content Library</Text>
        </TouchableOpacity>

        {/* Lessons */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("LessonScreen")}
        >
          <Image source={require("../../assets/images/HomeScreen/3.png")} />
          <Text style={styles.cardText}>Lessons</Text>
        </TouchableOpacity>

        {/* Analytics */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Analytics")}
        >
          <Image source={require("../../assets/images/HomeScreen/4.png")} />
          <Text style={styles.cardText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },

  header: {
    height: "45%",
    width: "120%",
    alignSelf: "center",
    backgroundColor: "#0A2A66",
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -80,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    marginTop: 60,
    marginBottom: 12,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },

  welcome: {
    color: "#DCE3F0",
    marginTop: 6,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },

  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 70,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    
  },



  cardText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
});
