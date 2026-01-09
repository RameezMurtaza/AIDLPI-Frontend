import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getAuthState, clearTokens } from '../../utils/authStorage';
import { refreshSession } from '../../utils/authApi';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Optional splash delay (keep or remove)
        await new Promise(res => setTimeout(res, 1500));

        const {
          accessToken,
          refreshToken,
          mustChangePassword,
          onboardingDone,
        } = await getAuthState();

        console.log(refreshToken);

        // // ✅ If access token exists, route immediately
        // if (refreshToken) {
        // if (mustChangePassword === "true") {
        //   navigation.replace("AuthStack", { screen: "ResetPassword" });
        // } else {
        //     navigation.replace("MainTabs");
        //   }
        //   return;
        // }

        // 🔁 No access token, try refresh if we have refreshToken
        if (refreshToken) {
          if (mustChangePassword === 'true') {
            navigation.replace('AuthStack', { screen: 'SignIn' });
          }

          try {
            const refreshed = await refreshSession(refreshToken);

            // mustChangePassword could be returned by refresh endpoint (optional)
            const mcp =
              refreshed?.mustChangePassword !== undefined
                ? String(refreshed.mustChangePassword)
                : mustChangePassword;

            if (mcp === 'true') {
              navigation.replace('AuthStack', { screen: 'ResetPassword' });
            } else {
              navigation.replace('MainTabs');
            }
            return;
          } catch (e) {
            // refresh failed → fall through to SignIn
            await clearTokens();
          }
        }

        // ❌ Not logged in
        if (onboardingDone === 'true') {
          navigation.replace('AuthStack', { screen: 'SignIn' });
        } else {
          navigation.replace('AuthStack', { screen: 'Onboarding' });
        }
      } catch (e) {
        // safest fallback
        navigation.replace('AuthStack', { screen: 'Onboarding' });
      }
    };

    bootstrap();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Center Content */}
        <View style={styles.centerBlock}>
          {/* Big Logo */}
          <Image
            source={require('../../assets/images/SplashScreen/Logo.png')} // <-- replace with your big logo
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Main Heading */}
          <Text style={styles.title}>
            AI- Powered Digital Learning Platforms for Vaccinators
          </Text>

          {/* Sub Heading */}
          <Text style={styles.subtitle}>
            Empowering Vaccinators through smart learning
          </Text>
        </View>

        {/* Bottom Block */}
        <View style={styles.bottomBlock}>
          {/* 3 images row */}
          <View style={styles.threeColRow}>
            <Image
              source={require('../../assets/images/SplashScreen/1.png')} // replace
              style={styles.bottomIcon}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/SplashScreen/2.png')} // replace
              style={styles.bottomIcon}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/SplashScreen/3.png')} // replace
              style={styles.bottomIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  /* Center content (logo + texts) */
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },

  logo: {
    width: 360,
    height: 360,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0A2A66',
    textAlign: 'center',
    marginBottom: 50,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22C55E',
    textAlign: 'center',
  },

  /* Bottom section */
  bottomBlock: {
    paddingBottom: 16,
  },

  threeColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  bottomIcon: {
    width: 70,
    height: 70,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
