import { useState } from 'react';
import { updateProfile } from '@services/api/users';
import type { User } from '@/types/api';

interface UseUpdateProfileReturn {
  updateProfile: (userData: Partial<User>) => Promise<User>;
  loading: boolean;
  error: string | null;
}

export const useUpdateProfile = (): UseUpdateProfileReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateProfile = async (
    userData: Partial<User>
  ): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await updateProfile(userData);
      return updatedUser;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error updating profile';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile: handleUpdateProfile,
    loading,
    error,
  };
};
