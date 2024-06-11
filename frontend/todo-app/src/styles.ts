import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noTodosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTodosText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  createTodoButton: {
    marginTop: 16,
  },
  descriptionInput: {
    height: 100,
  },
});
