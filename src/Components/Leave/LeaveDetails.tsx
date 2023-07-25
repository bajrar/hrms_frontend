import React, { useState, useEffect } from 'react';
import { Button, Space, Tabs, TabsProps } from 'antd';
import BreadCrumbs from '../Ui/BreadCrumbs/BreadCrumbs';
import FlexBetween from '../Ui/FlexBetween';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

/* ASSETS */
import { CalendarOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../Ui/Modal/Modal';
import ApplyLeaveForm from './forms/ApplyLeaveForm';

const LeaveSummary = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [applyLeave, setApplyLeave] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const onStartDateChange = ({ bsDate }: any) => {
    setStartDate(bsDate);
  };
  const onEndDateChange = ({ bsDate }: any) => {
    setEndDate(bsDate);
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <FlexBetween style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <Space direction="horizontal" style={{ display: 'flex', gap: '1.9rem' }}>
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
            />
            <CalendarOutlined className="calendar-icon" />
          </div>

          <div className="navbar-dash__right-search">
            <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="14px" />
          </div>
        </Space>
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setApplyLeave(true)}
          style={{ height: '40px', width: '129px', padding: '0.5rem 1rem' }}
        >
          Apply Leave
        </Button>
      </FlexBetween>

      <ModalComponent
        openModal={!!applyLeave}
        classNames="holidays-modal"
        closeModal={() => setApplyLeave(false)}
        destroyOnClose={true}
        // maskClosable={isMaskClosable}
      >
        <ApplyLeaveForm setIsModalOpen={setApplyLeave} />
      </ModalComponent>
    </Space>
  );
};

const LeaveBalance = () => {
  return <h1>leave </h1>;
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Leave Summary`,
    children: <LeaveSummary />,
  },
  {
    key: '2',
    label: `Leave Balance`,
    children: <LeaveBalance />,
  },
];

const LeaveDetails = () => {
  return (
    <Space direction="vertical" className="leave-allocation padding" style={{ width: '100%' }}>
      <hr />
      <BreadCrumbs imagesrc="/images/leave.svg" location="Leave Management" location1="Summary & Balance" />
      <hr />
      <Tabs defaultActiveKey="1" items={items} />
    </Space>
  );
};

export default LeaveDetails;
