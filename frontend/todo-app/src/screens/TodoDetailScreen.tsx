import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { RootStackParamList, Todo } from '../types';
import api from '../api';

type TodoScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;
type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;


export default function TodoDetailScreen() {
    const route = useRoute<TodoScreenRouteProp>();
    const navigation = useNavigation<TodoScreenNavigationProp>();
    const { todoId } = route.params;
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchTodo = async () => {
            try {
              const response = await api.get(`/api/todos/${todoId}/`);
              setTodo(response.data);
            } catch (error) {
              console.error('Failed to fetch todo details', error);
            } finally {
              setLoading(false);
            }
          };
          fetchTodo()
    }, [todoId])

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

    if (!todo){
        return (
            <View style={styles.container}>
              <Text style={styles.error}>Todo not found</Text>
            </View>
          );
    }

    return  (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.name}</Text>
            <Text>{todo.description}</Text>
            <Text>Created at: {todo.created_at}</Text>
            <Text>Status: {todo.is_completed ? 'Completed' : 'Pending'}</Text>
            <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
        Back
      </Button>
        </View>
    )
}
