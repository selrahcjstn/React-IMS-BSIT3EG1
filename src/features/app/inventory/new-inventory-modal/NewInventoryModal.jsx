import InventoryFormFields from "../../../../components/inventory/inventory-form-fields/InventoryFormFields";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../../../context/AuthContext";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { database } from "../../../../firebase/config";
import "./new-inventory-modal.css";

function NewInventoryModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", description: "", category: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Inventory name is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const inventoryData = {
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const inventoriesRef = ref(database, "inventories");
      const newInventoryRef = push(inventoriesRef);
      await set(newInventoryRef, inventoryData);

      if (onSubmit) {
        // serverTimestamp() resolves on the server; locally we can optimistically
        // return null placeholders for createdAt/updatedAt if needed.
        onSubmit({
          id: newInventoryRef.key,
            ...inventoryData
        });
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating inventory:", error);
      console.error("code:", error.code, "message:", error.message);
      let errorMessage = "Failed to create inventory. Please try again.";
      if (error.code === "PERMISSION_DENIED") errorMessage = "You don't have permission to create an inventory";
      if (error.code === "NETWORK_ERROR") errorMessage = "Network error. Please check your connection";
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", category: "" });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
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