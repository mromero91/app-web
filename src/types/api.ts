export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: unknown;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
}

export interface Token {
  token: string;
  expiresIn: string;
}

export interface LoginResponse {
  user: User;
  token: Token;
  message: string;
}
