import "./input.css";

function Input({ id, type, placeholder, name, value, onChange, required }) {
  return (
    <input
      id={id}
      className="input"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
}

export default Input;