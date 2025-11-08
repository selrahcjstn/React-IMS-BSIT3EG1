import "./inventory-list.css";
import { Link } from "react-router-dom";

function InventoryList() {
  return (
    <div className="inventory__list">
      <div className="inventory__item">
        <div className="inventory__item-container">
          <div className="inventory__item-header">
            <h3 className="inventory__item-name">Inventory Name</h3>
            <span className="inventory__item-tag">Inventory Tag</span>
          </div>

          <div className="inventory__item-stats">
            <div className="inventory__stat">
              <span className="inventory__stat-label">Quantity</span>
              <span className="inventory__stat-value">100</span>
            </div>
            <div className="inventory__stat">
              <span className="inventory__stat-label">Total Amount</span>
              <span className="inventory__stat-value">$1000</span>
            </div>
          </div>

          <div className="inventory__item-dates">
            <span className="inventory__date">
              <strong>Created:</strong> 2024-01-01
            </span>
            <span className="inventory__date">
              <strong>Updated:</strong> 2024-01-01
            </span>
          </div>

          <Link to="/inventory/1" className="inventory__item-link">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
