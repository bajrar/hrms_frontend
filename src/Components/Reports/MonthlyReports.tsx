import { useEffect, useState } from 'react';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import Selects from '../Ui/Selects/Selects';
import DownloadBtn from '../Ui/DownloadBtn/DownloadBtn';
import { useDispatch } from 'react-redux';
import { getMonthlyLeave } from '../../redux/features/monthlySlice';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { CalendarOutlined } from '@ant-design/icons';
import { useGetMonthlyReportQuery } from '../../redux/api/report/reportApiSlice';

export interface DataType {
  id?: string;
  name?: string;
  payroll: string;
  weekend: string;
  holiday: React.ReactNode;
  duty: string;
  present: string;
  absent: string;
}

const MonthlyReports = () => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [searchText, setSearchText] = useState('');
  const [monthlyReportData, setMonthlyReportData] = useState<any>([]);

  const dispatch = useDispatch();

  const onStartDateChange = ({ bsDate }: any) => {
    setStartDate(bsDate);
  };
  const onEndDateChange = ({ bsDate }: any) => {
    setEndDate(bsDate);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'PAYROLL',
      dataIndex: 'payroll',
      key: 'payroll',
    },
    {
      title: 'WEEKEND',
      dataIndex: 'weekend',
      key: 'weekend',
    },
    {
      title: 'HOLIDAY',
      dataIndex: 'holiday',
      key: 'holiday',
    },
    {
      title: 'DUTY',
      dataIndex: 'duty',
      key: 'duty',
    },
    {
      title: 'PRESENT',
      dataIndex: 'present',
      key: 'present',
    },
    {
      title: 'ABSENT',
      dataIndex: 'absent',
      key: 'absent',
    },
    {
      title: 'LEAVE',
      dataIndex: 'leave',
      key: 'leave',
      children: [
        {
          title: 'ANNUAL',
          dataIndex: 'annual',
          key: 'annual',
        },
        {
          title: 'SICK',
          dataIndex: 'sick',
          key: 'sick',
        },
        {
          title: 'SUBSTITUTE',
          dataIndex: 'substitute',
          key: 'substitute',
        },
        {
          title: 'WITHOUT PAY',
          dataIndex: 'withoutPay',
          key: 'withoutPay',
        },
      ],
    },
    {
      title: 'OT',
      dataIndex: 'ot',
      key: 'ot',
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'REMARKS',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];

  // useEffect(() => {
  //   dispatch(getMonthlyLeave({ startDate: startDate, endDate: endDate }) as any);
  // }, [dispatch, startDate, endDate]);

  // const { reports, loading } = useAppSelector((state) => state.monthlyReport);
  const { data: reports, isLoading: loading } = useGetMonthlyReportQuery({
    startDate,
    endDate,
  });
  useEffect(() => {
    const data: DataType[] = [];
    reports?.monthlyReport?.map((monthReport: any) => {
      if (monthReport.employeeName.toLowerCase().includes(searchText)) {
        const tableData = {
          id: monthReport?.userSn,
          name: monthReport?.employeeName,
          payroll: monthReport?.payroll,
          weekend: monthReport?.weekends,
          holiday: monthReport?.holiday,
          duty: monthReport?.duty,
          present: monthReport?.present,
          absent: monthReport?.absent,
          total: monthReport?.totaldays,
          annual: monthReport?.annualLeaveTaken,
          sick: monthReport?.sickLeaveTaken,
          withoutPay: monthReport?.unpaidLeaveTaken,
          substitute: 0,
        };
        data.push(tableData);
      }
    });
    setMonthlyReportData(data);
  }, [reports, startDate, endDate, searchText]);

  const disableDate = startDate?.split('/').join('-');

  return (
    <div>
      <div className="attendance-filters">
        <div className="calendar-wrapper">
          <Calendar
            onChange={onStartDateChange}
            className="date-picker calender-container-picker"
            dateFormat="YYYY/MM/DD"
            language="en"
          />
          <CalendarOutlined className="calendar-icon" />
        </div>
        <div className="calendar-wrapper">
          <Calendar
            onChange={onEndDateChange}
            className="date-picker calender-container-picker"
            dateFormat="YYYY/MM/DD"
            language="en"
            minDate={disableDate}
          />
          <CalendarOutlined className="calendar-icon" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center daily-report-search">
        <input
          type="text"
          placeholder="Search members"
          className="search-field"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
        <div className="d-flex daily-report-saerch-right">
          <Selects placeHolder="Search project name" />
          <DownloadBtn report={monthlyReportData} />
        </div>
      </div>
      <div className="daily-report-table-container">
        <Table columns={columns} dataSource={monthlyReportData} loading={loading} />
      </div>
    </div>
  );
};

export default MonthlyReports;
