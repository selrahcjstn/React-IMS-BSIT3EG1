import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../../../firebase/config";
import InventoryCard from "../../../../components/inventory/inventory-list-card/InventoryListCard";
import "./inventory-list.css";

function InventoryList() {
  const { currentUser } = useAuth();
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (val) => {
    if (val == null) return "-";
    const num = typeof val === "number" ? val : Number(val);
    if (Number.isNaN(num)) return "-";
    const d = new Date(num);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString();
  };

  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(
      ref(database, "inventories"),
      orderByChild("ownerId"),
      equalTo(currentUser.uid)
    );

    const unsubscribe = onValue(
      q,
      (snap) => {
        const data = snap.val();
        if (!data) {
          setInventories([]);
        } else {
          const list = Object.entries(data).map(([id, inv]) => ({
            id,
            ...inv,
          }));
            list.sort((a, b) => {
              const ua = typeof a.updatedAt === "number" ? a.updatedAt : (typeof a.createdAt === "number" ? a.createdAt : 0);
              const ub = typeof b.updatedAt === "number" ? b.updatedAt : (typeof b.createdAt === "number" ? b.createdAt : 0);
              return ub - ua;
            });
          setInventories(list);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsubscribe();
  }, [currentUser?.uid]);

  if (loading) {
    return (
      <div className="inventory__list">
        <InventoryCard
          loading
          name="Loading..."
          category="—"
          itemCount={null}
          totalValue={null}
          createdAt={null}
          updatedAt={null}
        />
      </div>
    );
  }

  if (!inventories.length) {
    return (
      <div className="inventory__list">
        <div className="inventory__empty">No inventories yet.</div>
      </div>
    );
  }

  return (
    <div className="inventory__list">
      {inventories.map((inv) => (
        <InventoryCard
          key={inv.id}
          id={inv.id}
          name={inv.name || "Untitled"}
          category={inv.category || "Uncategorized"}
          itemCount={inv.itemCount ?? 0}
          totalValue={inv.totalValue ?? 0}
          createdAt={formatDate(inv.createdAt ?? inv.timestamp)}
          updatedAt={formatDate(inv.updatedAt ?? inv.timestamp)}
        />
      ))}
    </div>
  );
}

export default InventoryList;