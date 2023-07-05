import { useEffect, useMemo, useState } from 'react';
import './AttendanceTrack.css';
import NepaliDate from 'nepali-date-converter';
import { Progress, Tooltip, Button, Skeleton } from 'antd';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useGetAllWorkhoursQuery } from '../../../../redux/api/employeeWorkhour';
import { useTokenData } from '../../../../hooks/userTokenData';
import { useGetSingleAttendanceQuery } from '../../../../redux/features/attendanceUpdateSlice';

const AttendanceTrack = () => {
  const [runningTime, setRunningTime] = useState('0:00:00');
  const { userSn } = useTokenData();
  const { data, isLoading } = useGetAllWorkhoursQuery(userSn || '');

  // Fetch employee data
  const startDate = new NepaliDate().format('YYYY/MM/DD');

  // Calculate progress percentages
  const yesterdayPercent = useMemo(() => (data?.yesterdayWorkHour / 9) * 100, [data?.yesterdayWorkHour]);
  const weekPercent = useMemo(() => (data?.weekWorkHour / 45) * 100, [data?.weekWorkHour]);
  const monthPercent = useMemo(() => (data?.monthWorkHour / 180) * 100, [data?.monthWorkHour]);
  const totalPercent = useMemo(() => (data?.totalWorkHour / 2160) * 100, [data?.totalWorkHour]);
  const { data: employee, isLoading: loading } = useGetSingleAttendanceQuery({
    userSn: userSn,
    startDate: startDate,
    endDate: startDate,
  });

  // Clock running time calculation
  const startTime = useMemo(() => employee?.result?.[0]?.attendanceByDate?.entryTime, [employee?.result]);
  let startHour: any, startMinutes: any;
  if (startTime) {
    const [hourStr, minuteStr] = startTime.split(':');
    startHour = parseInt(hourStr, 10);
    startMinutes = parseInt(minuteStr, 10);
  }

  useEffect(() => {
    if (startTime && !isNaN(startHour) && !isNaN(startMinutes)) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        // Calculate the time difference in hours, minutes, and seconds
        const timeDiff = (hours - startHour) * 3600 + (minutes - startMinutes) * 60 + seconds;
        const formattedTime = formatTime(timeDiff);
        setRunningTime(formattedTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, startHour, startMinutes]);

  function formatTime(timeDiff: any) {
    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;

    const formattedTime = `${hours}hr ${minutes}m ${seconds}s`;
    return formattedTime;
  }

  // Calculate clock progress
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
        <p className="attendance-track_pragraph">Keep track of your productive days.</p>
      </div>
      <div className="attendance-track_track-box row">
        <div className="track-box col timeSheet">
          <div className="track-box_header">
            <h4 className="track-box_heading">Time Sheet</h4>
            <p className="track-box_heading-date">{new NepaliDate().format(' DD MMMM,YYYY')}</p>
          </div>
          <div className="clock_input">
            <h4 className="clock_input-heading">CLOCK IN AT</h4>
            <p className="clock_input-paragraph">
              {new NepaliDate().format(' ddd, DD MMMM')} {employee?.result?.[0]?.attendanceByDate?.entryTime}
            </p>
          </div>
          <div className="progress-bar">
            <Tooltip title="3 done / 3 in progress / 4 to do">
              <Progress
                percent={100}
                success={{
                  percent: clockProgress,
                  strokeColor: '#023C87',
                }}
                type="circle"
                strokeColor="#66D5F7"
                strokeWidth={10}
                size={150}
                format={() => customContent}
              />
            </Tooltip>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="primary"
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
              <div className="work-hour-box_time">{data?.yesterdayWorkHour}hrs / 9hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={yesterdayPercent} showInfo={false} strokeColor="#023C87" />
            </div>
          </div>

          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">This Week</div>
              <div className="work-hour-box_time">{data?.weekWorkHour}hrs / 45hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={weekPercent} showInfo={false} strokeColor=" #22BB33" />
            </div>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">This month</div>
              <div className="work-hour-box_time">{data?.monthWorkHour}hrs/ 180hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={monthPercent} showInfo={false} strokeColor="#9747FF" />
            </div>
          </div>
          <div className="work-hour-box">
            <div className="work-hour-box_time-info">
              <div className="work-hour-box_day">Total</div>
              <div className="work-hour-box_time">{data?.totalWorkHour}hrs/ 2160hrs</div>
            </div>
            <div className="work-hour-box_progressbar">
              <Progress percent={totalPercent} showInfo={false} strokeColor="#F0AD4E" />
            </div>
          </div>
        </div>
        <div className="track-box-averageCheck col">
          <div className="track-box-averageCheck-box">
            <div className="track-box_header">
              <h4 className="track-box_heading">Average Check In / Check Out</h4>
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
            <span className={`attendance-status__value ${!startTime && 'absent'}`}>
              {startTime ? 'Present' : 'Absent'}
            </span>
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
