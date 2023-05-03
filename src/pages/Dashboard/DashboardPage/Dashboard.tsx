import Layout from '../../../Components/Layout';
import Navbar from '../../../Components/Ui/Navbar';
import './dashboard-page.css';
import { SubMenu } from './SubMenu/SubMenu';

const Dashboard = () => {
  return (
    <div className='dashboard-page'>
      <div className='dash-container'>
        <Layout>
          <Navbar />
          <SubMenu />
        </Layout>
        {/* <div className='dash-container__header padding'>
          <h2 className='title'>Dashboard</h2>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
