import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      {/* <Button title="Go to Login" onPress={() => navigation.navigate('Login')} /> */}
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
      );
}
