import React, { useEffect, useState, ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProtectedRouteProps {
  children: ReactNode;
}

type ProtectedRouteNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProtectedRoute'>;


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProtectedRouteNavigationProp>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        navigation.navigate('Login');
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
