import React from 'react';

interface FormInputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  pattern?: string;
}

export function FormInput({ 
  name,
  label, 
  type, 
  value, 
  onChange, 
  required = true, 
  multiline = false,
  placeholder,
  pattern
}: FormInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200 min-h-[120px] resize-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200"
        />
      )}
    </div>
  );
}