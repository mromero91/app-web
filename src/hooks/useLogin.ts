import { useState } from 'react';
import { useAuthStore } from '@stores/authStore';
import { authService } from '@services/api/auth';
import { setAuthData, removeAuthData } from '@services/storage/tokenStorage';
import { loginSchema } from '@utils/validation';

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: loginStore } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      await loginSchema.validate(credentials, { abortEarly: false });

      const response = await authService.login(credentials);
      const { user, token } = response.data.data;

      setAuthData(token.token, token.expiresIn, {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.active,
        role: user.role,
      });

      await loginStore(credentials);
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        setError(err.errors[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error de conexión. Intenta nuevamente.');
      }

      removeAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    loading,
    error,
    clearError,
  };
};
