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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    margin: 16,
    padding: 4,
    marginRight: 64,
    marginLeft: 64,
  },
  descriptionInput: {
    height: 100,
  },
  scrollView: {
    padding: 16,
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  completedChip: {
    backgroundColor: 'green',
  },
  pendingChip: {
    backgroundColor: 'red',
  },
  chipText: {
    color: 'white',
  },
  markAsDoneButton: {
    marginTop: 8,
    backgroundColor: 'green',
  },
  checkIconContainer: {
    marginRight: 10,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  markAsDoneIcon: {
    margin: 0,
  },
  smallChip: {
    transform: [{ scale: 0.8 }],
    alignSelf: 'flex-start', 
  },
});
