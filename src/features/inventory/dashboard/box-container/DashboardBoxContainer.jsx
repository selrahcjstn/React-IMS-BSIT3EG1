import "./dashboard-box-container.css";
import DashboardBox from "../../../../components/inventory/dashboard-box/DashboardBox";
import { FaBoxes, FaCoins, FaExclamationTriangle } from "react-icons/fa";

function DashboardBoxContainer() {
  const formatCurrency = (value) => {
    return (
      "₱" +
      Number(value).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };
  return (
    <div className="dashboard__box-container">
      <DashboardBox
        title="Total Inventory Quantity"
        value="999"
        icon={<FaBoxes />}
      />

      <hr />

      <DashboardBox
        title="Total Inventory Value"
        value={formatCurrency(94244.22)}
        icon={<FaCoins />}
        iconClass="dashboard__box-icon--money"
      />

      <hr />

      <DashboardBox
        title="Low Stocks"
        value="999"
        icon={<FaExclamationTriangle />}
        iconClass="dashboard__box-icon--alert"
      />
    </div>
  );
}

export default DashboardBoxContainer;
