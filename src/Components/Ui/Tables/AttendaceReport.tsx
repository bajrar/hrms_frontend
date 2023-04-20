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

  useEffect(() => {
    dispatch(getUsers() as any);
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.attendanceSlice);
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
    setAttendanceData(user);
  }, []);

  useEffect(() => {
    const data1: DataType[] = [];
    user?.map((userData) => {
      userData?.attendanceRecords[0]?.attendanceByDate?.map(
        (attendance: any) => {
          if (
            attendance?.date === defaultDate &&
            userData.employeeName.toLowerCase().includes(searchText) &&
            (attendance?.morningStatus
              ?.toLowerCase()
              .includes(status.toLowerCase()) ||
              attendance?.eveningStatus
                ?.toLowerCase()
                .includes(status.toLowerCase()))
          ) {
            const tableData = {
              id: userData?.employeeNumber,
              key: userData?._id,
              date: attendance?.date,
              name: userData?.employeeName,
              status: attendance?.absent
                ? 'Absent'
                : attendance.holiday
                ? 'Holiday'
                : `${attendance?.morningStatus} - ${attendance?.eveningStatus}`,
              designation: userData?.designation,
              clockIn: attendance?.absent
                ? 'Absent'
                : attendance?.holiday
                ? 'Absent'
                : `${formatTime(attendance?.entryTime)}`,
              clockOut: attendance?.absent
                ? 'Absent'
                : attendance?.holiday
                ? 'Absent'
                : attendance?.exitTime === '-'
                ? attendance?.exitTime
                : `${formatTime(attendance?.exitTime)}`,
              workHours: attendance?.absent
                ? '-'
                : attendance?.holiday
                ? '-'
                : attendance?.workHour,
              view: userData?.employeeNumber,
            };
            data1.push(tableData);
          }
        }
      );
    });

    setAttendanceData(data1);
  }, [user, defaultDate, searchText, status]);

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
      // pagination={tableParams.pagination}
    />
  );
};

export default AttendaceReport;
