import { DatePickerProps } from 'antd';
import moment from 'moment';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';

import './reports.css';
import DailyReports from '../../Components/Reports/DailyReports';
import MonthlyReports from '../../Components/Reports/MonthlyReports';

const Reports = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Daily Reports`,
      children: <DailyReports />,
    },
    {
      key: '2',
      label: `Monthly Reports`,
      children: <MonthlyReports />,
    },
  ];

  return (
    <div className='attendace-page'>
      <BreadCrumbs
        imagesrc='/images/attendance.svg'
        location='Attendance / Shift Management'
        location1='Report'
      />
      <hr />

      <div className='row report-table-container'>
        {/* <AttendaceReport /> */}
        <Tabs defaultActiveKey='1' items={items} />
      </div>
    </div>
  );
};

export default Reports;
