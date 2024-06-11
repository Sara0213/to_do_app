import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { RootStackParamList, Todo } from '../types';
import api from '../api';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const fetchTodos = async () => {
    try {
      const response = await api.get('/api/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );


  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    navigation.navigate('Login');
  };

  const renderTodo = (todo: Todo) => (
    <TouchableOpacity key={todo.id} onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
      <View style={styles.todoItem}>
        <Text style={styles.todoTitle}>{todo.name}</Text>
        <Text>{todo.description}</Text>
        <Text>{todo.created_at}</Text>
        <Text>{todo.is_completed ? 'Completed' : 'Pending'}</Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
      {todos.length > 0 ? (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {todos.map(renderTodo)}
      </ScrollView>
        
      ) : (
        <View style={styles.noTodosContainer}>
          <Text style={styles.noTodosText}>You don't have any tasks</Text>
        </View>
      )}
        <Button
            mode="contained"
            onPress={ () => navigation.navigate('CreateTodo')}
            style={styles.createTodoButton}
          >
            Create New Task 
        </Button>
    </View>
  );
}
