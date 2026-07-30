// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

import AdminLayout from '@/pages/admin/components/AdminLayout';

// Admin pages
import Dashboard from '@/pages/admin/Dashboard';
import Employees from '@/pages/admin/Employees';
import Leaves from '@/pages/admin/Leaves';
import OverTime from '@/pages/admin/OverTime';
import Schedules from '@/pages/admin/Schedules';
import Announcement from '@/pages/admin/Announcement';
import AttendanceAdmin from '@/pages/admin/Attendance';
import Departments from '@/pages/admin/system/Departments';
import UnitSection from '@/pages/admin/system/UnitSection';
import Positions from '@/pages/admin/system/Positions';

// Public pages
import Landing from '@/pages/LandingPage';
import Login from '@/pages/LoginPage';
import Register from '@/pages/RegisterPage';
import AttendancePublic from '@/pages/AttendancePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/attendance" element={<AttendancePublic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="overtime" element={<OverTime />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="announcement" element={<Announcement />} />
              <Route path="attendance" element={<AttendanceAdmin />} />
              <Route path="system/departments" element={<Departments />} />
              <Route path="system/unit-section" element={<UnitSection />} />
              <Route path="system/positions" element={<Positions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;