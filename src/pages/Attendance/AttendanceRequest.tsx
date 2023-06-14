import { Button, Form, Input, Select, message } from 'antd';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { useDispatch } from 'react-redux';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { getHolidays } from '../../redux/features/holidaysSlice';
import { IForm } from '../../Components/Shifts/AddShiftForm';
import { apis } from '../../Components/apis/constants/ApisService';
import { TimePicker } from 'antd';
import { useRequestAttendanceMutation } from '../../redux/features/attendanceUpdateSlice';
import { useEffect, useState } from 'react';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';
import 'moment-timezone';
import NepaliDate from 'nepali-date-converter';
const AttendanceRequest = ({ setIsModalOpen }: any) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [requestAttendance, response] = useRequestAttendanceMutation();
  const [startTime, setStartTime] = useState<any>();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onStartChange = ({ bsDate }: any) => {
    form.setFieldValue('startDate', bsDate);
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldValue('notes', e.target.value);
  };
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, [dispatch]);

  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;

  const onStartTimeChange = (value: any) => {
    setStartTime(value);
  };
  const onFinish = async (values: any) => {
    console.log(startTime?.['$d']);
    const time = moment(startTime?.['$d']);
    const formattedTime = time.format('h:mm A');
    console.log(formattedTime);
    try {
      const data = {
        userSn: 201,
        date: values.startDate,
        checkIn: formattedTime,
        checkOut: '06:00 PM',
      };
      requestAttendance(data);
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setIsModalOpen(false);
    }
  };
  const onChangeTime = (time: Moment, timeString: string) => {
    console.log(time, timeString);
  };
  const currentDate = new NepaliDate();

  // Subtract one day from the current date
  currentDate.setDate(currentDate.getDate() + 1);

  // Format the previous day's date as 'YYYY-MM-DD'
  const tommorowDate = currentDate.format('YYYY-MM-DD');

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="shift-assign-form"
        form={form}
      >
        <div className="form-second-row align-items-start">
          <Form.Item
            className="form-input col shift-time"
            name="startDate"
            label="Select Date *"
            rules={[
              {
                required: true,
                message: 'Start date is Required',
              },
            ]}
          >
            <Calendar
              onChange={onStartChange}
              className="date-picker  "
              dateFormat="YYYY/MM/DD"
              language="en"
              maxDate={tommorowDate}
            />
          </Form.Item>
          <Form.Item
            className="form-input col"
            name="selectTime"
            label="Select Time *"
            rules={[{ required: true, message: 'Holiday Name is Required' }]}
          >
            <TimePicker
              name="startTime"
              onSelect={onStartChange}
              use12Hours
              format="HH:mm a"
              defaultOpenValue={dayjs('00:00', 'HH:mm')}
              placeholder="Start Time"
              className="start-time"
              value={dayjs(startTime, 'HH:mm')}
              onChange={onStartTimeChange}
            />
          </Form.Item>
        </div>
        <div style={{ marginTop: 20 }}>
          <Form.Item
            className="form-input col"
            name="notes"
            label="Notes *"
            rules={[{ required: true, message: 'Notes is required' }]}
          >
            <TextArea
              style={{ height: 96, resize: 'none' }}
              onChange={onChange}
              placeholder="Enter any additional notes or comments related to this holiday"
            />
          </Form.Item>
        </div>
        <div className="form-btn-container" style={{ marginTop: 15 }}>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AttendanceRequest;
