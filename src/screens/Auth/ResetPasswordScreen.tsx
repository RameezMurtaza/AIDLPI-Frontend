import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({ navigation }: any) => {
  const [currentPassword, setCurrentPassword] = useState(''); // TEMP password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDone = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password should be at least 8 characters');
      return;
    }

    try {
      setLoading(true);

      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        alert('Session expired. Please login again.');
        navigation.replace('SignIn');
        return;
      }

      const response = await fetch('http://10.199.17.57:3000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'z9srWb95rY5YeiJy9GuchsD9VI3C4D',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      console.log('✅ Change Password Response:', data);

      if (!response.ok) {
        alert(data?.message || 'Failed to change password');
        return;
      }

      /**
       * Backend behavior (as you said):
       * - mustChangePassword=false
       * - refresh token cleared (forces re-login)
       */

      // ✅ Clear tokens locally too (force re-login on app side)
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'mustChangePassword']);

      alert('Password changed successfully. Please login again.');

      // 🔁 Force user back to SignIn (inside AuthStack)
      navigation.replace('SignIn');

      // If you ever move ResetPassword outside AuthStack, then use:
      // navigation.replace('AuthStack', { screen: 'SignIn' });
    } catch (error) {
      console.error('❌ Change Password API Error:', error);
      alert('Unable to connect to server');
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
          placeholder="TEMP_PASSWORD"
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
        <Text style={styles.label}>Re-enter New Password</Text>
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
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#0A2A66',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: { marginBottom: 20 },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#0A2A66',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#0A2A66',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 18 },
});

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

