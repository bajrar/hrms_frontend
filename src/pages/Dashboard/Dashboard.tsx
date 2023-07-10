import { useEffect } from 'react';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { SubMenu } from './DashboardPage/SubMenu/SubMenu';
import './dashboard-page.css';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { RootState } from '../../store';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dash-container">
        <SubMenu />
      </div>
    </div>
  );
};

export default Dashboard;
