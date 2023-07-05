import Announcement from '../../../../Components/Dashboard/upcomingEvents/Announcement';
import UpcomingEvents from '../../../../Components/Dashboard/upcomingEvents/UpcomingEvents';
import UserDashboardAttendance from '../../../../Components/Ui/Tables/UserDashboardAttendance';
import AttendanceTrack from './AttendanceTrack';
import './UserDashboard.css';
const UserDashboard = () => {
  return (
    <>
      <div className="row user-dashboard">
        <div className="col-9 user-dashboard__daily-attendance ">
          <div className="p-4">
            <AttendanceTrack />
            
          </div>
          <hr />
          <div className="row  user-dashboard_daily_attendance-status p-2">
            <div className="col-7">
              <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Attendance Status for a Current month</p>
              <UserDashboardAttendance />
            </div>

            <div className="col-5 user-dashboard_announcement">
              <Announcement isAdmin={false} />
            </div>
          </div>
        </div>
        <div className="col-3 py-2 user-dashboard__upcoming_events">
          <UpcomingEvents isSmall isAdmin={false} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
