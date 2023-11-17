import {RequestStatus} from "./requests";

export interface AuthState {
  accessToken?: string;
  user?: User;
  status: RequestStatus;
  error?: string;
}
  
  export interface User {
    userId?: string;
    userName?: string;
  }
  