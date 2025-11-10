import Button from "../../../../components/common/button/Button";
import { useNavigate } from "react-router";
import "./dashboard-header.css";

function DashboardHeader({ currentUser }) {
  const navigate = useNavigate();

  function handleCreateInventory() {
    navigate("/inventory");
  }

  return (
    <div className="dashboard__header">
      <div className="dashboard__header-left">
        <img
          src="../../assets/logo.png"
          alt="Logo"
          className="dashboard__logo"
        />
        <h3>Welcome, {currentUser.displayName}!</h3>
      </div>

      <div className="dashboard__header-right">
        <Button label="Create New Inventory" onClick={handleCreateInventory} />
      </div>
    </div>
  );
}

export default DashboardHeader;