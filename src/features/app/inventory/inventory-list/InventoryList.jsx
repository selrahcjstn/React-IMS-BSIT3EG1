import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { ref, onValue } from "firebase/database";
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

    const userInvRef = ref(database, `userInventories/${currentUser.uid}`);
    const invUnsubs = new Map();

    const unsubscribeUserIndex = onValue(
      userInvRef,
      (snap) => {
        const idsObj = snap.val() || {};
        const ids = Object.keys(idsObj);

        // Remove listeners for deleted inventories
        for (const [id, unsub] of invUnsubs.entries()) {
          if (!ids.includes(id)) {
            try {
              unsub();
            } catch (err) {
              console.error("Error unsubscribing inventory listener:", err);
            }
            invUnsubs.delete(id);
          }
        }

        if (ids.length === 0) {
          setInventories([]);
          setLoading(false);
          return;
        }

        ids.forEach((id) => {
          if (invUnsubs.has(id)) return;

          const invRef = ref(database, `inventories/${id}`);

          const unsub = onValue(
            invRef,
            (invSnap) => {
              const inv = invSnap.val();

              setInventories((prev) => {
                const map = new Map(prev.map((i) => [i.id, i]));

                if (inv) {
                  map.set(id, { id, ...inv });
                } else {
                  map.delete(id);
                }

                const list = Array.from(map.values());
                list.sort((a, b) => {
                  const aTime =
                    typeof a.updatedAt === "number"
                      ? a.updatedAt
                      : typeof a.createdAt === "number"
                      ? a.createdAt
                      : 0;
                  const bTime =
                    typeof b.updatedAt === "number"
                      ? b.updatedAt
                      : typeof b.createdAt === "number"
                      ? b.createdAt
                      : 0;
                  return bTime - aTime;
                });

                return list;
              });

              setLoading(false);
            },
            () => setLoading(false)
          );

          invUnsubs.set(id, unsub);
        });
      },
      () => setLoading(false)
    );

    return () => {
      try {
        unsubscribeUserIndex();
      } catch (err) {
        console.error("Error unsubscribing user index listener:", err);
      }

      for (const unsub of invUnsubs.values()) {
        try {
          unsub();
        } catch (err) {
          console.error("Error unsubscribing inventory item listener:", err);
        }
      }

      invUnsubs.clear();
    };
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
          itemCount={typeof inv.itemCount === "number" ? inv.itemCount : 0}
          totalValue={typeof inv.totalValue === "number" ? inv.totalValue : 0}
          createdAt={formatDate(inv.createdAt ?? inv.timestamp)}
          updatedAt={formatDate(inv.updatedAt ?? inv.timestamp)}
        />
      ))}
    </div>
  );
}

export default InventoryList;
