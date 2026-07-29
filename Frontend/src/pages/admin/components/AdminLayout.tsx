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
    path: '#',
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <div className="flex items-center gap-2 p-2 text-gray-300 font-semibold">
                    <item.icon size={20} />
                    {item.name}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block p-1 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-gray-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}