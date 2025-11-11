import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import "./inventory-stats.css"

function InventoryStats({ items, inventoryName, isExpanded = true, onToggle }) {
  const totalItems = items.length
  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0)
  const inStockCount = items.filter(item => item.status === "In Stock").length
  const lowStockCount = items.filter(item => item.status === "Low Stock").length
  const outOfStockCount = items.filter(item => item.status === "Out of Stock").length

  const handleToggle = () => {
    if (typeof onToggle === "function") {
      onToggle()
    }
  }

  return (
    <div className={`inventory-stats ${!isExpanded ? 'inventory-stats--collapsed' : ''}`}>
      <button
        className="inventory-stats__header"
        onClick={handleToggle}
        aria-label={isExpanded ? "Collapse stats" : "Expand stats"}
        aria-expanded={isExpanded}
      >
        <span className="inventory-stats__title">
          Overview of {inventoryName}
        </span>
        <span className="inventory-stats__toggle-icon">
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      {isExpanded && (
        <div className="inventory-stats__content">
          <div className="inventory-stats__stat-card">
            <span className="inventory-stats__stat-label">Total Items</span>
            <span className="inventory-stats__stat-value">{totalItems}</span>
          </div>
          <div className="inventory-stats__stat-card">
            <span className="inventory-stats__stat-label">Total Value</span>
            <span className="inventory-stats__stat-value inventory-stats__stat-value--price">
              ₱{totalValue.toLocaleString()}
            </span>
          </div>
          <div className="inventory-stats__stat-card">
            <span className="inventory-stats__stat-label">In Stock</span>
            <span className="inventory-stats__stat-value inventory-stats__stat-value--success">
              🟢 {inStockCount}
            </span>
          </div>
          <div className="inventory-stats__stat-card">
            <span className="inventory-stats__stat-label">Low Stock</span>
            <span className="inventory-stats__stat-value inventory-stats__stat-value--warning">
              🟡 {lowStockCount}
            </span>
          </div>
          <div className="inventory-stats__stat-card">
            <span className="inventory-stats__stat-label">Out of Stock</span>
            <span className="inventory-stats__stat-value inventory-stats__stat-value--danger">
              🔴 {outOfStockCount}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryStats