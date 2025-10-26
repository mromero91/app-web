import { useState, useEffect } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@services/api/users';
import type { User, UsersResponse } from '@/types/api';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  total: number;
  fetchUsers: () => Promise<void>;
  createUser: (userData: Partial<User>) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response: UsersResponse = await getUsers();
      setUsers(response.users);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: Partial<User>): Promise<User> => {
    try {
      setError(null);
      const newUser = await createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      setTotal((prev) => prev + 1);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating user');
      throw err;
    }
  };

  const handleUpdateUser = async (
    id: string,
    userData: Partial<User>
  ): Promise<User> => {
    try {
      setError(null);
      const updatedUser = await updateUser(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating user');
      throw err;
    }
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      setError(null);
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting user');
      throw err;
    }
  };

  const refetch = async (): Promise<void> => {
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    total,
    fetchUsers,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    refetch,
  };
};
