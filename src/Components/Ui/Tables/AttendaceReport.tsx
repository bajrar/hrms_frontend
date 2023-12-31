import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ConfigProvider, Empty, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import './attendanceReport.css';
import { formatTime } from './SingleEmployee';
import { EmployeeStats } from '../../../pages/Attendance/Attendance';
import { useEmployeeRecordWithAttendanceQuery } from '../../../redux/features/attendanceUpdateSlice';
import { useTokenData } from '../../../hooks/userTokenData';

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
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const { isAdminTemp, userSn } = useTokenData();
  const { data: user, isLoading: loading } = useEmployeeRecordWithAttendanceQuery({ status, date: defaultDate });
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
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
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
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
            }}
          >
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
                      : ite === 'Working From Home'
                      ? '#9747FF'
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
          <div className="workhours">
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
          <div className="workhours">
            <Link className="viewMoreBtn" to={`/attendance/${item}`}>
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
    if (!isAdminTemp) {
      attendanceUser = user?.filter((each: any) => each.employeeNumber === userSn);
    }
    attendanceUser?.map((userData: any, sn: number) => {
      userData?.attendanceRecords?.map((attendance: any) => {
        if (userData.employeeName.toLowerCase().includes(searchText)) {
          const tableData = {
            sn: sn + 1,
            id: userData?.employeeNumber,
            key: userData?.employeeNumber,
            date: attendance?.attendanceByDate?.date,
            name: userData?.employeeName,

            status:
              attendance?.attendanceByDate?.status === 'WFH'
                ? 'Working From Home'
                : attendance?.attendanceByDate?.holiday
                ? 'Holiday'
                : attendance.attendanceByDate?.absent
                ? 'Absent'
                : `${attendance?.attendanceByDate?.morningStatus} - ${attendance?.attendanceByDate?.eveningStatus}`,

            designation: userData?.designation,
            clockIn: attendance?.attendanceByDate?.absent
              ? 'Absent'
              : attendance?.attendanceByDate?.holiday
              ? 'Holiday'
              : `${formatTime(attendance?.attendanceByDate?.entryTime)}`,
            clockOut: attendance?.attendanceByDate?.absent
              ? 'Absent'
              : attendance?.attendanceByDate?.holiday
              ? 'Absent'
              : attendance?.attendanceByDate?.exitTime === '-'
              ? attendance?.attendanceByDate?.exitTime
              : `${formatTime(attendance?.attendanceByDate?.exitTime)}`,
            workHours: attendance?.attendanceByDate?.absent
              ? '0.00'
              : attendance?.attendanceByDate?.holiday
              ? '0.00'
              : attendance?.attendanceByDate?.workHour,
            view: userData?.employeeNumber,
          };
          data1.push(tableData);

          // setAttendanceData([...attendanceData, tableData]);
        }
      });
    });

    setAttendanceData(data1);
  }, [user, searchText, isAdminTemp, userSn]);

  return (
    <ConfigProvider
      renderEmpty={() => <Empty image="/images/NoData.png" imageStyle={{ height: '300px' }} description="" />}
    >
      <Table
        rowClassName={(record) =>
          record.clockIn === 'Absent' ? 'absent-class' : record.clockIn === 'Holiday' ? 'holiday-class' : ''
        }
        columns={columns}
        dataSource={attendanceData}
        loading={loading}

        // pagination={tableParams.pagination}
      />
    </ConfigProvider>
  );
};

export default AttendaceReport;
