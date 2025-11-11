import InventoryFormFields from "../../../../components/inventory/inventory-form-fields/InventoryFormFields";
import ModalHeader from "../../../../components/inventory/modal-header/ModalHeader";
import InventoryQuotaInfo from "../../../../components/inventory/inventory-quoata-info/InventoryQuotaInfo";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { ref, push, update, serverTimestamp, get } from "firebase/database";
import { database } from "../../../../firebase/config";
import "./edit-inventory-modal.css";

function EditInventoryModal({
  isOpen,
  onClose,
  onSubmit,
  inventoryId,
  inventoryData
}) {
  const { currentUser } = useAuth();
  const isEdit = Boolean(inventoryId);
  const [formData, setFormData] = useState({ name: "", description: "", category: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPrefill, setLoadingPrefill] = useState(false);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [, setLoadingCount] = useState(false);
  
  const MAX_INVENTORIES = 12;
  const MAX_NAME_LENGTH = 50;
  const MAX_DESCRIPTION_LENGTH = 500;

  useEffect(() => {
    if (!isOpen || !currentUser?.uid || isEdit) return;

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
  }, [isOpen, currentUser?.uid, isEdit]);

  useEffect(() => {
    if (!isOpen) return;
    if (!isEdit) {
      setFormData({ name: "", description: "", category: "" });
      setErrors({});
      return;
    }

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

    if (!isEdit && inventoryCount >= MAX_INVENTORIES) {
      newErrors.submit = `You have reached the maximum limit of ${MAX_INVENTORIES} inventories. Please delete some inventories to create new ones.`;
    }

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

  const isLimitReached = !isEdit && inventoryCount >= MAX_INVENTORIES;

  return (
    <>
      <div className="edit-inventory-modal__overlay" onClick={handleCancel} />
      <div className="edit-inventory-modal__container">
        <ModalHeader
          title={isEdit ? "Edit Inventory" : "Create New Inventory"}
          onBack={handleCancel}
          onClose={handleCancel}
        />

        {!isEdit && (
          <InventoryQuotaInfo
            inventoryCount={inventoryCount}
            maxInventories={MAX_INVENTORIES}
          />
        )}

        <div className="edit-inventory-modal__content">
          {isLimitReached && (
            <div className="edit-inventory-modal__alert edit-inventory-modal__alert--warning">
              ⚠️ You've reached your inventory limit. Delete some inventories to create new ones.
            </div>
          )}

          {loadingPrefill && (
            <div className="edit-inventory-modal__alert edit-inventory-modal__alert--info">
              Loading inventory details...
            </div>
          )}

          <form className="edit-inventory-modal__form" onSubmit={handleSubmit}>
            <InventoryFormFields
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting || loadingPrefill}
              onChange={handleChange}
              maxNameLength={MAX_NAME_LENGTH}
              maxDescriptionLength={MAX_DESCRIPTION_LENGTH}
            />
            {errors.submit && (
              <div className="edit-inventory-modal__alert edit-inventory-modal__alert--error">
                {errors.submit}
              </div>
            )}
            <div className="edit-inventory-modal__form-actions">
              <button
                type="button"
                className="edit-inventory-modal__btn edit-inventory-modal__btn--cancel"
                onClick={handleCancel}
                disabled={isSubmitting || loadingPrefill}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="edit-inventory-modal__btn edit-inventory-modal__btn--submit"
                disabled={isSubmitting || loadingPrefill || isLimitReached}
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