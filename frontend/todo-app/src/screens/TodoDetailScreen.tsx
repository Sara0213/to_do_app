import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { RootStackParamList, Todo } from '../types';
import api from '../api';


type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;


export default function TodoDetailScreen() {

    return  (
        <View> 
            <Text>Detail</Text>
        </View> 
    )
}