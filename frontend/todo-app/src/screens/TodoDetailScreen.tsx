import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { RootStackParamList, Todo } from '../types';
import api from '../api';
import { formatDate } from '../format_date';

type TodoScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;
type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;

export default function TodoDetailScreen() {
  const route = useRoute<TodoScreenRouteProp>();
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const { todoId } = route.params;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await api.get(`/api/todos/${todoId}/`);
        setTodo(response.data);
        setDescription(response.data.description); // Set initial description
      } catch (error) {
        console.error('Failed to fetch todo details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [todoId]);

  const handleSave = async () => {
    if (todo) {
      try {
        await api.patch(`/api/todos/${todoId}/`, { description });
        navigation.goBack();
      } catch (error) {
        console.error('Failed to update todo description', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Todo not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.name}</Text>
      {todo.is_completed ? (
        <Text>{todo.description}</Text>
      ) : (
        <TextInput
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          multiline
          numberOfLines={4}
          style={styles.textInput}
        />
      )}
      <Text>Created at: {formatDate(todo.created_at)}</Text>
      <Text>Status: {todo.is_completed ? 'Completed' : 'Pending'}</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Back
        </Button>
        {!todo.is_completed && (
          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Save
          </Button>
        )}
      </View>
    </View>
  );
}
