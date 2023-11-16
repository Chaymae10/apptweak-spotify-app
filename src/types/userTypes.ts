export interface AuthState {
    accessToken?: string;
    user?: User;
    error?: string;
  }
  
  export interface User {
    userId?: string;
    userName?: string;
  }
  