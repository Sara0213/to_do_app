import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Appbar, Chip } from 'react-native-paper';
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

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/todos/');
      console.log('Fetched todos:', response.data); // Debug log to check the response
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    navigation.navigate('Login');
  };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Todo List" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>
      {todos.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {todos.map((todo) => (
            <TouchableOpacity key={todo.id.toString()} onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
              <View style={styles.todoItem}>
                <Text style={styles.todoTitle}>{todo.name}</Text>
                <Text>{todo.description}</Text>
                <Text>{todo.created_at}</Text>
                <Chip
                  icon="clock-outline"
                  textStyle={styles.chipText}
                >
                  {todo.is_completed ? 'Completed' : 'Pending'}
                </Chip>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noTodosContainer}>
          <Text style={styles.noTodosText}>You don't have any tasks</Text>
        </View>
      )}
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('CreateTodo')}
        style={styles.createTodoButton}
      >
        Create New Task
      </Button>
    </View>
  );
}
