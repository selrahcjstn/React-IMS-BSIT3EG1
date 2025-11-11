import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi"
import { ref, update, runTransaction } from "firebase/database"
import { database } from "../../../firebase/config"
import "./item-card.css"

function ItemCard({ item, onDelete }) {
  const { id: inventoryId } = useParams()
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "In Stock":
        return "item-card__status-badge--in-stock"
      case "Low Stock":
        return "item-card__status-badge--low-stock"
      case "Out of Stock":
        return "item-card__status-badge--out-of-stock"
      default:
        return ""
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Stock":
        return "🟢"
      case "Low Stock":
        return "🟡"
      case "Out of Stock":
        return "🔴"
      default:
        return ""
    }
  }

  const handleDelete = async () => {
    if (deleting) return
    const ok = window.confirm(`Delete "${item.name}"? This cannot be undone.`)
    if (!ok) return

    try {
      setDeleting(true)

      await update(ref(database), {
        [`inventoryItems/${inventoryId}/${item.id}`]: null
      })

      await runTransaction(
        ref(database, `inventories/${inventoryId}/itemCount`),
        (current) => (typeof current === "number" && current > 0 ? current - 1 : 0)
      )

      if (typeof onDelete === "function") onDelete(item.id)
    } catch (err) {
      alert(err?.message || "Failed to delete item.")
    } finally {
      setDeleting(false)
    }
  }

  const goEdit = () => {
    navigate(`/inventory/items/${inventoryId}/item/${item.id}/edit`)
  }

  const goView = () => {
    navigate(`/inventory/items/${inventoryId}/item/${item.id}`)
  }

  return (
    <div className={`item-card ${deleting ? 'item-card--deleting' : ''}`}>
      <div className="item-card__header">
        <div className="item-card__title-section">
          <h3 className="item-card__item-name" title={item.name}>{item.name}</h3>
          {item.size && <span className="item-card__item-size">{item.size}</span>}
        </div>
        
        <div className="item-card__actions">
          <button
            className="item-card__action-btn item-card__action-btn--edit"
            onClick={goEdit}
            aria-label={`Edit ${item.name}`}
            title="Edit item"
            disabled={deleting}
          >
            <FiEdit2 />
          </button>
          <button
            className="item-card__action-btn item-card__action-btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${item.name}`}
            title={deleting ? "Deleting..." : "Delete item"}
            disabled={deleting}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="item-card__body">
        <div className="item-card__metrics">
          <div className="item-card__metric">
            <span className="item-card__metric-label">Quantity</span>
            <span className="item-card__metric-value">{item.quantity}</span>
          </div>
          <div className="item-card__metric">
            <span className="item-card__metric-label">Unit Price</span>
            <span className="item-card__metric-value">₱{Number(item.unitPrice || 0).toFixed(2)}</span>
          </div>
          <div className="item-card__metric item-card__metric--total">
            <span className="item-card__metric-label">Total Value</span>
            <span className="item-card__metric-value">₱{Number(item.totalValue || 0).toFixed(2)}</span>
          </div>
        </div>

        <div className="item-card__footer">
          <div className="item-card__status-wrapper">
            <span className={`item-card__status-badge ${getStatusBadgeClass(item.status)}`}>
              <span className="item-card__status-icon">{getStatusIcon(item.status)}</span>
              <span>{item.status}</span>
            </span>
            <span className="item-card__last-updated">{item.lastUpdated}</span>
          </div>
          
          <button
            className="item-card__view-btn"
            onClick={goView}
            aria-label={`View details for ${item.name}`}
            title="View item details"
          >
            <span>Details</span>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard