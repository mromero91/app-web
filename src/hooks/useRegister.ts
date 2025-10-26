import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@services/api/auth';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UseRegisterReturn {
  register: (data: RegisterData) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);

      if (response.data.success) {
        navigate('/login', { replace: true });
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    register,
    loading,
    error,
    clearError,
  };
};
