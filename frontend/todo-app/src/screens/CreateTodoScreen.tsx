import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import api from '../api';
import { styles } from '../styles';


type CreateTodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateTodo'>;


export default function CreateTodoScreen() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation<CreateTodoScreenNavigationProp>();


    const handleCreateTodo = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/todos/', {
                name,
                description,
            });

            if (response.status === 201) {
                navigation.navigate('Home')
            }
        } catch (err) {
            setError('Failed to create todo');
        } finally {
            setLoading(false);
          }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Todo</Text>
                <TextInput
                    label="Todo Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                 <TextInput
                    label="Description"
                    value={description}
                    multiline
                    onChangeText={setDescription}
                    style={[styles.input, styles.descriptionInput]}
                />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button
                mode="contained"
                onPress={handleCreateTodo}
                loading={loading}
                style={styles.button}
            >
                Create Task
            </Button>
        </View>
    );

}