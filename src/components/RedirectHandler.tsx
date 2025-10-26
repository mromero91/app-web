// Componente para manejar redirecciones iniciales
// Verifica autenticación y redirige apropiadamente

import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

export const RedirectHandler = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Si está autenticado, ir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no está autenticado, ir al login
  return <Navigate to="/login" replace />;
};
