import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({ login: loginInput, password });
      // Expected response: { token, user }
      const { token, user } = response;

      // Store in context & localStorage
      authLogin(token, user);

      toast.success('Welcome back!');

      // Redirect based on role
      if (user?.user_role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // or employee dashboard later
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid credentials.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mt-1">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              type="text"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              placeholder="Enter username or email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-red-600 font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}