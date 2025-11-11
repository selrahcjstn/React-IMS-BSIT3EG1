import { useState } from "react"
import { Link } from "react-router-dom"
import { FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi"
import { ref, update } from "firebase/database"
import { database } from "../../../firebase/config"
import { useAuth } from "../../../context/AuthContext"
import EditInventoryModal from "../../../features/app/inventory/edit-inventory-modal/EditInventoryModal"
import "./inventory-card.css"

function InventoryCard({
  id,
  name,
  category,
  itemCount,
  totalValue,
  createdAt,
  updatedAt,
  loading = false,
  onDelete
}) {
  const { currentUser } = useAuth()
  const [deleting, setDeleting] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = async () => {
    if (loading || deleting) return
    const ok = window.confirm(`Delete "${name}"? This cannot be undone.`)
    if (!ok) return

    try {
      setDeleting(true)
      const uid = currentUser?.uid
      const updates = {
        [`inventories/${id}`]: null,
        ...(uid ? { [`userInventories/${uid}/${id}`]: null } : {}),
        [`inventoryItems/${id}`]: null
      }
      await update(ref(database), updates)
      if (typeof onDelete === "function") onDelete(id)
    } catch (err) {
      alert(err?.message || "Failed to delete inventory.")
    } finally {
      setDeleting(false)
    }
  }

  const openEdit = () => {
    if (loading || deleting) return
    setIsEditOpen(true)
  }

  const closeEdit = () => setIsEditOpen(false)

  const isDisabled = loading || deleting

  return (
    <>
      <div className={`inventory__card ${isDisabled ? 'inventory__card--disabled' : ''}`}>
        
        <div className="inventory__card-header">
          <div className="inventory__card-title-wrapper">
            <h3 className="inventory__card-title" title={name}>{name}</h3>
            <span className="inventory__card-category">{category}</span>
          </div>
          
          <div className="inventory__card-actions">
            <button
              type="button"
              className="inventory__action-btn inventory__action-btn--edit"
              aria-label={`Edit ${name}`}
              onClick={openEdit}
              disabled={isDisabled}
              title="Edit inventory"
            >
              <FiEdit2 />
            </button>
            <button
              type="button"
              className="inventory__action-btn inventory__action-btn--delete"
              aria-label={`Delete ${name}`}
              onClick={handleDelete}
              disabled={isDisabled}
              title={deleting ? "Deleting..." : "Delete inventory"}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        <div className="inventory__card-content">
          <div className="inventory__stat-row">
            <div className="inventory__stat">
              <span className="inventory__stat-label">Total Items</span>
              <span className="inventory__stat-value">{loading ? "—" : itemCount}</span>
            </div>
            <div className="inventory__stat inventory__stat--highlight">
              <span className="inventory__stat-label">Total Value</span>
              <span className="inventory__stat-value">
                {loading ? "—" : typeof totalValue === "number" ? `₱${totalValue.toLocaleString()}` : "-"}
              </span>
            </div>
          </div>

          <div className="inventory__dates-row">
            <div className="inventory__date-item">
              <span className="inventory__date-label">Created</span>
              <span className="inventory__date-value">{loading ? "—" : createdAt}</span>
            </div>
            <div className="inventory__date-item">
              <span className="inventory__date-label">Updated</span>
              <span className="inventory__date-value">{loading ? "—" : updatedAt}</span>
            </div>
          </div>
        </div>

        <div className="inventory__card-footer">
          {loading ? (
            <div className="inventory__card-link inventory__card-link--disabled">
              <span>View Details</span>
              <FiChevronRight />
            </div>
          ) : (
            <Link
              to={`/inventory/items/${id}`}
              className="inventory__card-link"
              aria-label={`View ${name} details`}
            >
              <span>View Details</span>
              <FiChevronRight />
            </Link>
          )}
        </div>
      </div>

      <EditInventoryModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        onSubmit={closeEdit}
        inventoryId={id}
        inventoryData={{ name, category }}
      />
    </>
  )
}

export default InventoryCard