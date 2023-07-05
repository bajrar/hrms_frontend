import * as React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './DashboardEmployeeStatus.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useTypedSelector';
import { getEmployee } from '../../../../redux/features/employeeSlice';
import Selects from '../../../../Components/Ui/Selects/Selects';
import { useGetEmployeeQuery } from '../../../../redux/api/employeeApiSlice';

type DashboardEmployeeStatusTableProps = {};
interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'EMPLOYEE NAME',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'START DATES',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'END DATES',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
  },
];
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '2',
    name: 'Jim Green',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '3',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '4',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '5',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '6',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '7',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '8',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '9',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
  {
    key: '10',
    name: 'Joe Black',
    startDate: 'yy/mm/dd',
    endDate: 'yy/mm/dd',
    status: 'Full-time',
  },
];
export const DashboardEmployeeStatusTable = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = React.useState('');
  const [filterData, setFilterData] = React.useState<any>([]);
  const [attendanceData, setAttendanceData] = React.useState<any>([]);
  const [status, setStatus] = React.useState('');

  const onSelect = (e: any) => {
    setStatus(e);
  };

  React.useEffect(() => {
    dispatch(getEmployee() as any);
  }, [dispatch]);
  // const { employee, loading } = useAppSelector((state) => state.employeeSlice);
  const { data: employee ,isLoading:loading} = useGetEmployeeQuery('employee');

  React.useEffect(() => {
    const data1: DataType[] = [];
    employee?.employee?.map((userData: any, sn: any) => {
      if (userData.employeeName.toLowerCase().includes(searchText)) {
        const dateObject = new Date(userData?.dateOfJoining);
        const formattedDate = dateObject?.toISOString()?.split('T')[0];
        const tableData = {
          id: userData?.employeeNumber,
          key: userData?.employeeNumber,
          startDate: userData?.dateOfJoining,
          name: userData?.employeeName,
          status: userData.status,
          designation: userData?.designation,
          dob: userData?.dob,
          view: userData,
          sn: sn + 1,
          endDate: userData?.resignDate || '-',
        };
        data1.push(tableData);
      }
    });
    setAttendanceData(data1);
  }, [employee, searchText]);

  React.useEffect(() => {
    const sortedData = [...attendanceData].sort((a, b) => a.name.localeCompare(b.name));
    const data = status ? sortedData.filter((each: any) => each.status === status) : sortedData;
    setFilterData(data);
  }, [attendanceData, status]);

  const WorkingCondition = [
    {
      label: 'All Status',
      value: '',
    },
    {
      label: 'Working',
      value: 'working',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
    {
      label: 'Resigned',
      value: 'resigned',
    },
  ];

  return (
    <>
      <div className="dashboard-employee-status-search-bar">
        <div className="row">
          <div className="col-lg-5">
            <Selects
              defaultValue="allStatus"
              onSelect={onSelect}
              value={status}
              options={WorkingCondition}
              placeHolder="Select and filter by"
            />
          </div>
          <div className="col-lg-5 dashboard-employee-input-search-button">
            <input
              type="text"
              placeholder="Search by Employee Name"
              className="search-field"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            />
          </div>
        </div>
      </div>
      <div className="dashboard-employee-status-table">
        <Table columns={columns} dataSource={filterData} loading={loading} />
      </div>
    </>
  );
};
