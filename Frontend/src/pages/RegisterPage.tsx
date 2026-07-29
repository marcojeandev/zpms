import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../services/auth';
import { Heart, Eye, EyeOff } from 'lucide-react';


// Required fields (matches backend validation)
const requiredFields = ['firstname', 'lastname', 'username', 'email', 'password'];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    suffix: '',
    nickname: '',
    // employeeID is NOT here
    citizenship: '',
    gender: 'MALE' as 'MALE' | 'FEMALE',
    civil_status: '',
    religion: '',
    age: '',
    birthday: '',
    birthPlace: '',
    contact: '',
    username: '',
    email: '',
    password: '',
    employee_type: 'regular' as 'head' | 'regular' | 'probationary',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await register(form);
      localStorage.setItem('token', data.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const isRequired = (key: string) => requiredFields.includes(key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 text-sm mt-1">Register as a new employee</p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => {
            // Special handling for select fields
            if (key === 'gender') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender {isRequired(key) && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="gender"
                    value={value}
                    onChange={handleChange}
                    required={isRequired(key)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              );
            }
            if (key === 'employee_type') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    Employee Type {isRequired(key) && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="employee_type"
                    value={value}
                    onChange={handleChange}
                    required={isRequired(key)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="regular">Regular</option>
                    <option value="probationary">Probationary</option>
                    <option value="head">Head</option>
                  </select>
                </div>
              );
            }
            if (key === 'password') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    Password {isRequired(key) && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      required={isRequired(key)}
                      className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
              );
            }
            // Regular text inputs
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/_/g, ' ')} {isRequired(key) && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name={key}
                  value={value || ''}
                  onChange={handleChange}
                  required={isRequired(key)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            );
          })}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-red-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}