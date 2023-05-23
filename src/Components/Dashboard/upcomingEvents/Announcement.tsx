import React, { useEffect } from "react";
import "./Announcement.css";
import { MdCampaign } from "react-icons/md";
import { TbPlus } from "react-icons/tb";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { getAnnouncement } from "../../../redux/features/announcementSlice";

const Announcement = () => {
  const dispatch = useDispatch();

  const { announcement } = useAppSelector((state) => state.announcement);

  useEffect(() => {
    dispatch(getAnnouncement() as any);
  }, [dispatch]);

  return (
    <div className="announcement-container">
      <div className="announcement-container-date">
        <Calendar dateFormat="YYYY/MM/DD" language="en" />
      </div>
      <div className="announcement-container-title">
        <div className="announcement-container-title-left">
          <h4>
            <span>
              <MdCampaign
                className="announcement-container-title-left-icon"
                style={{ color: "#00B9F1" }}
              />
            </span>
            Announcement
          </h4>
          <p>Don't miss to innounce important notice</p>
        </div>
        <div className="announcement-container-title-right">
          <button>
            <span>
              <TbPlus />
            </span>
            Announce
          </button>
        </div>
      </div>
      <div className="announcement-container-announcements">
        {announcement?.announcements?.map((announcement: any, index: any) => (
          <div className="announcement-container-announcements-box" key={index}>
            <div className="announcement-container-announcements-box-right">
              <h4>{announcement.title}</h4>
              <p>{announcement.details}</p>
            </div>
            <div className="announcement-container-announcements-box-left ">
              <div>
                <p>Date: {announcement.date}</p>
              </div>
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
  );
};

export default Announcement;
