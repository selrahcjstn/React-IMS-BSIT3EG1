import InventoryFormFields from "../../../../components/inventory/inventory-form-fields/InventoryFormFields";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import "./new-inventory-modal.css";

function NewInventoryModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Inventory name is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("Submitting inventory:", formData);

      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Call parent onSubmit callback
      if (onSubmit) {
        onSubmit(formData);
      }

      // Reset form and close modal
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating inventory:", error);
      setErrors({ submit: "Failed to create inventory. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
    });
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