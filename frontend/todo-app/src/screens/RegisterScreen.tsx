import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import api from '../api';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';


type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;


export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();


  const handleRegister = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/users/register/', {
        username,
        email,
        password,
      });
      console.log(response)
      if (response.status === 201) {
        navigation.navigate('Login', { message: 'Registration successful! Please log in.' });
      }
    } catch (err: any) {
        if (err.response && err.response.data) {
          setError(err.response.data.error || 'Failed to register');
        } else {
          setError('Failed to register');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
        Register
      </Button>
    </View>
  );
}