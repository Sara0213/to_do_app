import React, { useEffect, useState, useCallback } from 'react';
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

  const handleMarkAsDone = async (todoId: number) => {
    try {
      await api.patch(`/api/todos/${todoId}/`, { is_completed: true });
      fetchTodos(); 
    } catch (error) {
      console.error('Failed to mark todo as done', error);
    }
  };

  const renderTodo = (todo: Todo) => (
    <TouchableOpacity key={todo.id?.toString()} onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
      <View style={styles.todoItem}>
        <Text style={styles.todoTitle}>{todo.name}</Text>
        <Text>{todo.description}</Text>
        <Text>{todo.created_at}</Text>
        <Chip
          style={todo.is_completed ? styles.completedChip : styles.pendingChip}
          textStyle={styles.chipText}
        >
          {todo.is_completed ? 'Completed' : 'Pending'}
        </Chip>
        {!todo.is_completed && (
          <Button mode="contained" onPress={() => handleMarkAsDone(todo.id)} style={styles.markAsDoneButton}>
            Mark as Done
          </Button>
        )}
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
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Todo List" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>
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
