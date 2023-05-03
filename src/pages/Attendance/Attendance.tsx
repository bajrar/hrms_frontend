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

const Attendance = () => {
  const [defaultDate, setDefaultDate] = useState();
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useAppDispatch();

  const onSelect = (e: any) => {
    setStatus(e);
  };

  const onDateChange = ({ bsDate }: any) => {
    setDefaultDate(bsDate);
  };

  useEffect(() => {
    dispatch(getAttedanceStatus() as any);
  }, [dispatch]);

  const { attendanceStatus } = useAppSelector(
    (state) => state.attendanceStatusSlice
  );

  const AttendanceStatusArray = [
    {
      backgroundColor: 'rgba(0, 185, 241, 0.05)',
      color: '#023C87',
      status: 'Total Employee',
      numberOfEmployee: attendanceStatus.totalEmployee,
    },
    {
      backgroundColor: 'rgba(0, 185, 241, 0.05)',
      color: '#00B9F1',
      status: 'Present',
      numberOfEmployee: attendanceStatus.presentUser,
    },
    {
      backgroundColor: 'rgba(187, 33, 36, 0.05)',
      color: '#BB2124',
      status: 'Absent',
      numberOfEmployee: attendanceStatus.absentUser,
    },
    {
      backgroundColor: 'rgba(187, 33, 36, 0.05)',
      color: '#BB2124',
      status: 'On Leave',
      numberOfEmployee: attendanceStatus?.absentUser,
    },
    // {
    //   backgroundColor: '#F2F5F9',
    //   color: ' #023C87',
    //   status: 'Office Presence',
    //   numberOfEmployee: '4',
    // },
    {
      backgroundColor: 'rgba(34, 187, 51, 0.05)',
      color: '#22BB33',
      status: 'Working From Home',
      numberOfEmployee: '4',
    },
    {
      backgroundColor: 'rgba(34, 187, 51, 0.05)',
      color: '#22BB33',
      status: 'Timely In',
      numberOfEmployee: attendanceStatus?.timleyIn,
    },
    {
      backgroundColor: 'rgba(34, 187, 51, 0.05)',
      color: '#22BB33',
      status: 'Timely Out',
      numberOfEmployee: attendanceStatus?.timleyOut,
    },
    // {
    //   backgroundColor: 'rgba(34, 187, 51, 0.05)',
    //   color: '#F0AD4E',
    //   status: 'Early In',
    //   numberOfEmployee: attendanceStatus.,
    // },
    {
      backgroundColor: 'rgba(187, 33, 36, 0.05)',
      color: '#BB2124',
      status: 'Late In',
      numberOfEmployee: attendanceStatus?.lateIn,
    },
    {
      backgroundColor: 'rgba(240, 173, 78, 0.05)',
      color: '#F0AD4E',
      status: 'Early Out',
      numberOfEmployee: attendanceStatus?.earlyOut,
    },

    {
      backgroundColor: 'rgba(187, 33, 36, 0.05)',
      color: '#BB2124',
      status: 'Late out',
      numberOfEmployee: attendanceStatus?.lateOut,
    },
  ];

  return (
    <Layout>
      <Navbar />
      <div className='attendace-page'>
        <BreadCrumbs
          imagesrc='/images/attendance.svg'
          location='Attendance / Shift Management'
          location1='Attendance'
        />
        <hr />
        <div className='d-flex employee-stats-container flex-wrap  '>
          {AttendanceStatusArray.map((item: IEmployeeStats, key) => {
            return (
              <EmployeeStats
                key={key}
                backgroundColor={item.backgroundColor}
                color={item.color}
                status={item.status}
                numberOfEmployee={item.numberOfEmployee}
              />
            );
          })}
        </div>
        <hr />
        <div className='attendance-filters working-condition p-0'>
          <Calendar
            onChange={onDateChange}
            className='calender-container-picker '
            language='en'
            dateFormat='YYYY/MM/DD'
          />
        </div>
        <div className='attendance-filters-bottom d-flex'>
          <Selects
            // defaultValue='All'
            onSelect={onSelect}
            value={status}
            options={WorkingCondition}
            placeHolder='Search'
          />

          <input
            type='text'
            placeholder='Search members'
            className='search-field'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
        </div>

        <div className='row table-container'>
          <AttendaceReport
            defaultDate={defaultDate}
            searchText={searchText}
            status={status}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
