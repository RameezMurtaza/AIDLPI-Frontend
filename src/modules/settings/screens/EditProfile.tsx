import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const { width } = Dimensions.get('window');


const EditProfileScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const rotateAnim = useState(new Animated.Value(0))[0];

  const toggleAccordion = () => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setExpanded(!expanded);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      {/* Main Card */}
      <View style={styles.card}>
        {/* Profile Circle */}
        <View style={styles.profileCircle} />

        {/* Change Picture Button */}
        <TouchableOpacity style={styles.changePicButton} activeOpacity={0.8}>
          <MaterialIcons name="photo-camera" size={18} color="#fff" />
          <Text style={styles.changePicText}>Change Picture</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Password Change Accordion */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={toggleAccordion}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <MaterialIcons
              name={'lock'}
              size={24}
              color="#0A2A66"
            />
            <Text style={styles.optionText}>Password Change</Text>
          </View>

          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialIcons
              name="arrow-drop-down-circle"
              size={28}
              color="#0A2A66"
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Accordion Content */}
        {expanded && (
          <View style={styles.dropdownCard}>
            <Text style={styles.dropdownText}>
              You can update your password regularly to keep your account secure.
              Make sure to choose a strong password that you haven’t used before.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    alignItems: 'center',
    paddingTop: 80,
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  profileCircle: {
    position: 'absolute',
    top: -45,
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0A2A66',
    borderWidth: 4,
    borderColor: '#fff',
  },
  changePicButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#0A2A66',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 25,
  },
  changePicText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginLeft: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2A66',
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 10,
  },
  dropdownCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
