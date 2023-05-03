import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import './dashboard-page.css';

const Dashboard = () => {
  return (
    <div className='dashboard-page'>
      <div className='dash-container'>
        {/* <div className='dash-container__header padding'>
          <h2 className='title'>Dashboard</h2>
        </div> */}
        <Layout>
          <Navbar />
          {/* <SubMenu /> */}
        </Layout>
      </div>
    </div>
  );
};

export default Dashboard;
