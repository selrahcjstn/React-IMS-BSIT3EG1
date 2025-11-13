import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ref,
  push,
  serverTimestamp,
  runTransaction,
  update,
  get
} from "firebase/database";
import { database } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import AddNewItemHeader from "../../features/app/items/add-new-item-header/AddNewItemHeader";
import AddNewItemForm from "../../features/app/items/add-new-item-form/AddNewItemForm";
import "./add-new-item.css";

function AddNewItem() {
  const { id: inventoryId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { currentUser } = useAuth();

  const [inventoryName, setInventoryName] = useState(state?.inventoryName || "");
  const [formData, setFormData] = useState({
    title: "",
    dimensionType: "single",
    dimension1: "",
    dimension2: "",
    dimension3: "",
    quantity: "",
    price: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadName() {
      if (!inventoryId || inventoryName) return;
      const snap = await get(ref(database, `inventories/${inventoryId}`));
      if (!active) return;
      const inv = snap.val();
      setInventoryName(inv?.name || "");
    }
    loadName();
    return () => {
      active = false;
    };
  }, [inventoryId, inventoryName]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const onDimensionTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      dimensionType: type,
      dimension1: "",
      dimension2: "",
      dimension3: ""
    }));
  };

  const calculateTotal = () => {
    const qty = parseFloat(formData.quantity) || 0;
    const price = parseFloat(formData.price) || 0;
    return (qty * price).toFixed(2);
  };

  const validate = () => {
    const newErrors = {};
    if (!inventoryId) newErrors.submit = "Missing inventory id.";
    if (!currentUser?.uid) newErrors.submit = "You must be logged in.";
    if (!formData.title.trim()) newErrors.title = "Item title is required.";
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) newErrors.quantity = "Quantity must be > 0.";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Unit price must be > 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    if (!error?.code) return "Failed to add item.";
    switch (error.code) {
      case "PERMISSION_DENIED":
        return "Permission denied by security rules.";
      case "NETWORK_ERROR":
        return "Network error. Check your connection.";
      default:
        return error.message || "Failed to add item.";
    }
  };

  const buildDimensions = () => {
    const { dimensionType, dimension1, dimension2, dimension3 } = formData;
    const out = [];
    if (dimensionType === "single") {
      if (dimension1 !== "") out.push(parseFloat(dimension1));
    } else if (dimensionType === "2x") {
      if (dimension1 !== "") out.push(parseFloat(dimension1));
      if (dimension2 !== "") out.push(parseFloat(dimension2));
    } else if (dimensionType === "3x") {
      if (dimension1 !== "") out.push(parseFloat(dimension1));
      if (dimension2 !== "") out.push(parseFloat(parseFloat(dimension2)));
      if (dimension3 !== "") out.push(parseFloat(dimension3));
    }
    return out;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      dimensionType: "single",
      dimension1: "",
      dimension2: "",
      dimension3: "",
      quantity: "",
      price: ""
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const invSnap = await get(ref(database, `inventories/${inventoryId}`));
      if (!invSnap.exists()) {
        setErrors({ submit: "Inventory not found." });
        setIsSubmitting(false);
        return;
      }
      const invData = invSnap.val();
      if (invData.ownerId && invData.ownerId !== currentUser.uid) {
        setErrors({ submit: "You do not own this inventory." });
        setIsSubmitting(false);
        return;
      }

      const quantityNum = parseFloat(formData.quantity);
      const priceNum = parseFloat(formData.price);
      const totalNum = parseFloat(calculateTotal());
      const dims = buildDimensions();

      const itemData = {
        title: formData.title.trim(),
        dimensionType: formData.dimensionType,
        dimensions: dims,
        quantity: quantityNum,
        price: priceNum,
        total: totalNum,
        inventoryId,
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const itemListRef = ref(database, `inventoryItems/${inventoryId}`);
      const newItemRef = push(itemListRef);
      const itemId = newItemRef.key;

      await update(ref(database), {
        [`inventoryItems/${inventoryId}/${itemId}`]: itemData
      });

      await runTransaction(ref(database, `inventories/${inventoryId}/itemCount`), current => {
        if (typeof current === "number") return current + 1;
        return 1;
      });

      resetForm();
      navigate(`/inventory/items/${inventoryId}`);
    } catch (error) {
      setErrors({ submit: getErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate(-1);
  };

  return (
    <div className="add-new-item">
      <AddNewItemHeader title={"Add New Item"} action={"Add"} onBack={handleCancel} inventoryName={inventoryName || inventoryId} />
      <AddNewItemForm
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        onChange={onChange}
        onDimensionTypeChange={onDimensionTypeChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        calculateTotal={calculateTotal}
      />
    </div>
  );
}

export default AddNewItem;