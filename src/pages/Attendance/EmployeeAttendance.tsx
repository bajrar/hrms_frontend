import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import SingleEmployee, {
  formatTime,
} from '../../Components/Ui/Tables/SingleEmployee';
import { IEmployeeStats, EmployeeStats } from './Attendance';

import { useAppSelector } from '../../hooks/useTypedSelector';
import { getEmployeeData } from '../../redux/features/SingleAttendanceSlice';

import CustomCalendar from '../../Components/Customcalendar/CustomCalendar';
import { monthNames, startDay } from '../../utils/Constants';
import { todayInBs } from '../../Components/Customcalendar/GetTodaysDate';
import DownloadBtn from '../../Components/Ui/DownloadBtn/DownloadBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const AttendanceReport = [
  {
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    color: '#9747FF',
    status: 'Total Working days',
    numberOfEmployee: '35',
  },
  {
    backgroundColor: '#F2F5F9',
    color: '#023C87',
    status: 'Total Working hours',
    numberOfEmployee: '4',
  },
  {
    backgroundColor: 'rgba(0, 185, 241, 0.05)',
    color: '#00B9F1',
    status: 'Present Days',
    numberOfEmployee: '4',
  },
  {
    backgroundColor: 'rgba(34, 187, 51, 0.05)',
    color: '#22BB33',
    status: 'Holidays',
    numberOfEmployee: '4',
  },
  {
    backgroundColor: 'rgba(240, 173, 78, 0.1)',
    color: '#F0AD4E',
    status: 'Weekend',
    numberOfEmployee: '2',
  },
  {
    backgroundColor: 'rgba(187, 33, 36, 0.05',
    color: ' #BB2124',
    status: 'Absent',
    numberOfEmployee: '4',
  },
];

export interface DataType {
  SN: string;
  Id: string;
  Date: string;
  Name: string;
  Status: React.ReactNode;
  Designation: string;
  ClockIn: string;
  ClockOut: string;
  WorkHours: string;
}

export interface IYear {
  year: any;
  startDay: any;
}

