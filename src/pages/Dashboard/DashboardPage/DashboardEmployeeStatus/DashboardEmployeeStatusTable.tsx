import * as React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './DashboardEmployeeStatus.css';

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
  return (
    <div className='dashboard-employee-status-table'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};