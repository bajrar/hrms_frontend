import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { setClose, setOpen } from '../../redux/features/sidebarSlice';
import SideBarTab from './SidebarTab';
import './layout.css';
import Navbar from '../Ui/Navbar';

const Index = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="layout">
      <SideBarTab />
      <main
        className="main-container"
        onClick={() => {
          dispatch(setOpen());
        }}
      >
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
