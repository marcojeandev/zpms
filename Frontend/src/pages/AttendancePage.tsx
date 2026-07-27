import { Fingerprint, ScanFace } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AttendancePage() {
  const navigate = useNavigate();

  const handleBiometric = (method: string) => {
    alert(`Biometric ${method} clicked (UI demo)`);
    // future: call API /attendance
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance</h1>
        <p className="text-gray-600 mb-6">Verify your identity using biometrics</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleBiometric('Fingerprint')}
            className="flex items-center justify-center gap-3 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Fingerprint size={24} />
            Fingerprint Scan
          </button>

          <button
            onClick={() => handleBiometric('Face Recognition')}
            className="flex items-center justify-center gap-3 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <ScanFace size={24} />
            Face Recognition
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}