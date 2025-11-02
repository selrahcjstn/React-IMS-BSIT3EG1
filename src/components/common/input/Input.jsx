function Input({ type, placeholder, value }) {
  return (
    <input
      className="input"
      type={type}
      name={type}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;
