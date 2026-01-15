// src/screens/OnboardingScreen/OnboardingScreen.tsx
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../../assets/images/OnboardingScreen/1.png'),
    title: 'Welcome to the E-Learning Application',
    description: 'Where vaccinators grow their knowledge and skills.',
  },
  {
    id: '2',
    image: require('../../../assets/images/OnboardingScreen/2.png'),
    title: 'Accessible lessons, stronger communities',
    description: 'Explore lessons to boost your vaccination knowledge and impact',
  },
  {
    id: '3',
    image: require('../../../assets/images/OnboardingScreen/3.png'),
    title: 'Dive into a seamless learning journey for vaccinators',
    description: 'Experience interactive modules, expert guidance, and progress tracking',
  },
  {
    id: '4',
    image: require('../../../assets/images/OnboardingScreen/4.png'),
    title: 'Join a community of vaccinators on a shared learning journey',
    description: 'Connect, grow, and strengthen skills together for healthier communities.',
  },
  {
    id: '5',
    image: require('../../../assets/images/OnboardingScreen/5.png'),
    title: 'Kick-start your training',
    description: 'Learn from expert instructors and grow your vaccination skills!',
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await AsyncStorage.setItem('onboardingDone', 'true');
      navigation.replace('SignIn');
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboardingDone', 'true');
    navigation.replace('SignIn');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.bottomButton} onPress={handleNext}>
        <Text style={styles.bottomButtonText}>
          {currentIndex === slides.length - 1 ? 'SIGN UP' : 'CONTINUE'}
        </Text>
      </TouchableOpacity>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide: { width, alignItems: 'center' },
  image: { width, height: height * 0.55, resizeMode: 'cover' },
  textContainer: { paddingHorizontal: 30, marginTop: 20, alignItems: 'center' },
  title: { fontFamily: FONTS.bold, fontSize: 24, textAlign: 'center', marginBottom: 10, color: COLORS.primary },
  description: { fontFamily: FONTS.regular, fontSize: 18, textAlign: 'center', color: '#333' },
  skipButton: { position: 'absolute', top: 20, right: 20, zIndex: 10, backgroundColor: COLORS.primary, paddingVertical: 2, paddingHorizontal: 14, borderRadius: 20 },
  skipText: { fontSize: 16, color: COLORS.white, fontFamily: FONTS.bold },
  bottomButton: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 60, borderRadius: 10 },
  bottomButtonText: { color: COLORS.white, fontSize: 18, fontFamily: FONTS.bold },
  pagination: { position: 'absolute', bottom: 120, flexDirection: 'row', alignSelf: 'center' },
  dot: { width: 10, height: 10, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 5 },
  activeDot: { backgroundColor: COLORS.primary },
});
