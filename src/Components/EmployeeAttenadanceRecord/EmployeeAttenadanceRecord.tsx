import { Button, Form, Select, Table } from 'antd';
import { useState } from 'react';
import { apis } from '../apis/constants/ApisService';
interface EmployeeData {
  _id: string;
  employeeNumberSeries: string;
  employeeNumber: number;
  employeeName: string;
  dob: string;
  gender: string;
  mobileNumber: string;
  email: string;
  confirmationDate: string;
  provisionPeriod: string;
  dateOfJoining: string;
  reportingManager: string;
  status: string;
  emergencyName: string;
  emergencyContact: string;
  parentName: string;
  spouseName: string;
  __v: number;
  attendanceRecords: {
    _id: string;
    userSn: number;
    attendanceByDate: {
      date: string;
      entryTime: string;
      exitTime: string;
      workHour: string;
      _id: string;
    }[];
    __v: number;
  }[];
}
type Props = {};

export const EmployeeAttenadanceRecord = (props: Props) => {
  const [data, setData] = useState<EmployeeData>();

  const onFinish = async (values: any) => {
    const res = await apis.getEmplpoyeeAttendanceRecord();
    const value = values.selectEmp;
    setData(res.data[value]);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Entry Time',
      dataIndex: 'entryTime',
      key: 'entryTime',
    },
    {
      title: 'Exit Time',
      dataIndex: 'exitTime',
      key: 'exitTime',
    },
    {
      title: 'Work Hour',
      dataIndex: 'workHour',
      key: 'workHour',
    },
  ];

  const attendanceData =
    data?.attendanceRecords &&
    data?.attendanceRecords[0]?.attendanceByDate.map((record) => {
      return {
        key: record._id,
        date: record.date,
        name: data.employeeName,
        entryTime: record.entryTime,
        exitTime: record.exitTime,
        workHour: record.workHour,
      };
    });

  return (
    <>
      <div className='container'>
        <h1 className='text-center mb-4 mt-4 text-muted'>
          Employee Attendance
        </h1>
        <Form onFinish={onFinish}>
          <div className='row'>
            <Form.Item
              name='selectEmp'
              className='col-8'
              label='Select Employee'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder='Select a Job Type'>
                <Select.Option value='0'>Anjan Pudasaini</Select.Option>
                <Select.Option value='1'>Binod Karki</Select.Option>
                <Select.Option value='2'>Sunil Basnet</Select.Option>
                <Select.Option value='3'>Anil Maharjan</Select.Option>
                <Select.Option value='4'>Ashish Gautam</Select.Option>
                <Select.Option value='5'>Ashutosh Shrestha</Select.Option>
                <Select.Option value='6'>Gita Shrestha</Select.Option>
                <Select.Option value='7'>Pawas Mishra</Select.Option>
                <Select.Option value='8'>Ashish Gautam</Select.Option>
                <Select.Option value='9'>Raju Shrestha</Select.Option>
                <Select.Option value='10'>Rupesh Pyatha</Select.Option>
                <Select.Option value='11'>Suraj Manandhar</Select.Option>
                <Select.Option value='12'>Ashim Bhatta</Select.Option>
                <Select.Option value='13'>Nisha Shrestha</Select.Option>
                <Select.Option value='14'>Rohit Pakhrin</Select.Option>
              </Select>
            </Form.Item>
            <Button type='primary' htmlType='submit' className='col-2'>
              Submit
            </Button>
          </div>
        </Form>

        <Table dataSource={attendanceData} columns={columns} />
      </div>
    </>
  );
};
