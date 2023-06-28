import React from 'react';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

type PageNotFoundProps = {};

export const PageNotFound = ({}: PageNotFoundProps) => (
  <>
    <Layout>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="nopagefound.jpeg" alt="No page Found" />
        <Link to='/'>
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </Layout>
  </>
);
