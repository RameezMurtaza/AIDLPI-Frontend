// src/screens/SplashScreen/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { getAuthState, clearTokens } from '../utils/authStorage';
import { refreshSession } from '../api/authApi';
import { COLORS, FONTS, SPLASH_DELAY } from '../utils/constants';


interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Optional splash delay
        await new Promise(res => setTimeout(res, SPLASH_DELAY));

        const { refreshToken, mustChangePassword, onboardingDone } = await getAuthState();

        if (refreshToken) {
          try {
            const refreshed = await refreshSession(refreshToken);
            const mcp = String(refreshed.mustChangePassword ?? mustChangePassword);

            if (mcp === 'true') {
              navigation.replace('AuthStack', { screen: 'ResetPassword' });
            } else {
              navigation.replace('MainTabs');
            }
            return;
          } catch (error) {
            // Refresh failed → clear tokens and fall back
            await clearTokens();
          }
        }

        // No refresh token → decide onboarding or SignIn
        if (onboardingDone === 'true') {
          navigation.replace('AuthStack', { screen: 'SignIn' });
        } else {
          navigation.replace('AuthStack', { screen: 'Onboarding' });
        }
      } catch (error) {
        navigation.replace('AuthStack', { screen: 'Onboarding' });
      }
    };

    bootstrap();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.centerBlock}>
          <Image
            source={require('../../../assets/images/SplashScreen/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            AI-Powered Digital Learning Platforms for Vaccinators
          </Text>
          <Text style={styles.subtitle}>
            Empowering Vaccinators through smart learning
          </Text>
        </View>

        <View style={styles.bottomBlock}>
          <View style={styles.threeColRow}>
            <Image source={require('../../../assets/images/SplashScreen/1.png')} style={styles.bottomIcon} />
            <Image source={require('../../../assets/images/SplashScreen/2.png')} style={styles.bottomIcon} />
            <Image source={require('../../../assets/images/SplashScreen/3.png')} style={styles.bottomIcon} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: 24 },
  centerBlock: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100 },
  logo: { width: 360, height: 360, marginBottom: 10 },
  title: { fontSize: 32, fontFamily: FONTS.bold, color: COLORS.primary, textAlign: 'center', marginBottom: 50 },
  subtitle: { fontSize: 24, fontFamily: FONTS.semiBold, color: COLORS.secondary, textAlign: 'center' },
  bottomBlock: { paddingBottom: 16 },
  threeColRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  bottomIcon: { width: 70, height: 70 },
});
