// src/components/Auth/RegisterModal.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Передаем username как fullName
      await register(username, email, password, username);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-8">Create account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
            required
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-2xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline font-medium">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;