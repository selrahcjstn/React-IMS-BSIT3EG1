import InventoryFormFields from "../../../../components/inventory/inventory-form-fields/InventoryFormFields";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../../../context/AuthContext";
import { ref, push, update, serverTimestamp } from "firebase/database";
import { database } from "../../../../firebase/config";
import "./new-inventory-modal.css";

function NewInventoryModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", description: "", category: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!error || !error.code) return "Failed to create inventory.";
    switch (error.code) {
      case "PERMISSION_DENIED": return "Permission denied by security rules.";
      case "NETWORK_ERROR": return "Network error. Check your connection.";
      default: return error.message || "Failed to create inventory.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!currentUser) {
      setErrors({ submit: "You must be logged in to create an inventory" });
      return;
    }
    setIsSubmitting(true);
    try {
      const invRef = push(ref(database, "inventories"));
      const inventoryId = invRef.key;

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

      // No inventoryItems path here
      const updates = {
        [`inventories/${inventoryId}`]: summary,
        [`userInventories/${currentUser.uid}/${inventoryId}`]: true
      };
      await update(ref(database), updates);

      onSubmit?.({ id: inventoryId, ...summary });
      setFormData({ name: "", description: "", category: "" });
      setErrors({});
      onClose();
    } catch (err) {
      setErrors({ submit: getErrorMessage(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "", category: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="new-inventory-modal__overlay" onClick={handleCancel} />
      <div className="new-inventory-modal__container">
        <div className="new-inventory-modal__header">
          <h2 className="new-inventory-modal__title">Create New Inventory</h2>
          <button className="new-inventory-modal__close-btn" onClick={handleCancel} aria-label="Close modal">
            <FiX />
          </button>
        </div>
        <div className="new-inventory-modal__content">
          <form className="new-inventory-modal__form" onSubmit={handleSubmit}>
            <InventoryFormFields
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
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
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="new-inventory-modal__btn new-inventory-modal__btn--submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewInventoryModal;