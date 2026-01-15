import React, { useState, useRef } from 'react';
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

const settingsOptions = [
  {
    id: '1',
    icon: 'edit',
    label: 'Edit Profile',
    screen: 'EditProfile',
  },
  {
    id: '2',
    icon: 'info',
    label: 'About Us',
    content:
      'اے آئی۔ڈی۔ایل۔پی۔آئی ایک مشترکہ منصوبہ ہے جو توسیعی پروگرام برائے حفاظتی ٹیکہ جات، آغا خان یونیورسٹی، یونیسیف اور عالمی ادارۂ صحت کے تعاون سے تیار کیا گیا ہے۔ اس منصوبے کا مقصد ویکسینیٹرز اور موبیلائزرز کی صلاحیتوں کو مضبوط بنانا، ان کی تربیت کو جدید خطوط پر استوار کرنا اور انہیں ڈیجیٹل لرننگ اور فوری رہنمائی کے ذریعے عالمی و قومی معیار کے مطابق مؤثر ویکسینیشن خدمات فراہم کرنے کے قابل بنانا ہے۔',
  },
  {
    id: '3',
    icon: 'help',
    label: 'Help & Support',
    screen: 'HelpSupportScreen',
  },
  {
    id: '4',
    icon: 'logout',
    label: 'Logout',
    screen: 'SignIn',
  },
];

const SettingsScreen = ({ navigation }: any) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleAboutUs = (id: string) => {
    const isOpening = expandedId !== id;
    setExpandedId(isOpening ? id : null);

    Animated.timing(rotateAnim, {
      toValue: isOpening ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (item: any) => {
    if (item.label === 'About Us') {
      toggleAboutUs(item.id);
    } else {
      navigation.navigate(item.screen);
    }
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

        {settingsOptions.map((item, index) => (
          <View key={item.id}>
            {/* Row */}
            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => handlePress(item)}
            >
              <View style={styles.optionLeft}>
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color="#0A2A66"
                />
                <Text style={styles.optionText}>{item.label}</Text>
              </View>

              {/* Dropdown Arrow (always visible) */}
              {item.label === 'About Us' && (
                <Animated.View style={{ transform: [{ rotate }] }}>
                  <MaterialIcons
                    name="arrow-drop-down-circle"
                    size={30}
                    color="#0A2A66"
                  />
                </Animated.View>
              )}
            </TouchableOpacity>

            {/* Accordion Content */}
            {item.label === 'About Us' && expandedId === item.id && (
              <View style={styles.dropdownCard}>
                <Text style={styles.dropdownText}>{item.content}</Text>
              </View>
            )}

            {/* Divider */}
            {index !== settingsOptions.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default SettingsScreen;

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
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  },
  dropdownCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});
