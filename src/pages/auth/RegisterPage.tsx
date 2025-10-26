import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';
import { RegisterForm } from '@components/forms/RegisterForm';

export const RegisterPage = () => {
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
        <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-300 text-sm">Join us and start your journey</p>
      </div>

      <div className="p-8">
        <RegisterForm />
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-300 text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-white hover:text-gray-200 underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
