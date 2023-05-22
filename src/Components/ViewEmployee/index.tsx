import { useEffect, useState } from 'react';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import './attendance.css';
import '../../Components/Employee/add-employee-form.css';
import AttendaceReport from '../../Components/Ui/Tables/AttendaceReport';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { WorkingCondition } from '../../utils/Constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { getAttedanceStatus } from '../../redux/features/attendanceStatusSlice';
import Selects from '../../Components/Ui/Selects/Selects';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { todayInBsFormat } from '../../Components/Customcalendar/GetTodaysDate';
import ViewAllEmployee from '../Ui/Tables/ViewAllEmployee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface IEmployeeStats {
  status: string;
  backgroundColor?: string;
  numberOfEmployee?: any;
  color?: string;
  classNames?: string;
}
export const EmployeeStats = ({
  backgroundColor,
  color,
  status,
  numberOfEmployee,
  classNames,
}: IEmployeeStats) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderLeft: `4px solid ${color}`,
      }}
      className={`employee-stats ${classNames}`}
    >
      {status}{' '}
      {numberOfEmployee === 0 || numberOfEmployee ? (
        <> &#40; {numberOfEmployee} &#41; </>
      ) : (
        ''
      )}
    </div>
  );
};

const ViewEmployee = () => {
  const [defaultDate, setDefaultDate] = useState(todayInBsFormat);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const dispatch = useAppDispatch();

  const onSelect = (e: any) => {
    setStatus(e);
  };

  const onDateChange = ({ bsDate }: any) => {
    console.log(bsDate, 'bsData');

    setDefaultDate(bsDate);
  };

  useEffect(() => {
    dispatch(getAttedanceStatus() as any);
  }, [dispatch]);

  const { attendanceStatus } = useAppSelector(
    (state) => state.attendanceStatusSlice
  );
  const showModal = () => {
    setIsModalOpen(true);
  };


  return (
    <>
    {/* <Layout> */}
      {/* <Navbar /> */}
      <div className='attendace-page' >
        {/* <div>

        <BreadCrumbs
          imagesrc='/images/attendance.svg'
          location='Employee Management'
          location1='View Employee'
        />
        <hr />
    
        <div className='attendance-filters-bottom d-flex ' style={{display:'flex',justifyContent:'space-between'}}>

          <input
            type='text'
            placeholder='Search members'
            className='search-field'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
          <div className="div" style={{display:'flex',gap:10}}>
          <Selects
            // defaultValue='All'
            onSelect={onSelect}
            value={status}
            options={WorkingCondition}
            placeHolder='Search'
          />

               <button className='primary-btn' onClick={showModal}>
            <FontAwesomeIcon icon={faPlus} /> Add Employee
          </button>
          </div>
        </div>
        </div> */}

        <div className='row table-container'>
          <ViewAllEmployee
            defaultDate={defaultDate}
            searchText={searchText}
            status={status}
          />
        </div>
      </div>
    {/* </Layout> */}
    </>
  );
};

export default ViewEmployee;
