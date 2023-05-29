import { Table } from 'antd';
import { useState } from 'react';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import type { ColumnsType } from 'antd/es/table';

import Selects from '../Ui/Selects/Selects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './addLeaveForm.css';
import ModalComponent from '../Ui/Modal/Modal';
import ApplyLeaveForm from './ApplyLeaveForm';

export interface DataType {
  eid?: string;
  employeeName?: string;
  leaveType: string;
  date: string;
  reasonForLeave: string;
  approvedBy: string;
}

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onStartDateChange = ({ bsDate }: any) => {
    setStartDate(bsDate);
  };
  const onEndDateChange = ({ bsDate }: any) => {
    setEndDate(bsDate);
  };
 
  const columns: ColumnsType<DataType> = [
    {
      title: 'EID',
      dataIndex: 'eid',
      key: 'eid',
    },
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'LEAVE TYPE',
      dataIndex: 'leaveType',
      key: 'leaveType',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'REASON FOR LEAVE',
      dataIndex: 'reasonForLeave',
      key: 'reasonForLeave',
    },
    {
      title: 'APPROVED BY',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='assign-leave'>
      <div className='d-flex justify-content-between align-items-center daily-report-search'>
        <div className='attendance-filters'>
          <Calendar
            onChange={onStartDateChange}
            className='date-picker calender-container-picker leave-inputs '
            dateFormat='YYYY/MM/DD'
            language='en'
          />{' '}
          To
          <Calendar
            onChange={onEndDateChange}
            className='date-picker calender-container-picker leave-inputs'
            dateFormat='YYYY/MM/DD'
            language='en'
          />
        </div>
        <div className='d-flex daily-report-saerch-right'>
          <Selects placeHolder='Search leave name' className='leave-inputs' />
          <button className='primary-btn' onClick={showModal}>
            <FontAwesomeIcon icon={faPlus} /> Apply Leave
          </button>
        </div>
      </div>
      <div className='daily-report-table-container'>
        <Table columns={columns} />
      </div>
      <ModalComponent
        openModal={isModalOpen}
        classNames='assign-leave-modal'
        closeModal={setIsModalOpen}
      >
        <h3 className='modal-title'>APPLY LEAVE</h3>
        <ApplyLeaveForm setIsModalOpen={setIsModalOpen} />
      </ModalComponent>
    </div>
  );
};

export default ApplyLeave;
