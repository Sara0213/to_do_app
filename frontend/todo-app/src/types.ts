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
  