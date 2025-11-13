function DashboardBox({ title, value, icon, iconClass }) {
  return (
    <div className="dashboard__box">
      <div className="dashboard__box-left">
        <p className="dashboard__box-title">{title}</p>
        <p className="dashboard__box-value">{value}</p>
      </div>
      <div className={`dashboard__box-icon ${iconClass || ""}`}>
        {icon}
      </div>
    </div>
  );
}

export default DashboardBox;
