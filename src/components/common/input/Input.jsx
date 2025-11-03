function Input({id, type, placeholder, name, value, onChange}) {
  return (
    <input
      id={id}
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
