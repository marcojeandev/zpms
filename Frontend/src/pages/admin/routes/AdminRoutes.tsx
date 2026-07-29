import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AdminRoutes() {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return <Outlet />;
}