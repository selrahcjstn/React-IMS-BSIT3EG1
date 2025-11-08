import "./dashboard-header.css";

function DashboardHeader({currentUser}) {
  return (
    <div className="dashboard__header">
      <img src="../../assets/logo.png" alt="Logo" className="dashboard__logo" />
      <h3>Welcome, {currentUser.displayName}!</h3>
    </div>
  );
}

export default DashboardHeader;
