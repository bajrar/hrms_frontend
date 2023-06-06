import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (children: any) => {
  const adminPrivate = localStorage.getItem('token');
  return adminPrivate ? <Outlet /> : <Navigate to='/' />;
};
