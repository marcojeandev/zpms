import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Clock,
  Calendar,
  Megaphone,
  Fingerprint,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Employees', icon: Users, path: '/admin/employees' },
  { name: 'Leaves', icon: CalendarClock, path: '/admin/leaves' },
  { name: 'OverTime', icon: Clock, path: '/admin/overtime' },
  { name: 'Schedules', icon: Calendar, path: '/admin/schedules' },
  { name: 'Announcement', icon: Megaphone, path: '/admin/announcement' },
  { name: 'Attendance', icon: Fingerprint, path: '/admin/attendance' },
  {
    name: 'System Management',
    icon: Settings,
    subItems: [
      { name: 'Departments', path: '/admin/system/departments' },
      { name: 'Unit/Section', path: '/admin/system/unit-section' },
      { name: 'Positions', path: '/admin/system/positions' },
    ],
  },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - fixed height, flex column */}
      <aside className="w-64 bg-white shadow-xl flex flex-col h-full border-r border-red-100">
        {/* Header */}
        <div className="p-4 border-b border-red-100 flex items-center gap-2 bg-gradient-to-r from-red-50 to-white">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            HR
          </div>
          <span className="text-lg font-semibold text-gray-800">Admin Panel</span>
        </div>

        {/* Scrollable nav area */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scroll">
          {navItems.map((item) => {
            if (item.subItems) {
              return (
                <div key={item.name} className="mb-1">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className="text-gray-500 group-hover:text-red-600" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    {openDropdown ? (
                      <ChevronDown size={18} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={18} className="text-gray-400" />
                    )}
                  </button>
                  {openDropdown && (
                    <div className="ml-7 mt-1 space-y-1 border-l-2 border-red-200 pl-3">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-3 py-1.5 text-sm text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
              >
                <item.icon size={20} className="text-gray-500 group-hover:text-red-600" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout - fixed at bottom */}
        <div className="p-4 border-t border-red-100 bg-white/80 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <LogOut size={20} className="text-gray-400 group-hover:text-red-600" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-gray-50">
        {/* Optional top bar (you can add breadcrumbs or user avatar here) */}
        <div className="bg-white shadow-sm border-b border-red-100 px-6 py-3 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Hr Management System</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Admin</span>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-semibold text-sm">
              A
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>

      {/* Custom scrollbar styling - add to global CSS or tailwind config */}
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}