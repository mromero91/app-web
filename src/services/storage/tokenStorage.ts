// TODO MOVE THIS ENVIROMENT VARIABLES
const TOKEN_KEY = 'aura_token';
const USER_KEY = 'aura_user';

export interface StoredToken {
  token: string;
  expiresIn: string;
  timestamp: number;
}

export interface StoredUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: 'admin' | 'user';
}

export const setAuthData = (
  token: string,
  expiresIn: string,
  user: StoredUser
): void => {
  const tokenData: StoredToken = {
    token,
    expiresIn,
    timestamp: Date.now(),
  };

  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = (): string | null => {
  try {
    const tokenData = localStorage.getItem(TOKEN_KEY);
    if (!tokenData) return null;

    const parsed: StoredToken = JSON.parse(tokenData);

    if (isTokenExpired(parsed)) {
      removeAuthData();
      return null;
    }

    return parsed.token;
  } catch (error) {
    console.error('Error getting token:', error);
    removeAuthData();
    return null;
  }
};

export const getUser = (): StoredUser | null => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;

    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const isTokenExpired = (tokenData?: StoredToken): boolean => {
  if (!tokenData) {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return true;
    tokenData = JSON.parse(stored);
  }

  const now = Date.now();
  const tokenAge = now - tokenData.timestamp;

  const expiresInMs = parseExpiresIn(tokenData.expiresIn);

  return tokenAge >= expiresInMs;
};

const parseExpiresIn = (expiresIn: string): number => {
  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn.slice(0, -1));

  switch (unit) {
    case 'h': // horas
      return value * 60 * 60 * 1000;
    case 'd': // días
      return value * 24 * 60 * 60 * 1000;
    case 'm': // minutos
      return value * 60 * 1000;
    case 's': // segundos
      return value * 1000;
    default:
      return 24 * 60 * 60 * 1000; // 24 horas por defecto
  }
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return token !== null && !isTokenExpired();
};

export const removeAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
