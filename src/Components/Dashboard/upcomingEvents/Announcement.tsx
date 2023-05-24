import React, { useEffect } from "react";
import "./Announcement.css";
import { MdCampaign } from "react-icons/md";
import { TbPlus } from "react-icons/tb";
import { MdCalendarToday } from "react-icons/md";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { getAnnouncement } from "../../../redux/features/announcementSlice";
import { formatDate } from "./helperFunction";

const Announcement = () => {
  const dispatch = useDispatch();

  const { announcement } = useAppSelector((state) => state.announcement);
  console.log({ announcement });
  useEffect(() => {
    dispatch(getAnnouncement() as any);
  }, [dispatch]);

  return (
    <div className="announcement-container">
      <div className="announcement-container-date">
        <div className="announcement-container-date-calendar">
          <h5 className="date">Tuesday,09 Jestha ,2080</h5>
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
  );
};

export default Announcement;
