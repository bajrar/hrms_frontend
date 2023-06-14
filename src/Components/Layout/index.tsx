import { useAppDispatch } from '../../hooks/useTypedSelector';
import { setClose, setOpen } from '../../redux/features/sidebarSlice';
import SideBarTab from './SidebarTab';
import './layout.css';

const Index = ({ children }: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className='layout'>
      <SideBarTab />
      <main
        className='main-container'
        onClick={() => {
          dispatch(setOpen());
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Index;
