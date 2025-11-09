import { Link } from "react-router-dom";
import "./inventory-card.css";

function InventoryCard({
  id,
  name,
  category,
  itemCount,
  totalValue,
  createdAt,
  updatedAt,
  loading = false,
}) {
  return (
    <div className="inventory__item">
      <div className="inventory__item-container">
        <div className="inventory__item-header">
          <h3 className="inventory__item-name">{name}</h3>
          <span className="inventory__item-tag">{category}</span>
        </div>

        <div className="inventory__item-stats">
          <div className="inventory__stat">
            <span className="inventory__stat-label">Quantity</span>
            <span className="inventory__stat-value">
              {loading ? "—" : itemCount}
            </span>
          </div>
          <div className="inventory__stat">
            <span className="inventory__stat-label">Total Amount</span>
            <span className="inventory__stat-value">
              {loading
                ? "—"
                : typeof totalValue === "number"
                ? `$${totalValue.toLocaleString()}`
                : "-"}
            </span>
          </div>
        </div>

        <div className="inventory__item-dates">
          <span className="inventory__date">
            <strong>Created:</strong> {loading ? "—" : createdAt}
          </span>
          <span className="inventory__date">
            <strong>Updated:</strong> {loading ? "—" : updatedAt}
          </span>
        </div>

        {loading ? (
          <div className="inventory__item-link inventory__item-link--disabled">
            View Details →
          </div>
        ) : (
          <Link
            to={`/inventory/items/${id}`}
            className="inventory__item-link"
            aria-label={`View inventory ${name}`}
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  );
}

export default InventoryCard;