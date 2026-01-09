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

const SignInScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    try {
      const response = await fetch('http://10.199.17.57:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'z9srWb95rY5YeiJy9GuchsD9VI3C4D',
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('✅ Backend Response:', data);

      if (!response.ok) {
        alert(data?.message || 'Login failed');
        return;
      }

      // 🔐 Store tokens
      await AsyncStorage.multiSet([
        ['accessToken', data.accessToken],
        ['refreshToken', data.refreshToken],
        ['user', JSON.stringify(data.user)],
        ['mustChangePassword', String(data.mustChangePassword)],
        ['onboardingDone', 'true'],
      ]);

      if (data.mustChangePassword === true) {
        navigation.replace('ResetPassword');
      } else {
        navigation.replace('MainTabs');
      }
    } catch (error) {
      console.error('❌ API Error:', error);
      alert('Unable to connect to server');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Sign In</Text>
      <Text style={styles.subtitle}>Please sign in to your account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>UserName</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#0A2A66', // dark blue
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
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
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

