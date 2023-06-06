import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { useEffect } from 'react';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { RootState } from '../../store';

export const AdminProtectedRoute = (children: any) => {
  const adminPrivate = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
    console.log('verifyTokenStatus');
  }, [dispatch]);

  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;
  return userRole === 'admin' && adminPrivate ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
  //   return adminPrivate ? <Outlet /> : <Navigate to='/' />;
};
