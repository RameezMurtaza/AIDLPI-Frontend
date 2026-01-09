import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
const GAP = 14;
const H_PADDING = 16;

// Bigger cards (still 2 columns)
const CARD_WIDTH = (width - (H_PADDING * 2) - GAP) / 2;

// Make sure 2 rows fill most of the screen
const CARD_HEIGHT = (height * 0.72 - GAP) / 2; // adjust 0.70–0.78 to taste
const IMAGE_HEIGHT = CARD_HEIGHT * 0.55;

const lessons = [
  { id: "1", title: "Cold Chain", image: require("../../assets/images/CoursesScreen/1.png") },
  { id: "2", title: "Safe Injection", image: require("../../assets/images/CoursesScreen/2.png") },
  { id: "3", title: "Screening", image: require("../../assets/images/CoursesScreen/3.png") },
  { id: "4", title: "Counseling", image: require("../../assets/images/CoursesScreen/4.png") },
];

const LessonScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Image */}
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

      {/* Content */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.divider} />

        {/* Proper centered button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.ctaButton}
          onPress={() => navigation?.navigate?.("LessonDetails")}
        >
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Lessons</Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: H_PADDING,
    paddingTop: 12,
  },

  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    
  },

  listContent: {
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: GAP,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
    backgroundColor: "#E5E7EB",
  },

  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    alignItems: "center",         // ✅ center title + button horizontally
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",          // ✅ centered title
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    width: "100%",
    marginTop: 10,
  },

  ctaButton: {
    marginTop: 12,
    width: "85%",
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",         // ✅ center button text
    justifyContent: "center",
  },

  ctaText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
