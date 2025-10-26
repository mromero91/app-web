import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRegister } from '@hooks/useRegister';
import { registerSchema } from '@utils/validation';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { register, loading, error, clearError } = useRegister();

  const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    clearError();
    await register({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-white text-sm font-medium"
            >
              First Name
            </label>
            <Field as={Input} id="firstName" name="firstName" type="text" />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-300 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-white text-sm font-medium"
            >
              Last Name
            </label>
            <Field as={Input} id="lastName" name="lastName" type="text" />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-300 text-sm mt-1"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium"
          >
            Email
          </label>
          <Field as={Input} id="email" name="email" type="email" />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-300 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium"
          >
            Password
          </label>
          <Field as={Input} id="password" name="password" type="password" />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-300 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-white text-sm font-medium"
          >
            Confirm Password
          </label>
          <Field
            as={Input}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
          <ErrorMessage
            name="confirmPassword"
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
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </Form>
    </Formik>
  );
};
