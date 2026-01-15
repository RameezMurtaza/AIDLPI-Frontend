// src/screens/Auth/ResetPasswordScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { changePassword } from '../api/authApi';
import { clearTokens, getAuthState } from '../utils/authStorage';
import { COLORS, FONTS } from '../utils/constants';

interface ResetPasswordScreenProps {
  navigation: any;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDone = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Validation Error', 'Password should be at least 8 characters.');
      return;
    }

    try {
      setLoading(true);

      // ✅ Get access token
      const { accessToken } = await getAuthState();
      if (!accessToken) {
        Alert.alert('Session Expired', 'Please login again.');
        navigation.replace('SignIn');
        return;
      }

      // ✅ Call API
      await changePassword(accessToken, currentPassword, newPassword);

      // ✅ Clear tokens locally (forces re-login)
      await clearTokens();

      Alert.alert('Success', 'Password changed successfully. Please login again.');
      navigation.replace('SignIn');
    } catch (error: any) {
      console.error('❌ Change Password Error:', error);

      // 🔹 Handle wrong temporary password (usually 401)
      if (error.response?.status === 401) {
        Alert.alert('Error', 'Incorrect temporary password.');
      } else {
        Alert.alert('Error', error?.message || 'Unable to connect to server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your temporary password and set a new password.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current (Temporary) Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Temporary Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleDone}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Please wait...' : 'Done'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: COLORS.white, justifyContent: 'center' },
  heading: { fontFamily: FONTS.bold, fontSize: 28, color: COLORS.primary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontFamily: FONTS.semiBold, fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 30 },
  inputContainer: { marginBottom: 20 },
  label: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.primary, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 16,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 18 },
});
