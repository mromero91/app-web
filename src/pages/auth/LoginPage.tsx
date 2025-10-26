import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';
import { LoginForm } from '@components/forms/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
      </div>

      <div className="p-8">
        <LoginForm />
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-300 text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-white hover:text-gray-200 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
