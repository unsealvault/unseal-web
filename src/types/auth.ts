// src/types/auth.ts
export interface User {
  _id: string;
  email: string;
  name?: string;
  role: string;
  status: string;
}

export interface AuthResponseData {
  statusCode: number;
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpVariables {
  input: {
    email: string;
    password: string;
    name?: string;
  };
}

export interface LoginVariables {
  loginInput: {
    email: string;
    password: string;
  };
}

export interface RegisterResponse {
  signUp: {
    statusCode: number;
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      email: string;
      name?: string;
      role: string;
      status: string;
    };
  };
}