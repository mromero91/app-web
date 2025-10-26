import type { User } from '@/types/api';
import { create } from 'zustand';
import { isAuthenticated, getUser } from '@services/storage/tokenStorage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) => {
    set({
      user: userData,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  updateUser: (user) => {
    set({ user });
  },

  checkAuth: () => {
    const authenticated = isAuthenticated();
    const storedUser = getUser();

    set({
      user: storedUser as User | null,
      isAuthenticated: authenticated,
    });
  },
}));
