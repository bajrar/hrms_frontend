import { useEffect, useState } from 'react';
import NepaliDate from 'nepali-date-converter';
import './UpcomingEvents.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { getUpcomingEvents } from '../../../redux/features/upcomingEvents';
import { formatDate } from './helperFunction';
import { Button, Form, Input, Modal, Skeleton, message } from 'antd';
import { TbPlus } from 'react-icons/tb';
import ModalComponent from '../../Ui/Modal/Modal';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import moment from 'moment';
import {
  useAddUpcomingEventMutation,
  useDeleteEventMutation,
  useGetUpcomingEventsQuery,
  useUpdateEventMutation,
} from '../../../redux/api/eventSliceApi';

type PropsType = {
  isSmall?: boolean;
  isAdmin?: boolean;
};
const UpcomingEvents = ({ isSmall = false, isAdmin = true }: PropsType) => {
  const [addUpcomingEvent, { data, isLoading, isError }] = useAddUpcomingEventMutation();
  const [deleteEvent, { isSuccess }] = useDeleteEventMutation();
  const [updateEvent, { isSuccess: success }] = useUpdateEventMutation();

  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openEventModel, setOpenEventModel] = useState<boolean>(false);
  const [dateEvent, setDateEvent] = useState();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = async (values: any) => {
    console.log(values);
    console.log(selectedEvent);
    const { date, eventName, notes } = values;
    console.log(values, 'value');
    try {
      if (isEditing && selectedEvent) {
        await updateEvent({ id: selectedEvent, body: { eventName, date: date.bsDate, notes } });
        message.success('Event Updated Successfully!');
        setIsEditing(false);
      } else {
        await addUpcomingEvent({ eventName, date: date.bsDate, notes });
        message.success('Event Added Successfully!');
        setOpenEventModel(false);
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
      message.error('Error Try Again');
    } finally {
      setOpenEventModel(false);
      setIsEditing(false);
      form.resetFields();
    }
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const handleDelete = async () => {
    console.log(selectedEvent, 'select');
    if (selectedEvent) {
      try {
        await deleteEvent(selectedEvent._id);
        message.success('Event Deleted Successfully!');
        setDeleteModalVisible(false);
      } catch (error) {
        console.log(error);
      } finally {
        setDeleteModalVisible(false);
        setSelectedEvent(null);
      }
    }
  };

  const showDeleteModal = (event: any) => {
    setSelectedEvent(event);
    setDeleteModalVisible(true);
  };

  const showEditModel = (event: any) => {
    const dateInEvent = event.date.split('/').join('-');
    setDateEvent(dateInEvent);
    form.setFieldsValue(event);
    setSelectedEvent(event._id);
    setIsEditing(true);
    setOpenEventModel(true);
  };

  const getLastDayOfMonth = (year: number, month: number) => {
    const nepaliMonths = [
      31, // Baisakh
      32, // Jestha
      31, // Ashad
      32, // Shrawan
      31, // Bhadra
      30, // Ashwin
      30, // Kartik
      30, // Mangsir
      29, // Poush
      29, // Magh
      30, // Falgun
      30, // Chaitra
    ];

    return nepaliMonths[month];
  };

  const result = () => {
    const date = new NepaliDate();
    const month = date.getMonth();
    const year = date.getYear();
    const lastDayOfMonth = getLastDayOfMonth(year, month);

    const output = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
      output.push(i);
    }
    return output;
  };

  const calendarData = result();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUpcomingEvents() as any);
  }, [dispatch]);

  // const { upcomingEvents, loading } = useAppSelector((state) => state.upcomingEvents);
  const { data: upcomingEvents, isLoading: loading } = useGetUpcomingEventsQuery('events');

  // Get today's date
  const nepaliDate = new NepaliDate(new Date());
  const todayMonth: any = (nepaliDate.getMonth() + 1).toString().padStart(2, '0');
  const todayDay: any = nepaliDate.getDate().toString().padStart(2, '0');

  const hasEventToday = upcomingEvents?.events?.filter((event: any) => {
    const eventDateParts = event.date.split('/');
    const eventMonth: any = eventDateParts[1];
    const eventDay: any = eventDateParts[2];
    return eventMonth === todayMonth && eventDay === todayDay;
  });

  // Check if any dob falls on today's month and day
  const hasDobToday = upcomingEvents?.dob?.filter((dob: any) => {
    const dobDateParts = dob.dob.split('/');
    const dobMonth: any = dobDateParts[1];
    const dobDay: any = dobDateParts[2];
    return dobMonth === todayMonth && dobDay === todayDay;
  });

  // Check if any holiday falls on today's month and day
  const hasHolidayToday = upcomingEvents?.holidays?.filter((holiday: any) => {
    const startDateParts = holiday.startDate.split('/');
    const endDateParts = holiday.endDate.split('/');
    const startMonth: any = startDateParts[1];
    const startDay: any = startDateParts[2];
    const endMonth: any = endDateParts[1];
    const endDay: any = endDateParts[2];
    return (startMonth === todayMonth && startDay === todayDay) || (endMonth === todayMonth && endDay === todayDay);
  });

  const onStartChange = ({ bsDate }: any) => {
    setDateEvent(bsDate);

    // form.setFieldValue('startDate', bsDate);
  };

  const handleCancel = () => {
    setOpenEventModel(false);
    form.resetFields();
    setIsEditing(false);
  };

  return (
    <>
      <div className={`upcoming-events-heading d-flex justify-content-between `}>
        <div>
          <h4>Events</h4>
          <p>Don't miss the important schedule</p>
        </div>
        <div className={isAdmin ? 'event-container-title-right' : 'd-none'}>
          <button onClick={() => setOpenEventModel(true)}>
            <span>
              <TbPlus className="me-2" />
              Add Events
            </span>
          </button>
        </div>
      </div>
      <div className="upcoming-events-calendar mb-2">
        {loading ? (
          <Skeleton active />
        ) : (
          calendarData.map((item, index) => {
            const formattedItem = item.toString().padStart(2, '0');
            const hasDob = upcomingEvents?.dob?.some((dob: any) => {
              const dobDateParts = dob.dob.split('/');
              const dobDay = parseInt(dobDateParts[2]);
              return dobDay === item;
            });
            const dobButtonClass = hasDob ? 'dob-date' : '';
            const hasHolidays = upcomingEvents?.holidays?.some((holiday: any) => {
              const holidayStartDateParts = holiday.startDate.split('/');
              const holidayEndDateParts = holiday.endDate.split('/');
              const holidayStartDay = parseInt(holidayStartDateParts[2]);
              const holidayEndDay = parseInt(holidayEndDateParts[2]);
              return item >= holidayStartDay && item <= holidayEndDay;
            });
            const holidayButtonClass = hasHolidays ? 'holiday-date' : '';
            const hasEvents = upcomingEvents?.events?.some((event: any) => {
              const eventDateParts = event.date.split('/');
              const eventDay = parseInt(eventDateParts[2]);
              return eventDay === item;
            });
            const eventButtonClass = hasEvents ? 'event-date' : '';
            const buttonClass = formattedItem === todayDay ? 'current-date' : '';
            return (
              <div className={`upcoming-events-calendar-item  ${isSmall && 'smallWidth'} `} key={index}>
                <button className={`${buttonClass} ${dobButtonClass} ${holidayButtonClass} ${eventButtonClass}`}>
                  {formattedItem}
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="upcoming-event-today">
        <h4>Today</h4>
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            {hasEventToday?.length > 0 || hasDobToday?.length > 0 || hasHolidayToday?.length > 0 ? (
              <div className={`${isSmall && 'smallWidth'} `}>
                {hasEventToday?.length > 0 && (
                  <div className={`upcoming-event-upcoming-events-today ${isSmall && 'smallWidth'}`}>
                    {hasEventToday?.map((event: any, index: any) => (
                      <div className={`upcoming-event-upcoming-events-items ${isSmall && 'smallWidth'}`} key={index}>
                        <p id="formatted-eventdate-event">{formatDate(event.date)}</p>
                        <h5>{event.eventName}</h5>
                        <p>{event.notes}</p>

                        <div className="event-container-events-box-buttons gap-3">
                          <Button
                            type="primary"
                            danger
                            onClick={() => showDeleteModal(event)}
                            className={`${!isAdmin && 'd-none'}`}
                          >
                            Delete
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => showEditModel(event)}
                            className={`${!isAdmin && 'd-none'}`}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="upcoming-event-upcoming-events">
                  {hasDobToday?.map((dob: any, index: any) => (
                    <div className={`upcoming-event-upcoming-dobs-items  ${isSmall && 'smallWidth'}  mt-2`} key={index}>
                      <p id="formatted-eventdate-dob">{formatDate(dob.dob)}</p>
                      <h5>Birthday</h5>
                      <p>{dob.employeeName}</p>
                    </div>
                  ))}
                </div>

                {hasHolidayToday?.length > 0 && (
                  <div className={`upcoming-event-upcoming-holidays-items  ${isSmall && 'smallWidth'} `}>
                    {hasHolidayToday?.map((holiday: any, index: any) => (
                      <div key={index}>
                        <p id="formatted-eventdate-holidays">{formatDate(holiday.startDate)}</p>
                        <h5>{holiday.holidayName}</h5>
                        <p>{holiday.notes}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p>No events today.</p>
            )}
          </>
        )}
      </div>
      <div className="upcoming-event-upcoming">
        <h4>Upcoming</h4>
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <div className="upcoming-event-upcoming-events">
              {upcomingEvents?.events?.map((event: any, index: any) => (
                <div className={`upcoming-event-upcoming-events-items  ${isSmall && 'smallWidth'} `} key={index}>
                  <p id="formatted-eventdate-event"> {formatDate(event.date)}</p>
                  <h5>{event.eventName}</h5>
                  <p> {event.notes}</p>

                  <div className="event-container-events-box-buttons gap-3 ">
                    <Button
                      type="primary"
                      danger
                      onClick={() => showDeleteModal(event)}
                      className={`${!isAdmin && 'd-none'}`}
                    >
                      Delete
                    </Button>
                    <Button type="primary" onClick={() => showEditModel(event)} className={`${!isAdmin && 'd-none'}`}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}

              {upcomingEvents?.dob?.map((dob: any, index: any) => (
                <div className={`upcoming-event-upcoming-dobs-items  ${isSmall && 'smallWidth'} `} key={index}>
                  <p id="formatted-eventdate-dob">{formatDate(dob.dob)}</p>
                  <h5>Birthday</h5>
                  <p>{dob.employeeName}</p>
                </div>
              ))}

              {upcomingEvents?.holidays?.map((holiday: any, index: any) => (
                <div className={`upcoming-event-upcoming-holidays-items  ${isSmall && 'smallWidth'} `} key={index}>
                  <p id="formatted-eventdate-holidays">{formatDate(holiday.startDate)}</p>
                  <h5>Holiday</h5>
                  <p>Holiday Name: {holiday.holidayName}</p>
                  <p>Notes: {holiday.notes}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ModalComponent
        openModal={openEventModel}
        classNames="add-jobs-modal"
        closeModal={setOpenEventModel}
        destroyOnClose
      >
        <h3 className="modal-title">Add Events</h3>
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="announcement-form"
          // initialValues={isEditing && selectedEvent ? selectedEvent : undefined}
          form={form}
        >
          <Form.Item
            className="form-input col"
            name="eventName"
            label="Event Name"
            rules={[{ required: true, message: 'required' }]}
          >
            <Input placeholder="Enter the Event Name" className="form-input-wrapper" type="text" />
          </Form.Item>
          <Form.Item label="Event Date" className="form-input col" name="date" initialValue={moment('2080/03/16')}>
            <Calendar
              onChange={onStartChange}
              className="date-picker"
              dateFormat="YYYY/MM/DD"
              language="en"
              defaultDate={dateEvent}
            />
          </Form.Item>
          <Form.Item
            className="form-input col pt-4"
            name="notes"
            label="Description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <TextArea placeholder="Enter the description" className="form-input-wrapper" style={{ height: 120 }} />
          </Form.Item>
          <div className="announcement-form-buttons">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Edit Event' : 'Add Event'}
            </Button>
          </div>
        </Form>
      </ModalComponent>
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this Event?</p>
      </Modal>
    </>
  );
};

export default UpcomingEvents;
