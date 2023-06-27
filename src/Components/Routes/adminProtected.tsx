import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { RootState } from '../../store';
import { useTokenData } from '../../hooks/userTokenData';
import Spinner from '../Spinner/Spinner';

export const AdminProtectedRoute = () => {
  const adminPrivate = localStorage.getItem('token');

  const { isAdmin, isAdminTemp, isLoading } = useTokenData();
  if (isLoading) {
    return <Spinner />;
  }
  return isAdminTemp || isAdmin ? <Outlet /> : <Navigate to='/' />;
};
