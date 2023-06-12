import Announcement from "../../../Components/Dashboard/upcomingEvents/Announcement";
import UpcomingEvents from "../../../Components/Dashboard/upcomingEvents/UpcomingEvents";
import "./UserDashboard.css";

const UserDashborad = () => {
  return (
    <>
      <div className="row user-dashboard">
        <div className="col-9 user-dashboard__daily-attendance px-5 py-2 ">
          <div className="row  h-25 user-dashboard__daily-attendance-track"></div>
          <div className="row  user-dashboard_daily_attendance-status h-25">
            <div className="col-7 ">Attendance</div>
            <div className="col-5 user-dashboard_announcement">
              <Announcement isAdmin={false} />
            </div>
          </div>
        </div>
        <div className="col-3 py-2 user-dashboard__upcoming_events">
          <UpcomingEvents isSmall />
        </div>
      </div>
    </>
  );
};

export default UserDashborad;
