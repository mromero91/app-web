import { useState, useEffect } from 'react';
import { getProfile } from '@services/api/users';
import type { User } from '@/types/api';

interface UseProfileReturn {
  profile: User | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const userData = await getProfile();
      setProfile(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
  };
};
