import "./custom-input.css";

function CustomInput({ children, label, icon: Icon }) {
  return (
    <label className="custom__input-label">
      {label}
      <div className="custom__input">
        {Icon && <Icon className="custom__input-icon" />}
        {children}
      </div>
    </label>
  );
}

export default CustomInput;
