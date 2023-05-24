import React, { useEffect, useState } from "react";
import "./Announcement.css";
import { MdCampaign } from "react-icons/md";
import { TbPlus } from "react-icons/tb";
import { MdCalendarToday } from "react-icons/md";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { Button, DatePicker, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { getAnnouncement } from "../../../redux/features/announcementSlice";
import { formatDate } from "./helperFunction";
import ModalComponent from "../../Ui/Modal/Modal";
import TextArea from "antd/es/input/TextArea";
import NepaliDate from "nepali-date-converter";

const Announcement = () => {
  const [form] = Form.useForm();

  const onStartChange = ({ bsDate }: any) => {
    form.setFieldValue("startDate", bsDate);
  };

  const onFinish = async (values: any) => {
    console.log({ values });
  };
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { announcement } = useAppSelector((state) => state.announcement);
  console.log({ announcement });
  const [openAnnounceModel, setOpenAnnounceModel] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getAnnouncement() as any);
  }, [dispatch]);

  const handleCancel = () => {
    setOpenAnnounceModel(false);
    form.resetFields();
  };
  const nepaliDate = new NepaliDate(new Date());
  const year = nepaliDate.getYear();
  const month = (nepaliDate.getMonth() + 1).toString().padStart(2, "0");
  const day = nepaliDate.getDate().toString().padStart(2, "0");
  const currentDate = `${year}/${month}/${day}`;

  return (
    <>
      <div className="announcement-container">
        <div className="announcement-container-date">
          <div className="announcement-container-date-calendar">
            <h5 className="date">{formatDate(currentDate)}</h5>
            <span>
              <MdCalendarToday className="announcement-container-date-calendar-icons" />
            </span>
          </div>
        </div>
        <div className="announcement-container-title">
          <div className="announcement-container-title-left">
            <h4>
              <img src="vector.svg" alt="announcement logo" />
              Announcement
            </h4>
            <p>Don't miss to innounce important notice</p>
          </div>
          <div className="announcement-container-title-right">
            <button onClick={() => setOpenAnnounceModel(true)}>
              <span>
                <TbPlus />
              </span>
              Announce
            </button>
          </div>
        </div>
        <div className="announcement-container-announcements">
          {announcement?.announcements?.map((announcement: any, index: any) => (
            <div
              className="announcement-container-announcements-box"
              key={index}
            >
              <div className="announcement-container-announcements-box-right">
                <h4>{announcement.title}</h4>
                <p>{announcement.details}</p>
              </div>
              <div className="announcement-container-announcements-box-left ">
                <p>{formatDate(announcement.date)}</p>
                <div className="announcement-container-announcements-box-buttons">
                  <Button type="text" danger>
                    Delete
                  </Button>
                  <Button type="primary">View</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalComponent
        openModal={openAnnounceModel}
        classNames="add-jobs-modal"
        closeModal={setOpenAnnounceModel}
      >
        <h3 className="modal-title">Add Announce</h3>
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="announcement-form"
          // form={form}
        >
          <Form.Item
            className="form-input col"
            name="title"
            label="Announcement Topic *"
            rules={[
              { required: true, message: "Announcement title is Required" },
            ]}
            // initialValue={fromUpdateJobs ? job?.job?.title : ""}
          >
            <Input
              placeholder="Enter the Topic"
              className="form-input-wrapper"
              type="text"
            />
          </Form.Item>
          <Form.Item
            label="Announcement Topic *"
            className="form-input col"
            name="date"
          >
            <Calendar
              onChange={onStartChange}
              className="date-picker  "
              dateFormat="YYYY/MM/DD"
              language="en"
            />
          </Form.Item>
          <Form.Item
            className="form-input col pt-4"
            name="details"
            label="Description *"
            rules={[{ required: true, message: "Description is Required" }]}
            // initialValue={fromUpdateJobs ? job?.job?.title : ""}
          >
            <TextArea
              placeholder="Enter the description"
              className="form-input-wrapper"
              style={{ height: 120 }}
            />
          </Form.Item>
          <div className="announcement-form-buttons">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Announce
            </Button>
          </div>
        </Form>
      </ModalComponent>
    </>
  );
};

export default Announcement;
