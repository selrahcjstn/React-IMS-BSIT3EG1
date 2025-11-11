import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";
import EditInventoryModal from "../../../features/app/inventory/edit-inventory-modal/EditInventoryModal";
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
  onDelete
}) {
  const { currentUser } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    if (loading || deleting) return;
    const ok = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!ok) return;

    try {
      setDeleting(true);
      const uid = currentUser?.uid;
      const updates = {
        [`inventories/${id}`]: null,
        ...(uid ? { [`userInventories/${uid}/${id}`]: null } : {}),
        [`inventoryItems/${id}`]: null
      };
      await update(ref(database), updates);
      if (typeof onDelete === "function") onDelete(id);
    } catch (err) {
      alert(err?.message || "Failed to delete inventory.");
    } finally {
      setDeleting(false);
    }
  };

  const openEdit = () => {
    if (loading || deleting) return;
    setIsEditOpen(true);
  };

  const closeEdit = () => setIsEditOpen(false);

  return (
    <>
      <div className="inventory__item">
        <div className="inventory__item-container">
          <div className="inventory__item-header">
            <h3 className="inventory__item-name">{name}</h3>
            <div className="inventory__header-right">
              <span className="inventory__item-tag">{category}</span>
              <div className="inventory__item-actions">
                <button
                  type="button"
                  className="inventory__icon-btn inventory__icon-btn--edit"
                  aria-label={`Edit inventory ${name}`}
                  onClick={openEdit}
                  disabled={loading || deleting}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="inventory__icon-btn inventory__icon-btn--delete"
                  aria-label={`Delete inventory ${name}`}
                  onClick={handleDelete}
                  disabled={loading || deleting}
                  title={deleting ? "Deleting..." : "Delete"}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
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
                  ? `₱ ${totalValue.toLocaleString()}`
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

      <EditInventoryModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        onSubmit={closeEdit}
        inventoryId={id}
        inventoryData={{ name, category }}
      />
    </>
  );
}

export default InventoryCard;