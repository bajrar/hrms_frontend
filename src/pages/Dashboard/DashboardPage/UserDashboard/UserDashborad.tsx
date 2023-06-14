import Announcement from '../../../../Components/Dashboard/upcomingEvents/Announcement';
import UpcomingEvents from '../../../../Components/Dashboard/upcomingEvents/UpcomingEvents';
import UserDashboardAttendance from '../../../../Components/Ui/Tables/UserDashboardAttendance';
import AttendanceTrack from './AttendanceTrack';
import './UserDashboard.css';

const UserDashborad = () => {
  return (
    <>
      <div className='row user-dashboard'>
        <div className='col-9 user-dashboard__daily-attendance '>
          <div className='row  h-25 user-dashboard__daily-attendance-track p-4'>
            <AttendanceTrack />
          </div>
          <hr />
          <div className='row  user-dashboard_daily_attendance-status p-2'>
            <div className='col-7'>
              <h5>Attendance Status for a month</h5>
              <UserDashboardAttendance />
            </div>

            <div className='col-5 user-dashboard_announcement'>
              <Announcement isAdmin={false} />
            </div>
          </div>
        </div>
        <div className='col-3 py-2 user-dashboard__upcoming_events'>
          <UpcomingEvents isSmall />
        </div>
      </div>
    </>
  );
};

export default UserDashborad;
