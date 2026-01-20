import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const items = [
    { src: require('../../../assets/images/HomeScreen/1.png'), screen: 'Chatbot' },
    { src: require('../../../assets/images/HomeScreen/2.png'), screen: 'ContentSection' },
    { src: require('../../../assets/images/HomeScreen/3.png'), screen: 'LessonScreen' },
    { src: require('../../../assets/images/HomeScreen/4.png'), screen: 'Analytics' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Text */}
      <View style={styles.header}>
        <Text style={styles.name}>WELCOME TO YOUR PORTAL !</Text>
        <Text style={styles.welcome}>START LEARNING NOW</Text>
        <Text style={styles.name}>VACCINATOR</Text>
      </View>

      {/* 2x2 Image Grid */}
      <View style={styles.gridContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Image source={item.src} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    paddingBottom: height * 0.1, // leave 10% space for bottom nav
  },

  header: {
    flex: 0.4,
    width: '100%',
    backgroundColor: '#0A2A66',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },

  name: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },

  welcome: {
    color: '#DCE3F0',
    marginTop: 6,
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },

  gridContainer: {
    flex: 0.6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },

  gridItem: {
    width: '48%', // 2x2 grid
    alignItems: 'center',
    marginBottom: height * 0.04,
  },

  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // square
  },
});
