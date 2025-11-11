import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../../../../firebase/config";
import ItemCard from "../../../../components/inventory/ItemCard/ItemCard";
import EmptyState from "../../../../components/inventory/empty-state/EmptyState";
import illustration from "../../../../assets/app/welcome.svg";
import "./item-list.css";

function ItemList() {
  const { id: inventoryId } = useParams();
  const navigate = useNavigate();
  const [inventoryName, setInventoryName] = useState("Inventory");
  const [items, setItems] = useState([]);
  const [loadingInv, setLoadingInv] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (val) => {
    if (val == null) return "-";
    const num = typeof val === "number" ? val : Number(val);
    if (Number.isNaN(num)) return "-";
    const d = new Date(num);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString();
  };

  const formatDimensions = (dims) => {
    if (!Array.isArray(dims) || !dims.length) return "-";
    return dims.map((n) => `${n}cm`).join(" x ");
  };

  const computeStatus = (q) => {
    const qty = Number(q) || 0;
    if (qty <= 0) return "Out of Stock";
    if (qty < 10) return "Low Stock";
    return "In Stock";
  };

  const handleAddItem = () => {
    navigate(`/inventory/${inventoryId}/items/new`);
  };

  useEffect(() => {
    if (!inventoryId) return;

    const invRef = ref(database, `inventories/${inventoryId}`);
    const itemsRef = ref(database, `inventoryItems/${inventoryId}`);

    const unsubInv = onValue(
      invRef,
      (snap) => {
        const inv = snap.val();
        setInventoryName(inv?.name || "Inventory");
        setLoadingInv(false);
      },
      (err) => {
        console.error("Error loading inventory details:", err);
        setError(err?.message || "Failed to load inventory.");
        setLoadingInv(false);
      }
    );

    const unsubItems = onValue(
      itemsRef,
      (snap) => {
        const data = snap.val() || {};
        const list = Object.entries(data).map(([id, it]) => {
          const quantity = Number(it.quantity) || 0;
          const price = Number(it.price) || 0;
          const total = Number((quantity * price).toFixed(2));

          return {
            id,
            name: it.title || "Untitled",
            quantity,
            unitPrice: price,
            totalValue: total,
            status: computeStatus(quantity),
            size: formatDimensions(it.dimensions),
            lastUpdated: formatDate(it.updatedAt ?? it.createdAt),
            createdAt: formatDate(it.createdAt)
          };
        });

        list.sort((a, b) => {
          const aTime = new Date(a.lastUpdated).getTime() || 0;
          const bTime = new Date(b.lastUpdated).getTime() || 0;
          return bTime - aTime;
        });

        setItems(list);
        setLoadingItems(false);
      },
      (err) => {
        console.error("Error loading inventory items:", err);
        setError(err?.message || "Failed to load items.");
        setLoadingItems(false);
      }
    );

    return () => {
      try {
        unsubInv();
      } catch (err) {
        console.error("Error unsubscribing inventory listener:", err);
      }

      try {
        unsubItems();
      } catch (err) {
        console.error("Error unsubscribing inventory items listener:", err);
      }
    };
  }, [inventoryId]);

  const handleEditItem = (id) => {
    console.log("Edit item:", id);
  };

  const handleDeleteItem = (id) => {
    console.log("Delete item:", id);
  };

  const loading = loadingInv || loadingItems;

  if (loading) {
    return (
      <div className="itemlist">
        <h2 className="itemlist__title">{inventoryName}</h2>
        <div className="itemlist__empty">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="itemlist">
        <h2 className="itemlist__title">{inventoryName}</h2>
        <div className="itemlist__empty">{error}</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="itemlist">
        <h2 className="itemlist__title">{inventoryName}</h2>
        <EmptyState
          icon={illustration}
          title="No items yet"
          description="Start adding items to your inventory to track their quantities, prices, and values."
          buttonText="Add Your First Item"
          buttonAriaLabel="Add your first item"
          onButtonClick={handleAddItem}
        />
      </div>
    );
  }

  return (
    <div className="itemlist">
      <h2 className="itemlist__title">{inventoryName}</h2>
      <div className="itemlist__grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;