import React, { useState } from 'react';
import { Lock, Send } from 'lucide-react';
import { FormInput } from './components/FormInput';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { auth } from './utils/auth';
import type { Submission } from './types';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(() => auth.getSubmissions());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      ...formData,
      timestamp: Date.now(),
    };
    auth.saveSubmission(newSubmission);
    setSubmissions([newSubmission, ...submissions]);
    setFormData({ name: '', phone: '', email: '', idea: '' });
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idea: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (password: string) => {
    return auth.authenticate(password);
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setIsAuthenticated(false);
    } else {
      setIsAdmin(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">Share Your Ideas</h1>
          <button
            onClick={toggleAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Lock className="w-4 h-4" />
            {isAdmin ? 'Exit Admin' : 'Admin'}
          </button>
        </div>

        {isAdmin ? (
          isAuthenticated ? (
            <AdminPanel submissions={submissions} />
          ) : (
            <AdminLogin 
              onLogin={setIsAuthenticated}
              onPasswordSubmit={handlePasswordSubmit}
            />
          )
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <FormInput
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Suryanshu Anand"
            />
            <FormInput
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 943XXXXXXX"
              pattern="^\+?[1-9][0-9\s-()]{7,}"
            />
            <FormInput
              name="email"
              label="Email ID"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="xyz@example.com"
            />
            <FormInput
              name="idea"
              label="Tell me an idea"
              type="text"
              value={formData.idea}
              onChange={handleChange}
              multiline
              placeholder="Share your innovative idea here..."
            />
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}