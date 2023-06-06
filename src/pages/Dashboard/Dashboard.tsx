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
  const userData = useAppSelector((state: RootState) => state.userSlice.value);

  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  console.log(tokenData, '<------ this is token data');
  return (
    <div className='dashboard-page'>
      <div className='dash-container'>
        {/* <div className='dash-container__header padding'>
          <h2 className='title'>Dashboard</h2>
        </div> */}
        <Layout>
          <Navbar />
          <SubMenu />
        </Layout>
      </div>
    </div>
  );
};

export default Dashboard;