const EmployeeAttendance = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [changeTab, setChangeTab] = useState<boolean>(true);
  const [attendanceReport, setAttendanceReport] = useState<any>([]);
  const [year, setYear] = useState<IYear>({
    year: todayInBs.getYear(),
    startDay: 4,
  });
  const [month, setMonth] = useState<any>(todayInBs.getMonth());
  const [openYearList, setOpenYearList] = useState<boolean>(false);
  const [openMonthList, setOpenMonthList] = useState<boolean>(false);
  const [openSlide, setopenSlide] = useState<boolean>(true);

  const catMenu = useRef(null);

  const onStartDateChange = ({ bsDate }: any) => {
    setStartDate(bsDate);
  };
  const onEndDateChange = ({ bsDate }: any) => {
    setEndDate(bsDate);
  };
  const dispatch = useDispatch();
  let { employeeId } = useParams();

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        getEmployeeData({
          userSn: employeeId,
          startDate: startDate,
          endDate: endDate,
        }) as any
      );
    }
  }, [dispatch, startDate, endDate, employeeId]);

  const { employee } = useAppSelector(
    (state: any) => state.SingleAttendanceSlice
  );

  useEffect(() => {
    const data1: DataType[] = [];

    employee?.result?.map((userData: any, key: number) => {
      const tableData = {
        SN: `${key + 1}`,
        Id: userData?.employeeNumber,
        Date: userData?.attendanceByDate?.date,
        Name: userData?.employeeName,
        Status: `${userData?.attendanceByDate?.morningStatus} - ${userData?.attendanceByDate?.eveningStatus}`,
        Designation: userData?.designation,
        ClockIn: userData?.attendanceByDate?.absent
          ? 'Absent'
          : userData?.attendanceByDate?.holiday
          ? 'Holiday'
          : `${formatTime(userData?.attendanceByDate?.entryTime)}`,
        ClockOut: userData?.attendanceByDate?.absent
          ? 'Absent'
          : userData?.attendanceByDate?.holiday
          ? 'Holiday'
          : userData?.attendanceByDate?.exitTime === '-'
          ? userData?.attendanceByDate?.exitTime
          : `${formatTime(userData?.attendanceByDate?.exitTime)}`,
        WorkHours: userData?.attendanceByDate?.absent
          ? '-'
          : userData?.attendanceByDate?.holiday
          ? '-'
          : userData?.attendanceByDate?.workHour,
      };

      data1.push(tableData);
    });

    setAttendanceReport(data1);
  }, [employee]);
  //   const closeOpenMenus = (e:any)=>{
  //     if(catMenu.current && openSlide && !catMenu.current.contains(e.target)){
  //       setopenSlide(false)
  //     }
  // }
  console.log(employee, 'emm');

  return (
    <div className='attendace-page'>
      <BreadCrumbs
        imagesrc='/images/attendance.svg'
        location='Attendance / Shift Management'
        location1='Attendance'
        location2={`${employee.employeeName}`}
      />
      <hr />
      <div className='d-flex employee-stats-container flex-wrap  '>
        {AttendanceReport.map((item: IEmployeeStats) => {
          return (
            <EmployeeStats
              backgroundColor={item.backgroundColor}
              color={item.color}
              status={item.status}
              numberOfEmployee={item.numberOfEmployee}
            />
          );
        })}
      </div>
      <hr />
      {/* <Select
        showSearch
        defaultValue='currentMonth'
        optionFilterProp='children'
        // onChange={onSelect}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        className='selects working-condition'
        options={months}
        suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
      /> */}
      <div className='d-flex attendance-filters-container justify-content-between'>
        {changeTab ? (
          <div className='attendance-filters'>
            <Calendar
              onChange={onStartDateChange}
              className=' date-picker calender-container-picker '
              dateFormat='YYYY/MM/DD'
              language='en'
            />{' '}
            To
            <Calendar
              onChange={onEndDateChange}
              className=' date-picker calender-container-picker'
              dateFormat='YYYY/MM/DD'
              language='en'
            />
          </div>
        ) : (
          <div className='d-flex button-container'>
            <div className='year-list-container'>
              <button
                onClick={() => setOpenYearList(!openYearList)}
                className='date-selector'
              >
                Year{' '}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ color: '#000000' }}
                />
              </button>
              <ul
                className={
                  openYearList ? `year-list year-list-active` : `year-list`
                }
              >
                {Object.keys(startDay).map((year, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        setYear({
                          year: Number(year),
                          startDay: Number(Object.values(startDay)[i]),
                        });
                        setOpenYearList(!openYearList);
                      }}
                      className='date-selector-list'
                    >
                      <>{year}</>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='month-list-container'>
              <button
                onClick={() => setOpenMonthList(!openMonthList)}
                className='date-selector'
              >
                Month{' '}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ color: '#000000' }}
                />
              </button>
              <ul
                className={
                  openMonthList ? `month-list month-list-active` : `month-list`
                }
              >
                {monthNames.map((month, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        setMonth(i);
                        setOpenMonthList(!openMonthList);
                      }}
                      className='date-selector-list'
                    >
                      {month}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        <div className='d-flex attendance-filters-right'>
          {changeTab ? (
            <DownloadBtn report={attendanceReport} />
          ) : (
            <div className='total-working-hours'>
              Total Working hours{' '}
              <span>
                ( {employee.TotalWorkingHours}
                {employee.TotalWorkingHours ? 'hours' : ''} )
              </span>
            </div>
          )}
          <div className='d-flex switches'>
            <div
              className={
                changeTab ? 'switch-container ' : 'switch-container border'
              }
              onClick={(prev) => setChangeTab(!prev)}
            >
              <img
                src={
                  changeTab
                    ? '/images/calendar-inactive.svg'
                    : '/images/calendar-active.svg'
                }
                alt=''
              />
            </div>
            <div
              className={
                changeTab ? 'switch-container border' : 'switch-container'
              }
              onClick={(prev) => {
                setChangeTab(true);
              }}
            >
              <img
                src={
                  changeTab
                    ? '/images/list-active.png'
                    : '/images/list-inactive.svg'
                }
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      {changeTab ? (
        <SingleEmployee startDate={startDate} endDate={endDate} />
      ) : (
        <>
          <CustomCalendar month={month} year={year} />
        </>
      )}
    </div>
  );
};

export default EmployeeAttendance;
