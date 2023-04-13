import { Input } from 'antd';
import { Header } from '../Header/header';
import { Sidebar } from '../Ui/Sidebar/sidebar';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';

type Props = {};

export const Homepage = (props: Props) => {
  return (
    <>
      <Header />
      <div className='row'>
        <div className='col-2'>
          <Sidebar />
        </div>
        <div className='col-10 p-4'>
          <div className='searchbox'>
            <Input.Search
              placeholder='Search here...'
              className='mb-4'
              size='large'
            />
          </div>
          <div className='calendar'>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};
