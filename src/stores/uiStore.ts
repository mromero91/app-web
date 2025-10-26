import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  modals: Record<string, boolean>;
  // TODO: Implement notifications type
  notifications: any[];
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  showModal: (modalId: string) => void;
  hideModal: (modalId: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  sidebarCollapsed: false,
  modals: {},
  notifications: [],

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  toggleSidebarCollapse: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setTheme: (theme) => {
    set({ theme });
  },

  showModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    }));
  },

  hideModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    }));
  },
}));
