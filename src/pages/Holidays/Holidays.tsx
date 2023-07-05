import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import './holiday.css';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import AddHolidaysForm from '../../Components/Holidays/AddHolidaysForm';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { useTokenData } from '../../hooks/userTokenData';
import { useGetHolidayQuery } from '../../redux/api/holidays/holidayApiSlice';
import { IHoliday } from '../../interface/Holiday/Holiday';
const Holidays = () => {
  const [startDate, setStartDate] = useState<any>('');
  const [endDate, setEndDate] = useState<any>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidaysArray, setHolidayArray] = useState<any[]>([]);
  const { isAdmin, isAdminTemp } = useTokenData();

  const onStartDateChange = ({ bsDate }: any) => {
    setStartDate(bsDate);
  };
  const onEndDateChange = ({ bsDate }: any) => {
    setEndDate(bsDate);
  };

  const columns: ColumnsType<IHoliday> = [
    {
      title: 'HOLIDAY NAME',
      dataIndex: 'holidayName',
      key: 'holidayName',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'APPLICABLE TO',
      dataIndex: 'applicableTo',
      key: 'applicableTo',
    },
    {
      title: 'NOTES',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const { data: holidays, isLoading } = useGetHolidayQuery({
    startDate: startDate === endDate ? '' : startDate,
    endData: endDate === startDate ? '' : endDate,
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const holidayData: IHoliday[] = [];
    holidays?.map((holiData: any) => {
      const tableData = {
        holidayName: holiData?.holidayName,
        date: `${holiData?.startDate}  - ${holiData?.endDate}`,
        applicableTo: holiData?.applicableTo,
        notes: holiData?.note,
        status: holiData?.status,
      };
      holidayData.push(tableData);
    }, []);
    setHolidayArray(holidayData);
  }, [holidays]);

  const disableDate = startDate?.split('/').join('-');

  return (
    <Layout>
      <Navbar />
      <div className="holiday-page padding">
        <hr />
        <BreadCrumbs imagesrc="/images/leave.svg" location="Leave Management" location1="Holidays" />
        <hr />

        <div className="d-flex attendance-filters-container justify-content-between">
          <div className="d-flex gap-4">
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
          {isAdminTemp && (
            <button className="primary-btn" onClick={showModal}>
              <FontAwesomeIcon icon={faPlus} /> Add Holidays
            </button>
          )}
        </div>
        <Table columns={columns} className="holidays-table" dataSource={holidaysArray} loading={isLoading} />
        <ModalComponent openModal={isModalOpen} classNames="holidays-modal" closeModal={setIsModalOpen}>
          <h3 className="modal-title">ADD HOLIDAYS</h3>
          <AddHolidaysForm setIsModalOpen={setIsModalOpen} />
        </ModalComponent>
      </div>
    </Layout>
  );
};

export default Holidays;
