import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { RootState } from '../../store';
import { useTokenData } from '../../hooks/userTokenData';
import Spinner from '../Spinner/Spinner';

export const AdminProtectedRoute = () => {
  const adminPrivate = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(verifyTokenStatus() as any)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { isAdmin, isAdminTemp } = useTokenData();
  if (loading) {
    return <Spinner />;
  }
  return isAdmin ? <Outlet /> : <Navigate to='/' />;
};
