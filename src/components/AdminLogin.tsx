import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onPasswordSubmit: (password: string) => boolean;
}

export function AdminLogin({ onLogin, onPasswordSubmit }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onPasswordSubmit(password);
    if (success) {
      onLogin(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <KeyRound className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900">Admin Access</h2>
        <p className="text-gray-500 mt-2">Enter password to view submissions</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter admin password"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">Invalid password</p>
        )}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}