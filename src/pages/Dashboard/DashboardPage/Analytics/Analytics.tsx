import AnalyticsComponent from "../../../../Components/Dashboard/AnalyticsComponent/AnalyticsComponent";
import "./analytics.css";

const Analytics = () => {
  return (
    <div className="analytics">
      <span className="analytics-header">Productive Analytics Overview</span>{" "}
      <AnalyticsComponent />
    </div>
  );
};

export default Analytics;
