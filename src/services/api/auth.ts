import apiClient from '@services/api/client';
import { API_ENDPOINTS } from '@utils/constants';
import type { LoginResponse, ApiResponse, User } from '@/types/api';

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    ),
  register: (userData: Partial<User>) =>
    apiClient.post<ApiResponse<User>>(API_ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  getProfile: () => apiClient.get(API_ENDPOINTS.AUTH.PROFILE),
};
