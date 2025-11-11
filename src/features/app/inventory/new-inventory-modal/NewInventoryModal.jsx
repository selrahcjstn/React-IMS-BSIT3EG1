import InventoryFormFields from "../../../../components/inventory/inventory-form-fields/InventoryFormFields";
import ModalHeader from "../../../../components/inventory/modal-header/ModalHeader";
import InventoryQuotaInfo from "../../../../components/inventory/inventory-quoata-info/InventoryQuotaInfo";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { ref, push, update, serverTimestamp, get } from "firebase/database";
import { database } from "../../../../firebase/config";
import "./new-inventory-modal.css";

function NewInventoryModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", description: "", category: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(false);
  const MAX_INVENTORIES = 12;
  const MAX_NAME_LENGTH = 50;
  const MAX_DESCRIPTION_LENGTH = 500;

  useEffect(() => {
    if (!isOpen || !currentUser?.uid) return;

    const fetchInventoryCount = async () => {
      setLoadingCount(true);
      try {
        const userInvRef = ref(database, `userInventories/${currentUser.uid}`);
        const snapshot = await get(userInvRef);
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        setInventoryCount(count);
      } catch (err) {
        console.error("Error fetching inventory count:", err);
        setInventoryCount(0);
      } finally {
        setLoadingCount(false);
      }
    };

    fetchInventoryCount();
  }, [isOpen, currentUser?.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let limitedValue = value;
    if (name === "name" && value.length > MAX_NAME_LENGTH) {
      limitedValue = value.substring(0, MAX_NAME_LENGTH);
    }
    if (name === "description" && value.length > MAX_DESCRIPTION_LENGTH) {
      limitedValue = value.substring(0, MAX_DESCRIPTION_LENGTH);
    }

    setFormData(prev => ({ ...prev, [name]: limitedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Inventory name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Inventory name must be at least 3 characters";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (inventoryCount >= MAX_INVENTORIES) {
      newErrors.submit = `You have reached the maximum limit of ${MAX_INVENTORIES} inventories. Please delete some inventories to create new ones.`;
    }

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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

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

  const isLimitReached = inventoryCount >= MAX_INVENTORIES;

  return (
    <>
      <div className="new-inventory-modal__overlay" onClick={handleCancel} />
      <div className="new-inventory-modal__container">
        <ModalHeader 
          title="Create New Inventory" 
          onBack={handleCancel}
          onClose={handleCancel}
        />

        <InventoryQuotaInfo 
          inventoryCount={inventoryCount}
          maxInventories={MAX_INVENTORIES}
        />

        <div className="new-inventory-modal__content">
          {isLimitReached && (
            <div className="new-inventory-modal__alert new-inventory-modal__alert--warning">
              ⚠️ You've reached your inventory limit. Delete some inventories to create new ones.
            </div>
          )}

          <form className="new-inventory-modal__form" onSubmit={handleSubmit}>
            <InventoryFormFields
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              maxNameLength={MAX_NAME_LENGTH}
              maxDescriptionLength={MAX_DESCRIPTION_LENGTH}
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
                disabled={isSubmitting || isLimitReached || loadingCount}
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