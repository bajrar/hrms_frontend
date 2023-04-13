import './dashboard.css';
import Layout from '../Layout';
import { DashboardNavbar } from './DashboardNavbar/Navbars';

type DashboardProps = {};

export const Dashboard = ({}: DashboardProps) => (
  <div>
    <Layout>
      <DashboardNavbar />
    </Layout>
  </div>
);
