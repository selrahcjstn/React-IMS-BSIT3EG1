import "./button.css"
function Button({label, className, onClick}) {
  return (
    <button onClick={onClick} className={`button ${className}`}>{label}</button>
  )
}

export default Button   