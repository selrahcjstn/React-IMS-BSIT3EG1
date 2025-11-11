import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardBoxContainer from "../../features/app/dashboard/box-container/DashboardBoxContainer";
import Chart from "../../features/app/dashboard/chart/Chart";
import "./dashboard.css";
import RecentActivity from "../../features/app/dashboard/recent-activity/RecentActivity";
function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/auth/login" replace />;

  return (
    <div className="dashboard container">
      <DashboardBoxContainer />
      <Chart />
      <RecentActivity />
    </div>
  );
}

export default Dashboard;