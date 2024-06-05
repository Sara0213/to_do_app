import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    navigation.navigate('Login');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, you're logged in</Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
}
