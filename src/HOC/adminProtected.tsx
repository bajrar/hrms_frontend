import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { verifyTokenStatus } from '../redux/features/verifyTokenSlice';
import { RootState } from '../store';
const AdminRouteHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  //   const isAdmin = true; // Replace this with your authentication logic or role check

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, []);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;

  const AdminRouteComponent: React.FC<P> = (props) => {
    if (userRole === 'admin') {
      // If the user is an admin, render the wrapped component
      return <WrappedComponent {...props} />;
    } else {
      return <>Not Authorized</>;
    }
  };

  return AdminRouteComponent;
};

export default AdminRouteHOC;
