import "./header.css"

function Header({ title, subtitle }) {
  return (
    <div className="inventory__header">
      <h1 className="inventory__header-title">{title}</h1>
      <p className="inventory__header-subtitle">{subtitle}</p>
    </div>
  )
}

export default Header