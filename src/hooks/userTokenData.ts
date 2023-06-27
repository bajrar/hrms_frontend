import { useGetTokenDataQuery } from '../redux/api/tokenSlice';
import { RootState } from '../store';
import { useAppSelector } from './useTypedSelector';

export const useTokenData = () => {
  const { data: tokenData, isLoading } = useGetTokenDataQuery('token');
  const authData = useAppSelector((state: RootState) => state.userSlice.value);
  const userDetails = useAppSelector((state: RootState) => state.userSlice.userDetails);
  const isAdmin = authData?.role === 'admin' || tokenData?.role === 'admin';
  const userSn = tokenData?.userSn ? tokenData?.userSn : userDetails?.employeeNumber;
  const userTokenData = useAppSelector((state: RootState) => state.userRoleSlice);
  let checkIsAdmin: boolean;
  if (isAdmin) {
    checkIsAdmin = userTokenData?.isAdmin;
  } else {
    checkIsAdmin = isAdmin;
  }
  const isAdminTemp = isAdmin ? checkIsAdmin : isAdmin;

  return { isAdmin, userSn, isAdminTemp };
};
