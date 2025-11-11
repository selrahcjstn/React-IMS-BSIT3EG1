import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { ref, update, runTransaction } from "firebase/database";
import { database } from "../../../firebase/config";
import "./item-card.css";

function ItemCard({ item, onDelete }) {
  const { id: inventoryId } = useParams();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (deleting) return;
    const ok = window.confirm(`Delete "${item.name}"? This cannot be undone.`);
    if (!ok) return;

    try {
      setDeleting(true);

      await update(ref(database), {
        [`inventoryItems/${inventoryId}/${item.id}`]: null
      });

      await runTransaction(
        ref(database, `inventories/${inventoryId}/itemCount`),
        (current) => (typeof current === "number" && current > 0 ? current - 1 : 0)
      );

      if (typeof onDelete === "function") onDelete(item.id);
    } catch (err) {
      alert(err?.message || "Failed to delete item.");
    } finally {
      setDeleting(false);
    }
  };

  const goEdit = () => {
    // Correct: include BOTH params in the order the route expects
    navigate(`/inventory/items/${inventoryId}/item/${item.id}/edit`);
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
            onClick={goEdit}
            aria-label="Edit item"
            title="Edit"
            disabled={deleting}
          >
            <FiEdit2 />
          </button>
          <button
            className="item-card__action-btn item-card__action-btn--delete"
            onClick={handleDelete}
            aria-label="Delete item"
            title={deleting ? "Deleting..." : "Delete"}
            disabled={deleting}
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
              ₱{Number(item.unitPrice || 0).toFixed(2)}
            </span>
          </div>
          <div className="item-card__stat">
            <span className="item-card__stat-label">Total</span>
            <span className="item-card__stat-value item-card__stat-value--primary">
              ₱{Number(item.totalValue || 0).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="item-card__bottom-row">
          <div className="item-card__dates-inline">
            <span className="item-card__date-small">{item.lastUpdated}</span>
          </div>
          <span
            className={`item-card__status-badge ${getStatusBadgeClass(item.status)}`}
          >
            {item.status}
          </span>
          <Link
            to={`/inventory/items/${inventoryId}/item/${item.id}`}
            className="item-card__view-link"
            aria-label={`View item ${item.name}`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;