export type User = {
    id: number;
    username: string;
    email: string;
  
  };


export type RootStackParamList = {
    Home: undefined;
    Login: { message: string } | undefined;
    Register: undefined;
    ProtectedRoute: undefined
  };


export type Todo = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    is_completed: boolean;
  };
  
  