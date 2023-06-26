import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { RootState } from '../../store';
import Spinner from '../Spinner/Spinner';

export const ProtectedRoute = (children: any) => {
  const adminPrivate = localStorage.getItem('token');
  const token = useAppSelector((state: any) => state.authSlice.token);

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return token || adminPrivate ? <Outlet /> : <Navigate to='/' />;
};
