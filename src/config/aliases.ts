// Configuración de alias para importaciones
// Documenta todos los alias disponibles

export const ALIASES = {
  // Alias principal
  '@': './src',

  // Alias específicos por carpeta
  '@components': './src/components',
  '@pages': './src/pages',
  '@hooks': './src/hooks',
  '@services': './src/services',
  '@stores': './src/stores',
  '@types': './src/types',
  '@utils': './src/utils',
  '@styles': './src/styles',
  '@assets': './src/assets',
  '@routes': './src/routes',
  '@config': './src/config',
} as const;

// Ejemplos de uso:
// import { Button } from '@components/ui/Button';
// import { useAuth } from '@hooks/useAuth';
// import { authStore } from '@stores/authStore';
// import { User } from '@types/auth';
// import { formatDate } from '@utils/helpers';
// import { LoginPage } from '@pages/auth/LoginPage';
// import { authService } from '@services/api/auth';
