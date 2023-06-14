import React from "react";
import "./AttendanceTrack.css";
import { Progress, Tooltip, Button } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";

const AttendanceTrack = () => {
  return (
    <div className="attendance-track">
      <div className="attendance-track_title">
        <h4 className="attendance-track_heading">Daily Attendance</h4>
        <p className="attendance-track_pragraph">
          Keep track of your productive days.
        </p>
      </div>
      <div className="attendance-track_track-box row">
        <div className="track-box col timeSheet">
          <div className="track-box_header">
            <h4 className="track-box_heading">Time Sheet</h4>
            <p className="track-box_heading-date">02 Magh, 2079</p>
          </div>
          <div className="clock_input">
            <h4 className="clock_input-heading">CLOCK IN AT</h4>
            <p className="clock_input-paragraph">
              Mon, 02 Magh 2079 8:45:44 a.m.
            </p>
          </div>
          <div className="progress-bar">
            <Tooltip title="3 done / 3 in progress / 4 to do">
              <Progress
                percent={100}
                success={{
                  percent: 40,
                  strokeColor: "#023C87",
                }}
                type="circle"
                strokeColor="#66D5F7"
                strokeWidth={10}
              />
            </Tooltip>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>Clock Out</span>
              <AiOutlineClockCircle />
            </Button>
          </div>
        </div>
        <div className="track-box col productiveAnalysis">
          <div className="track-box_header">
            <h4 className="track-box_heading">Productive Analysis</h4>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">Today</div>
              <div className="work-hour-box_time">3h 20m 20s / 9hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={50} showInfo={false} strokeColor="#023C87" />
            </div>
          </div>

          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">This Week</div>
              <div className="work-hour-box_time">44h 20m 30s / 45hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={50} showInfo={false} strokeColor=" #22BB33" />
            </div>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">This month</div>
              <div className="work-hour-box_time">160h 20m 30s / 180hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={50} showInfo={false} strokeColor="#9747FF" />
            </div>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">Remaining</div>
              <div className="work-hour-box_time">160h 20m 30s / 180hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={50} showInfo={false} strokeColor="#F0AD4E" />
            </div>
          </div>
        </div>
        <div className="track-box-averageCheck col">
          <div className="track-box-averageCheck-box">
            <div className="track-box_header">
              <h4 className="track-box_heading">
                Average Check In / Check Out
              </h4>
              <p className="track-box_heading-date">of a month</p>
            </div>
            <div className="clock_input">
              <h4 className="clock_input-heading">CLOCK IN AT</h4>
              <p className="clock_input-paragraph">8:45:44 a.m.</p>
            </div>
            <div className="clock_input">
              <h4 className="clock_input-heading">CLOCK OUT AT</h4>
              <p className="clock_input-paragraph">18:45:44 p.m.</p>
            </div>
          </div>
          <div className="attendance-status">
            <span className="attendance-status__label">Attendance Status</span>
            <span className="attendance-status__value">Present</span>
          </div>
          <div className="leave-request">
            <span className="leave-request__label">Leave Request</span>
            <span className="leave-request__value">Pending (1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrack;
