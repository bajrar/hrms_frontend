import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { verifyTokenStatus } from '../redux/features/verifyTokenSlice';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';

const AdminRouteHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, []);

  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;

  const AdminRouteComponent: React.FC<P> = (props) => {
    if (userRole === 'admin') {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to='/' replace />;
    }
  };

  return AdminRouteComponent;
};

export default AdminRouteHOC;
