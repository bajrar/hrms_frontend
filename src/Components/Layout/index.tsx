import { useState } from 'react';
import SideBarTab from './SidebarTab';
import './layout.css';

const index = ({ children }: any) => {
  return (
    <div className='layout'>
      <SideBarTab />
      <main className='main-container'>{children}</main>
    </div>
  );
};

export default index;
