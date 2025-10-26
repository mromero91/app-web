import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@components/layout/PublicLayout';
import { AuthLayout } from '@components/layout/AuthLayout';
import { LoginPage } from '@pages/auth/LoginPage';
import { RegisterPage } from '@pages/auth/RegisterPage';
import { DashboardPage } from '@pages/dashboard/DashboardPage';
import { RedirectHandler } from '@components/RedirectHandler';

import { ProtectedRoute } from './ProtectedRoute';
import UsersPage from '@/pages/users/UsersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RedirectHandler />,
  },

  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]);
