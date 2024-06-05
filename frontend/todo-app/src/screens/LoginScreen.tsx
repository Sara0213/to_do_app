import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { styles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await api.post('/login/', {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { access, refresh } = response.data;
//         await AsyncStorage.setItem('access_token', access);
//         await AsyncStorage.setItem('refresh_token', refresh);
//         navigation.navigate('Home');
//       }
//     } catch (err) {
//       setError('Failed to log in');
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
        Login
      </Button> */}
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
        style={styles.registerButton}
      >
        Don't have an account? Register
      </Button>
    </View>
  );
}