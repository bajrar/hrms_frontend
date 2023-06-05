import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import './attendanceReport.css';
import { getUsers } from '../../../redux/features/attendanceSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/useTypedSelector';
import { formatTime } from './SingleEmployee';
import { EmployeeStats } from '../../../pages/Attendance/Attendance';
import { RootState } from '../../../store';

export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
}

export const CompareFunction = (compareList: any) => {
  const compareItem = compareList.toLowerCase().trim().split(' ').join('');
  return compareItem;
};

const AttendaceReport = ({ defaultDate, searchText, status }: any) => {
  const dispatch = useAppDispatch();
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const email = userData?.email;
  const token = localStorage.getItem('token');
  useEffect(() => {
    dispatch(getUsers({ status: status, date: defaultDate }) as any);
  }, [dispatch, status, defaultDate]);

  const { user, loading } = useAppSelector((state) => state.attendanceSlice);

  const columns: ColumnsType<DataType> = [
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.split('-').map((ite: any, i: number) => {
              return (
                <EmployeeStats
                  key={i}
                  status={ite}
                  color={
                    CompareFunction(ite) === 'timelyin'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'timelyout'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'earlyin'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'earlyout'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'lateout'
                      ? '#BB2124'
                      : CompareFunction(ite) === 'latein'
                      ? '#BB2124'
                      : CompareFunction(ite) === 'absent'
                      ? '#BB2124'
                      : 'transparent '
                  }
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DESIGNATION',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'CLOCK IN ',
      dataIndex: 'clockIn',
      key: 'clockIn',
    },
    {
      title: 'CLOCK OUT',
      dataIndex: 'clockOut',
      key: 'clockOut',
    },
    {
      title: 'WORK HOURS',
      dataIndex: 'workHours',
      key: 'workHours',
      render: (item) => {
        return (
          <div className='workhours'>
            <p>
              {item} {item === '-' ? '' : 'Hours'}{' '}
            </p>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render: (item) => {
        return (
          <div className='workhours'>
            <Link className='viewMoreBtn' to={`/attendance/${item}`}>
              View
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const data1: DataType[] = [];
    let attendanceUser = user;
    if (email !== 'admin@virtuosway.com.np') {
      attendanceUser = user?.filter((each) => each.email === email);
    }
    attendanceUser?.map((userData) => {
      userData?.attendanceRecords?.map((attendance: any) => {
        if (userData.employeeName.toLowerCase().includes(searchText)) {
          const tableData = {
            id: userData?.employeeNumber,
            key: userData?.employeeNumber,
            date: attendance?.attendanceByDate?.date,
            name: userData?.employeeName,
            status: attendance?.attendanceByDate?.absent
              ? 'Absent'
              : attendance.holiday
              ? 'Holiday'
              : `${attendance?.attendanceByDate?.morningStatus} - ${attendance?.attendanceByDate?.eveningStatus}`,
            designation: userData?.designation,
            clockIn: attendance?.attendanceByDate?.absent
              ? 'Absent'
              : attendance?.attendanceByDate?.holiday
              ? 'Absent'
              : `${formatTime(attendance?.attendanceByDate?.entryTime)}`,
            clockOut: attendance?.attendanceByDate?.absent
              ? 'Absent'
              : attendance?.attendanceByDate?.holiday
              ? 'Absent'
              : attendance?.attendanceByDate?.exitTime === '-'
              ? attendance?.attendanceByDate?.exitTime
              : `${formatTime(attendance?.attendanceByDate?.exitTime)}`,
            workHours: attendance?.attendanceByDate?.absent
              ? '-'
              : attendance?.attendanceByDate?.holiday
              ? '-'
              : attendance?.attendanceByDate?.workHour,
            view: userData?.employeeNumber,
          };
          data1.push(tableData);

          // setAttendanceData([...attendanceData, tableData]);
        }
      });
    });

    setAttendanceData(data1);
  }, [user, searchText]);

  return (
    <Table
      rowClassName={(record) =>
        record.clockIn === 'Absent'
          ? 'absent-class'
          : record.clockIn === 'Holiday'
          ? 'holiday-class'
          : ''
      }
      columns={columns}
      dataSource={attendanceData}
      loading={loading}

      // pagination={tableParams.pagination}
    />
  );
};

export default AttendaceReport;
