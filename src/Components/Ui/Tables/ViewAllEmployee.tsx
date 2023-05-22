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
import { apis, axiosApiInstance } from '../../apis/constants/ApisService';
import { getEmployee } from '../../../redux/features/employeeSlice';


export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
  // clockIn: string;
  // clockOut: string;
  // workHours: string;
}

export const CompareFunction = (compareList: any) => {
  const compareItem = compareList.toLowerCase().trim().split(' ').join('');
  return compareItem;
};

const ViewAllEmployee = ({ defaultDate, searchText, status }: any) => {
  const dispatch = useAppDispatch();
  const [attendanceData, setAttendanceData] = useState<any>([]);

  useEffect(() => {
    // dispatch(getUsers({ status: status, date: defaultDate }) as any);
    dispatch(getEmployee() as any);
  }, [dispatch]);

  const {employee} = useAppSelector((state) => state.employeeSlice);
  console.log({employee})
  const columns: ColumnsType<DataType> = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DATE OF JOINING',
      dataIndex: 'date',
      key: 'date',
    },

  
    {
      title: 'DESIGNATION',
      dataIndex: 'designation',
      key: 'designation',
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
                    CompareFunction(ite) === 'working'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'pending'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'resigned'
                      ? '#BB2124'
                      : 'transparent'
                  }
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'ACTION',
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
    employee?.employee?.map((userData:any,sn:any) => {
      if (userData.employeeName.toLowerCase().includes(searchText)) {
        const dateObject = new Date(userData.dateOfJoining);
      const formattedDate = dateObject.toISOString().split('T')[0];
        const tableData = {
          id: userData?.employeeNumber,
          key: userData?.employeeNumber,
          date: formattedDate,
          name: userData?.employeeName,
          status: userData.status,
          designation: userData?.designation,
          view: userData?.employeeNumber,
          sn:sn+1
        };
        data1.push(tableData);
      }

    });

    setAttendanceData(data1);
  }, [employee, searchText]);

  return (
    <Table
      // rowClassName={(record) =>
      //   record.clockIn === 'Absent'
      //     ? 'absent-class'
      //     : record.clockIn === 'Holiday'
      //     ? 'holiday-class'
      //     : ''
      // }
      columns={columns}
      dataSource={attendanceData}
      // pagination={tableParams.pagination}
    />
  );
};

export default ViewAllEmployee;
