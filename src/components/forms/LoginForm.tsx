import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLogin } from '@hooks/useLogin';
import { loginSchema } from '@utils/validation';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { login, loading, error, clearError } = useLogin();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    clearError();
    await login(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium"
          >
            User
          </label>
          <Field as={Input} id="email" name="email" type="email" />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-300 text-sm mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium"
            >
              Password
            </label>
            <span className="text-gray-300 text-sm">Optional</span>
          </div>
          <Field as={Input} id="password" name="password" type="password" />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-300 text-sm mt-1"
          />
        </div>

        {error && (
          <div className="text-red-300 text-sm text-center bg-red-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Continue'}
        </Button>
      </Form>
    </Formik>
  );
};
