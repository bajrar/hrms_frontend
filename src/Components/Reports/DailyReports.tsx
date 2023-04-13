import { useState } from 'react';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import Selects from '../Ui/Selects/Selects';
import DownloadBtn from '../Ui/DownloadBtn/DownloadBtn';
import './dailyReport.css';

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

const DailyReports = () => {
  const [searchText, setSearchText] = useState('');

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
      title: 'PROJECT TEAM',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'ARRIVAL TIME',
      dataIndex: 'clockIn',
      key: 'clockIn',
    },
    {
      title: 'DEPARTURE TIME',
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
  ];

  return (
    <div>
      <div className='attendance-filters working-condition p-0'>
        <Calendar
          // onChange={onDateChange}
          className='calender-container-picker '
          language='en'
          dateFormat='YYYY/MM/DD'
        />
      </div>

      <div className='d-flex justify-content-between align-items-center daily-report-search'>
        <input
          type='text'
          placeholder='Search members'
          className='search-field'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
        <div className='d-flex daily-report-saerch-right'>
          <Selects placeHolder='Search project name' />
          <DownloadBtn report={[]} />
        </div>
      </div>
      <div className='daily-report-table-container'>
        <Table
          rowClassName={(record) =>
            record.clockIn === 'Absent'
              ? 'absent-class'
              : record.clockIn === 'Holiday'
              ? 'holiday-class'
              : ''
          }
          columns={columns}
        />
      </div>
    </div>
  );
};

export default DailyReports;
