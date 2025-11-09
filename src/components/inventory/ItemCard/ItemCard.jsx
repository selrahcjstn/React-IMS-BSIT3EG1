import { Link } from "react-router";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./item-card.css";

function ItemCard({ item, onEdit, onDelete }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "In Stock":
        return "item-card__status-badge--in-stock";
      case "Low Stock":
        return "item-card__status-badge--low-stock";
      case "Out of Stock":
        return "item-card__status-badge--out-of-stock";
      default:
        return "";
    }
  };

  return (
    <div className="item-card">
      <div className="item-card__header">
        <div className="item-card__header-left">
          <h3 className="item-card__item-name">{item.name}</h3>
          <span className="item-card__item-size">{item.size}</span>
        </div>
        <div className="item-card__card-actions">
          <button
            className="item-card__action-btn item-card__action-btn--edit"
            onClick={() => onEdit(item.id)}
            aria-label="Edit item"
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            className="item-card__action-btn item-card__action-btn--delete"
            onClick={() => onDelete(item.id)}
            aria-label="Delete item"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="item-card__content">
        <div className="item-card__stats-grid">
          <div className="item-card__stat">
            <span className="item-card__stat-label">Qty</span>
            <span className="item-card__stat-value">{item.quantity}</span>
          </div>
          <div className="item-card__stat">
            <span className="item-card__stat-label">Price</span>
            <span className="item-card__stat-value">
              ${item.unitPrice.toFixed(2)}
            </span>
          </div>
          <div className="item-card__stat">
            <span className="item-card__stat-label">Total</span>
            <span className="item-card__stat-value item-card__stat-value--primary">
              ${item.totalValue.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="item-card__bottom-row">
          <div className="item-card__dates-inline">
            <span className="item-card__date-small">
              {item.lastUpdated}
            </span>
          </div>
          <span
            className={`item-card__status-badge ${getStatusBadgeClass(
              item.status
            )}`}
          >
            {item.status}
          </span>
          <Link to={`/inventory/item/${item.id}`} className="item-card__view-link">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;