import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { RootState } from '../../store';
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
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;

  // if (loading) {
  //   // Render a loading spinner or component while verifying the token

  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  return userRole === 'admin' && adminPrivate ? (
    <Outlet />
  ) : (
    <Navigate to='/dashboard' />
  );
};
