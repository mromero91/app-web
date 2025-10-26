import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  error = false,
  label,
  className = '',
  ...props
}) => {
  const baseClasses =
    'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200';
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-blue-500';

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
    </div>
  );
};
