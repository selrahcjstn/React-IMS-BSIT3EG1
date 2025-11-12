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

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

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
      <div className="item-card__left">
        <div className="item-card__name-wrapper">
          <h3 className="item-card__item-name" title={item.name}>{item.name}</h3>
          {item.size && <span className="item-card__item-size">{item.size}</span>}
        </div>
      </div>

      <div className="item-card__center">
        <div className="item-card__stat-item">
          <span className="item-card__stat-label">Qty:</span>
          <span className="item-card__stat-value">{item.quantity}</span>
        </div>
        <div className="item-card__divider"></div>
        <div className="item-card__stat-item">
          <span className="item-card__stat-label">Total:</span>
          <span className="item-card__stat-value-highlight">₱{formatCurrency(item.totalValue)}</span>
        </div>
      </div>

      <div className="item-card__right">
        <span className={`item-card__status-badge ${getStatusBadgeClass(item.status)}`}>
          <span className="item-card__status-icon">{getStatusIcon(item.status)}</span>
          <span className="item-card__status-text">{item.status}</span>
        </span>

        <div className="item-card__actions">
          <button
            className="item-card__action-btn item-card__action-btn--edit"
            onClick={goEdit}
            aria-label={`Edit ${item.name}`}
            title="Edit"
            disabled={deleting}
          >
            <FiEdit2 />
          </button>
          <button
            className="item-card__action-btn item-card__action-btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${item.name}`}
            title={deleting ? "Deleting..." : "Delete"}
            disabled={deleting}
          >
            <FiTrash2 />
          </button>
          <button
            className="item-card__view-btn"
            onClick={goView}
            aria-label={`View ${item.name}`}
            title="View details"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard