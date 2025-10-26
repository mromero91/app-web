import apiClient from '@services/api/client';
import type { User, UsersResponse, ApiResponse } from '@/types/api';

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await apiClient.get<ApiResponse<UsersResponse>>('/users');
  return response.data.data;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.post<ApiResponse<User>>('/users', userData);
  return response.data.data;
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>(
    `/users/${id}`,
    userData
  );
  return response.data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};

export const getProfile = async (): Promise<User> => {
  const response =
    await apiClient.get<ApiResponse<{ user: User }>>('/users/profile');
  return response.data.data.user;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put<ApiResponse<{ user: User }>>(
    '/users/profile',
    userData
  );
  return response.data.data.user;
};
