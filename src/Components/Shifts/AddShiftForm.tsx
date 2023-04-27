import {
  Button,
  Form,
  Input,
  message,
  Checkbox,
  TimePicker,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import { apis } from '../apis/constants/ApisService';
import { daysOfWeek, workingDay } from '../../utils/Constants';
import { useDispatch } from 'react-redux';
import { getShift } from '../../redux/features/shiftSlice';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getSingleShift } from '../../redux/features/singleShiftSlice';

dayjs.extend(customParseFormat);
const CheckboxGroup = Checkbox.Group;

export interface IForm {
  isModalOpen?: boolean;
  setIsModalOpen?: any;
  fromUpdate?: boolean;
  setUpdateModalIsModal?: any;
  shiftId?: string;
}

const AddShiftForm = ({
  setIsModalOpen,
  fromUpdate,
  setUpdateModalIsModal,
  shiftId,
}: IForm) => {
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [customDay, setCustomDay] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    form.setFieldValue('workingDay', list);
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const res = await apis.addShifts(values);

      if (res.status === 201) {
        message.success('Shift Created');
        dispatch(getShift() as any);
        setIsModalOpen(false);
        form.resetFields();
      }
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setIsModalOpen(false);
    }
  };

  const onUpdateFinish = async (values: any) => {
    try {
      const res = await apis.updateShifts(values, shiftId);

      if (res.status === 201) {
        message.success('Shift updated');
        dispatch(getShift() as any);
        setUpdateModalIsModal(false);
        form.resetFields();
      }
    } catch {
      message.error('Something Went Wrong');
    } finally {
      setUpdateModalIsModal(false);
    }
  };

  const onStartChange = (value: any) => {
    setStartTime(value);
  };
  const onEndChange = (value: any) => {
    setEndTime(value);
  };

  const onWorkingDaySelection = (value: string) => {
    form.setFieldValue('workingDay', value);
  };

  useEffect(() => {
    const endTimeFormat = dayjs(endTime);
    const startTimeFormat = dayjs(startTime);
    if (endTime && startTime) {
      const workingHour = endTimeFormat.diff(startTimeFormat, 'hour', true);

      if (workingHour < 1) {
        message.error('End time must be greater then start time');
      } else {
        form.setFieldValue('shiftSchedule', workingHour);
      }
    }
  }, [endTime, startTime]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleUpdateCancel = () => {
    setUpdateModalIsModal(false);
    form.resetFields();
  };
  useEffect(() => {
    if (shiftId) {
      dispatch(
        getSingleShift({
          shiftId,
        }) as any
      );
    }
  }, [dispatch]);

  const { data, loading } = useAppSelector((state) => state.singleShiftSlice);

  const CustomDayArray = () => {
    return (
      <div>
        <span
          onClick={() => setCustomDay(false)}
          className='back-text d-flex align-items-center'
        >
          <FontAwesomeIcon icon={faArrowLeft} className='back-arrow' />{' '}
          <span className='text-center d-flex align-items-center justify-content-center'>
            Custom working day
          </span>
        </span>
        <CheckboxGroup
          options={daysOfWeek}
          value={checkedList}
          onChange={onChange}
          className='check-box-container'
        />
      </div>
    );
  };

  return fromUpdate && loading ? (
    <span>...Loading</span>
  ) : (
    <div>
      <Form
        layout='vertical'
        onFinish={fromUpdate ? onUpdateFinish : onFinish}
        autoComplete='off'
        className='shift-assign-form'
        form={form}
      >
        <Form.Item
          className='form-input col'
          name='shiftName'
          label='Shift Name *'
          rules={[{ required: true, message: 'Shift Name is Required' }]}
          initialValue={fromUpdate ? data?.shiftName : ''}
        >
          <Input
            name='shiftName'
            placeholder='Enter the name of the new shift'
            className='form-input-wrapper'
            type='text'
          />
        </Form.Item>
        <div className='form-second-row align-items-start'>
          <Form.Item
            className='form-input col working-day'
            name='workingDay'
            label='Working day *'
            rules={[{ required: true, message: 'Working day is Required' }]}
          >
            <Select
              placeholder='Select'
              mode='multiple'
              className='selects form-input-wrapper'
              options={workingDay}
              onChange={onWorkingDaySelection}
              suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
              maxTagCount='responsive'
              popupClassName='custom-select-dropdown'
              dropdownRender={(menu) => (
                <>
                  {customDay ? <CustomDayArray /> : menu}
                  {customDay ? (
                    ''
                  ) : (
                    <p
                      className='custom-text'
                      onClick={() => setCustomDay(true)}
                    >
                      Custom
                    </p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <div className='d-flex align-items-end time-start-end'>
            <Form.Item
              className='form-input col shift-time'
              name='startTime'
              label='Select Time *'
              rules={[
                {
                  required: true,
                  message: 'Start time is Required',
                },
              ]}
              // initialValue={fromUpdate ? data?.startDate : null}
            >
              <TimePicker
                name='startTime'
                onSelect={onStartChange}
                use12Hours
                format='HH:mm a'
                defaultOpenValue={dayjs('00:00', 'HH:mm')}
                placeholder='Start Time'
                className='start-time'
                value={dayjs(startTime, 'HH:mm')}
              />
            </Form.Item>
            <div className='dash'>-</div>
            <Form.Item
              className='form-input col shift-time'
              name='endTime'
              label=<div></div>
              rules={[
                {
                  required: true,
                  message: 'End time is Required',
                },
              ]}
              // initialValue={fromUpdate ? data?.endTime : null}
            >
              <TimePicker
                name='endTime'
                onSelect={onEndChange}
                use12Hours
                format='HH:mm a'
                defaultOpenValue={dayjs('00:00', 'HH:mm')}
                placeholder='End Time'
                className='end-time'
                value={dayjs(endTime, 'HH:mm')}
              />
            </Form.Item>
          </div>
        </div>
        <div className='form-second-row align-items-baseline'>
          <Form.Item
            className='form-input col'
            name='shiftSchedule'
            label='Shift Scheduling (Auto Generate)'
            rules={[{ required: false }]}
            initialValue={fromUpdate ? data?.shiftSchedule : null}
          >
            <Input
              name='shiftScheduling'
              placeholder='Working hour'
              className='form-input-wrapper'
              type='text'
            />
          </Form.Item>
          <Form.Item
            className='form-input col'
            name='device'
            label='Device *'
            rules={[{ required: true, message: 'Device name is required' }]}
            initialValue={fromUpdate ? data?.device : null}
          >
            <Input
              name='device'
              placeholder='Device Name'
              className='form-input-wrapper'
              type='text'
            />
          </Form.Item>
        </div>
        <div className='form-btn-container'>
          <Button
            type='default'
            onClick={fromUpdate ? handleUpdateCancel : handleCancel}
          >
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            {fromUpdate ? 'Save' : 'Add'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddShiftForm;
