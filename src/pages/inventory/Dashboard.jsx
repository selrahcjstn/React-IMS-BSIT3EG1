import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardHeader from "../../features/app/dashboard/dashboard-header/DashboardHeader";
import DashboardBoxContainer from "../../features/app/dashboard/box-container/DashboardBoxContainer";
import Chart from "../../features/app/dashboard/chart/Chart";
import "./dashboard.css";

function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/auth/login" replace />;

  return (
    <div className="dashboard container">
      <DashboardHeader currentUser={currentUser} />
      <DashboardBoxContainer />
      <Chart />
    </div>
  );
}

export default Dashboard;
