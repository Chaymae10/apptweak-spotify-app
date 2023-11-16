export enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export type ErrorPayload = {
  message: string;
};

export interface AxiosOptions {
  accessToken?: string;
  baseURL?: string;
}

export interface AccessTokenPayload {
  accessToken: string;
}

/////////////////////////////////// User //////////////////////////////////

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
