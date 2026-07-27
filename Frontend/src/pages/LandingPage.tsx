import { useNavigate } from 'react-router-dom';
import { Fingerprint, LogIn, UserPlus, Heart } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex flex-col">
      {/* Header / Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center">
          {/* Logo / Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-red-600 to-rose-600 rounded-full shadow-lg">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Zamboanga Puericulture
            <span className="block text-2xl md:text-3xl font-light text-gray-600 mt-1">
              Maternity & Children's Hospital
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Streamlined personnel management for healthcare excellence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              <LogIn size={20} />
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-red-600 text-lg font-semibold rounded-lg border-2 border-red-600 shadow-sm hover:bg-red-50 transition-transform transform hover:scale-105"
            >
              <UserPlus size={20} />
              Register
            </button>
            <button
              onClick={() => navigate('/attendance')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rose-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-rose-700 transition-transform transform hover:scale-105"
            >
              <Fingerprint size={20} />
              Biometric Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Zamboanga Puericulture Maternity & Children's Hospital. All rights reserved.
      </div>
    </div>
  );
}