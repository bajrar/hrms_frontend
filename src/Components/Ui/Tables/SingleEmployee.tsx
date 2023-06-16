import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { EmployeeStats } from '../../../pages/Attendance/Attendance';
import { CompareFunction } from './AttendaceReport';

interface DataType {
  id?: string;
  key: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
}
export const formatTime = (time: any) => {
  const t = time ?? '';
  const q = t.split(':');
  return q.length >= 2 ? `${q[0]}:${q[1]}` : '';
  // const t = time;
  // const q = t?.split(':');
  // return `${q[0]}:${q[1]}`;
};
const SingleEmployee = ({
  startDate,
  endDate,
}: {
  startDate: any;
  endDate: any;
}) => {
  const [attendanceData, setAttendanceData] = useState<any>([]);

  let { employeeId } = useParams();

  const { employee } = useAppSelector(
    (state: any) => state.SingleAttendanceSlice
  );
  const columns: ColumnsType<DataType> = [
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
                      : ite === 'Working From Home'
                      ? '#9747FF'
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
      title: 'CLOCK IN',
      dataIndex: 'clockIn',
      key: 'clockIn',
    },
    {
      title: 'CLOCK  OUT',
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
              {item} {item === '' ? '' : 'Hours'}{' '}
            </p>
          </div>
        );
      },
    },
    {
      title: 'REMARKS',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];

  useEffect(() => {
    setAttendanceData(employee);
  }, [employeeId]);
  useEffect(() => {
    const data1: DataType[] = [];
    employee?.result?.map((userData: any) => {
      const tableData = {
        key: userData?._id,
        date: userData?.attendanceByDate?.date,
        name: userData?.employeeName,
        status:
          userData?.attendanceByDate?.status === 'WFH'
            ? 'Working From Home'
            : userData?.attendanceByDate?.holiday ||
              userData?.attendanceByDate?.absent
            ? 'Absent'
            : `${userData?.attendanceByDate?.morningStatus} - ${userData?.attendanceByDate?.eveningStatus}`,
        designation: userData?.designation,
        clockIn: userData?.attendanceByDate?.absent
          ? '-'
          : userData?.attendanceByDate?.holiday
          ? '-'
          : `${formatTime(userData?.attendanceByDate?.entryTime)}`,
        clockOut: userData?.attendanceByDate?.absent
          ? '-'
          : userData?.attendanceByDate?.holiday
          ? '-'
          : userData?.attendanceByDate?.exitTime === '-'
          ? userData?.attendanceByDate?.exitTime
          : `${formatTime(userData?.attendanceByDate?.exitTime)}`,
        workHours: userData?.attendanceByDate?.absent
          ? ''
          : userData?.attendanceByDate?.holiday
          ? ''
          : userData?.attendanceByDate?.workHour,
      };

      data1.push(tableData);
    });

    setAttendanceData(data1);
  }, [employee]);

  return (
    <div className='single-employee'>
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
    </div>
  );
};

export default SingleEmployee;
