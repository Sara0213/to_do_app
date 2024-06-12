import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Appbar, Chip, IconButton, Switch } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { RootStackParamList, Todo } from '../types';
import api from '../api';
import { formatDate } from '../format_date';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);  
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/todos/');
      const sortedTodos = response.data.sort((a: Todo, b: Todo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setTodos(sortedTodos);
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

  const renderTodo = (todo: Todo) => {
    return (
      <TouchableOpacity key={todo.id?.toString()} onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
        <View style={styles.todoItem}>
          <View style={styles.checkIconContainer}>
            {!todo.is_completed && (
              <IconButton
                icon="check-circle-outline"
                iconColor="blue"
                size={24}
                onPress={() => handleMarkAsDone(todo.id)}
                style={styles.markAsDoneIcon}
              />
            )}
            {todo.is_completed && (
              <IconButton
                icon="check-circle"
                iconColor="green"
                size={24}
                style={styles.markAsDoneIcon}
              />
            )}
          </View>
          <View style={styles.todoContent}>
            <Text style={styles.todoTitle}>{todo.name}</Text>
            <Text>{todo.description}</Text>
            <Text>Created at: {formatDate(todo.created_at)}</Text>
            <Chip
              icon={todo.is_completed ? "check" : "clock-outline"}
              style={styles.smallChip}
            >
              {todo.is_completed ? 'Completed' : 'Pending'}
            </Chip>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredTodos = todos.filter(todo => todo.is_completed === showCompleted);

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
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>{showCompleted ? 'Completed tasks': 'Your ongoing tasks' }</Text>
        <Switch
          value={showCompleted}
          onValueChange={() => setShowCompleted(!showCompleted)}
        />
      </View>
      {filteredTodos.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredTodos.map(renderTodo)}
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
