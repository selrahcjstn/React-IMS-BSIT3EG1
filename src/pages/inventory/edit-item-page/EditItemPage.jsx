import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, update, serverTimestamp } from "firebase/database";
import { database } from "../../firebase/config";
import EditItemForm from "../../features/app/items/edit-item-form/EditItemForm";
import AddNewItemHeader from "../../features/app/items/add-new-item-header/AddNewItemHeader";
import { useAuth } from "../../context/AuthContext";

function EditItemPage() {
  const { id: inventoryId, itemId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [inventoryName, setInventoryName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    dimensionType: "single",
    dimension1: "",
    dimension2: "",
    dimension3: "",
    quantity: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [loadingItem, setLoadingItem] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!inventoryId) {
        setErrors({ submit: "Missing inventory id in route." });
        setLoadingItem(false);
        return;
      }
      if (!itemId) {
        setErrors({ submit: "Missing item id in route." });
        setLoadingItem(false);
        return;
      }

      try {
        const invRef = ref(database, `inventories/${inventoryId}`);
        const itemRef = ref(database, `inventoryItems/${inventoryId}/${itemId}`);

        const [invSnap, itemSnap] = await Promise.all([get(invRef), get(itemRef)]);
        if (!active) return;

        if (invSnap.exists()) {
          const inv = invSnap.val();
          setInventoryName(inv?.name || "");
        }

        if (!itemSnap.exists()) {
          setErrors({ submit: "Item not found." });
          setLoadingItem(false);
          return;
        }

        const item = itemSnap.val();
        const dims = Array.isArray(item.dimensions) ? item.dimensions : [];
        let dimensionType = "single";
        if (dims.length === 2) dimensionType = "2x";
        else if (dims.length === 3) dimensionType = "3x";

        setFormData({
          title: item.title || "",
          dimensionType,
          dimension1: dims[0] != null ? String(dims[0]) : "",
          dimension2: dims[1] != null ? String(dims[1]) : "",
          dimension3: dims[2] != null ? String(dims[2]) : "",
          quantity: item.quantity != null ? String(item.quantity) : "",
          price: item.price != null ? String(item.price) : "",
        });
        setErrors({});
      } catch (e) {
        if (active) setErrors({ submit: e.message || "Failed to load item." });
      } finally {
        if (active) setLoadingItem(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [inventoryId, itemId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onDimensionTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      dimensionType: type,
      dimension1: "",
      dimension2: "",
      dimension3: "",
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
    if (!itemId) newErrors.submit = "Missing item id.";
    if (!currentUser?.uid) newErrors.submit = "You must be logged in.";
    if (!formData.title.trim()) newErrors.title = "Item title is required.";
    if (!formData.quantity || parseFloat(formData.quantity) <= 0)
      newErrors.quantity = "Quantity must be > 0.";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Unit price must be > 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildDimensions = () => {
    const dims = [];
    if (formData.dimensionType === "single") {
      if (formData.dimension1 !== "")
        dims.push(parseFloat(formData.dimension1));
    } else if (formData.dimensionType === "2x") {
      if (formData.dimension1 !== "")
        dims.push(parseFloat(formData.dimension1));
      if (formData.dimension2 !== "")
        dims.push(parseFloat(formData.dimension2));
    } else if (formData.dimensionType === "3x") {
      if (formData.dimension1 !== "")
        dims.push(parseFloat(formData.dimension1));
      if (formData.dimension2 !== "")
        dims.push(parseFloat(formData.dimension2));
      if (formData.dimension3 !== "")
        dims.push(parseFloat(formData.dimension3));
    }
    return dims;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const dims = buildDimensions();
      const qty = parseFloat(formData.quantity);
      const price = parseFloat(formData.price);
      const total = parseFloat(calculateTotal());

      const itemPath = `inventoryItems/${inventoryId}/${itemId}`;
      await update(ref(database), {
        [`${itemPath}/title`]: formData.title.trim(),
        [`${itemPath}/dimensionType`]: formData.dimensionType,
        [`${itemPath}/dimensions`]: dims,
        [`${itemPath}/quantity`]: qty,
        [`${itemPath}/price`]: price,
        [`${itemPath}/total`]: total,
        [`${itemPath}/updatedAt`]: serverTimestamp(),
      });

      navigate(`/inventory/items/${inventoryId}`);
    } catch (err) {
      setErrors({ submit: err.message || "Failed to update item." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loadingItem) {
    return <div className="add-new-item__content">Loading item...</div>;
  }

  return (
    <>
      <AddNewItemHeader
        title="Edit Item"
        action="Edit"
        onBack={handleCancel}
        inventoryName={inventoryName || inventoryId}
      />
      <EditItemForm
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        onChange={onChange}
        onDimensionTypeChange={onDimensionTypeChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        calculateTotal={calculateTotal}
      />
    </>
  );
}

export default EditItemPage;