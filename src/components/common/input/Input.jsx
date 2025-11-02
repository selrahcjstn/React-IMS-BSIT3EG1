function Input({ type, placeholder, name, value, onChange}) {
  return (
    <input
      className="input"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;
