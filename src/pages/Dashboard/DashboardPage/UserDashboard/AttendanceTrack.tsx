import React, { useEffect, useState } from "react";
import "./AttendanceTrack.css";
import NepaliDate from "nepali-date-converter";
import { Progress, Tooltip, Button, Skeleton, Space } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useGetAllWorkhoursQuery } from "../../../../redux/api/employeeWorkhour";
import { useAppSelector } from "../../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { verifyTokenStatus } from "../../../../redux/features/verifyTokenSlice";
import { RootState } from "../../../../store";
import { DotChartOutlined } from "@ant-design/icons";

const AttendanceTrack = () => {
  const [runningTime, setRunningTime] = useState("0:00:00");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, [dispatch]);
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userSn = tokenData?.userSn ? tokenData?.userSn : userData?.userSn;
  const { data, isLoading } = useGetAllWorkhoursQuery(userSn || "");
  const yesterdayPercent = (data?.yesterdayWorkHour / 9) * 100;
  const weekPercent = (data?.weekWorkHour / 45) * 100;
  const monthPercent = (data?.monthWorkHour / 180) * 100;
  const totalPercent = (data?.totalWorkHour / 2160) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      // Calculate the time difference in hours, minutes, and seconds after 9 AM
      const timeDiff = (hours - 9) * 60 * 60 + minutes * 60 + seconds;

      const formattedTime = formatTime(timeDiff);
      setRunningTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours;
    const formattedMinutes = minutes;
    const formattedSeconds = seconds;

    return `${formattedHours}hr ${formattedMinutes}m ${formattedSeconds}s`;
  };
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const timeDiff = hours - 9;

  const clockProgress = (timeDiff / 9) * 100;

  const customContent = (
    <div>
      <div style={{ marginTop: 8, fontSize: 20 }}> {runningTime}</div>
    </div>
  );

  return isLoading ? (
    <Skeleton active />
  ) : (
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
            <p className="track-box_heading-date">
              {new NepaliDate().format(" DD MMMM,YYYY")}
            </p>
          </div>
          <div className="clock_input">
            <h4 className="clock_input-heading">CLOCK IN AT</h4>
            <p className="clock_input-paragraph">
              {new NepaliDate().format(" ddd, DD MMMM")} 8:45:44 a.m.
            </p>
          </div>
          <div className="progress-bar">
            <Tooltip title="3 done / 3 in progress / 4 to do">
              <Progress
                percent={100}
                success={{
                  percent: clockProgress,
                  strokeColor: "#023C87",
                }}
                type="circle"
                strokeColor="#66D5F7"
                strokeWidth={10}
                size={150}
                format={() => customContent}
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
              <div className="work-hour-box_day">Yesterday</div>
              <div className="work-hour-box_time">
                {data?.yesterdayWorkHour}hrs / 9hrs
              </div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress
                percent={yesterdayPercent}
                showInfo={false}
                strokeColor="#023C87"
              />
            </div>
          </div>

          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">This Week</div>
              <div className="work-hour-box_time">
                {data?.weekWorkHour}hrs / 45hrs
              </div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress
                percent={weekPercent}
                showInfo={false}
                strokeColor=" #22BB33"
              />
            </div>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">This month</div>
              <div className="work-hour-box_time">
                {data?.monthWorkHour}hrs/ 180hrs
              </div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress
                percent={monthPercent}
                showInfo={false}
                strokeColor="#9747FF"
              />
            </div>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">Total</div>
              <div className="work-hour-box_time">
                {data?.totalWorkHour}hrs/ 2160hrs
              </div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress
                percent={totalPercent}
                showInfo={false}
                strokeColor="#F0AD4E"
              />
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
