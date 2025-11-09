import InventoryFormFields from "../../../../components/inventory/inventory-form-fields/InventoryFormFields";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../../../context/AuthContext";
import { ref, push, update, serverTimestamp, get } from "firebase/database";
import { database } from "../../../../firebase/config";
import "./edit-inventory-modal.css";

function EditInventoryModal({
  isOpen,
  onClose,
  onSubmit,
  inventoryId,        // if provided -> edit mode
  inventoryData        // optional initial data { name, description, category }
}) {
  const { currentUser } = useAuth();
  const isEdit = Boolean(inventoryId);
  const [formData, setFormData] = useState({ name: "", description: "", category: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPrefill, setLoadingPrefill] = useState(false);

  // Prefill when entering edit mode
  useEffect(() => {
    if (!isOpen) return;
    if (!isEdit) {
      setFormData({ name: "", description: "", category: "" });
      setErrors({});
      return;
    }

    // If inventoryData passed in, use it; otherwise fetch from DB
    async function preload() {
      setLoadingPrefill(true);
      try {
        if (inventoryData && inventoryData.name) {
          setFormData({
            name: inventoryData.name || "",
            description: inventoryData.description || "",
            category: inventoryData.category || ""
          });
        } else {
          const snap = await get(ref(database, `inventories/${inventoryId}`));
          if (snap.exists()) {
            const inv = snap.val();
            setFormData({
              name: inv.name || "",
              description: inv.description || "",
              category: inv.category || ""
            });
          } else {
            setErrors({ submit: "Inventory not found." });
          }
        }
      } catch (e) {
        setErrors({ submit: e.message || "Failed to load inventory." });
      } finally {
        setLoadingPrefill(false);
      }
    }
    preload();
  }, [isOpen, isEdit, inventoryId, inventoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Inventory name is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    if (!error || !error.code) return isEdit ? "Failed to update inventory." : "Failed to create inventory.";
    switch (error.code) {
      case "PERMISSION_DENIED": return "Permission denied by security rules.";
      case "NETWORK_ERROR": return "Network error. Check your connection.";
      default: return error.message || (isEdit ? "Failed to update inventory." : "Failed to create inventory.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!currentUser) {
      setErrors({ submit: "You must be logged in." });
      return;
    }
    setIsSubmitting(true);

    try {
      if (!isEdit) {
        // CREATE MODE
        const invRef = push(ref(database, "inventories"));
        const newId = invRef.key;

        const summary = {
          name: formData.name.trim(),
            category: formData.category,
          description: formData.description.trim(),
          ownerId: currentUser.uid,
          itemCount: 0,
          totalValue: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        const updates = {
          [`inventories/${newId}`]: summary,
          [`userInventories/${currentUser.uid}/${newId}`]: true
        };

        await update(ref(database), updates);
        onSubmit?.({ id: newId, ...summary });
      } else {
        // EDIT MODE
        // Ensure ownership before updating (optional additional check)
        const snap = await get(ref(database, `inventories/${inventoryId}`));
        if (!snap.exists()) {
          setErrors({ submit: "Inventory no longer exists." });
          setIsSubmitting(false);
          return;
        }
        const existing = snap.val();
        if (existing.ownerId !== currentUser.uid) {
          setErrors({ submit: "You do not own this inventory." });
          setIsSubmitting(false);
          return;
        }

        const updatedFields = {
          name: formData.name.trim(),
          category: formData.category,
          description: formData.description.trim(),
          updatedAt: serverTimestamp()
        };

        await update(ref(database), {
          [`inventories/${inventoryId}`]: { ...existing, ...updatedFields }
        });

        onSubmit?.({ id: inventoryId, ...existing, ...updatedFields });
      }

      // Reset only on create (optional on edit)
      if (!isEdit) {
        setFormData({ name: "", description: "", category: "" });
      }
      setErrors({});
      onClose();
    } catch (err) {
      setErrors({ submit: getErrorMessage(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="new-inventory-modal__overlay" onClick={handleCancel} />
      <div className="new-inventory-modal__container">
        <div className="new-inventory-modal__header">
          <h2 className="new-inventory-modal__title">
            {isEdit ? "Edit Inventory" : "Create New Inventory"}
          </h2>
          <button
            className="new-inventory-modal__close-btn"
            onClick={handleCancel}
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>
        <div className="new-inventory-modal__content">
          <form className="new-inventory-modal__form" onSubmit={handleSubmit}>
            <InventoryFormFields
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting || loadingPrefill}
              onChange={handleChange}
            />
            {errors.submit && (
              <div className="new-inventory-modal__alert new-inventory-modal__alert--error">
                {errors.submit}
              </div>
            )}
            <div className="new-inventory-modal__form-actions">
              <button
                type="button"
                className="new-inventory-modal__btn new-inventory-modal__btn--cancel"
                onClick={handleCancel}
                disabled={isSubmitting || loadingPrefill}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="new-inventory-modal__btn new-inventory-modal__btn--submit"
                disabled={isSubmitting || loadingPrefill}
              >
                {isSubmitting || loadingPrefill
                  ? (isEdit ? "Saving..." : "Creating...")
                  : (isEdit ? "Save Changes" : "Create")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditInventoryModal;