import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { ref, onValue } from "firebase/database";
import { database } from "../../../../firebase/config";
import InventoryCard from "../../../../components/inventory/inventory-list-card/InventoryListCard";
import EmptyState from "../../../../components/inventory/empty-state/EmptyState";
import NewInventoryModal from "../new-inventory-modal/NewInventoryModal";
import illustration from "../../../../assets/app/welcome.svg";
import "./inventory-list.css";

function InventoryList() {
  const { currentUser } = useAuth();
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (val) => {
    if (val == null) return "-";
    const num = typeof val === "number" ? val : Number(val);
    if (!Number.isFinite(num)) return "-";
    const d = new Date(num);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateInventory = (formData) => {
    console.log("New inventory created:", formData);
    handleCloseModal();
  };

  useEffect(() => {
    if (!currentUser?.uid) return;

    const userInvRef = ref(database, `userInventories/${currentUser.uid}`);
    const invUnsubs = new Map();
    const itemUnsubs = new Map();

    const unsubscribeUserIndex = onValue(
      userInvRef,
      (snap) => {
        const idsObj = snap.val() || {};
        const ids = Object.keys(idsObj);

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

        for (const [id, unsub] of itemUnsubs.entries()) {
          if (!ids.includes(id)) {
            try {
              unsub();
            } catch (err) {
              console.error("Error unsubscribing items listener:", err);
            }
            itemUnsubs.delete(id);
          }
        }

        if (ids.length === 0) {
          setInventories([]);
          setLoading(false);
          return;
        }

        ids.forEach((id) => {
          if (!invUnsubs.has(id)) {
            const invRef = ref(database, `inventories/${id}`);
            const unsubInv = onValue(
              invRef,
              (invSnap) => {
                const inv = invSnap.val();
                setInventories((prev) => {
                  const map = new Map(prev.map((i) => [i.id, i]));
                  const existing = map.get(id) || { id };

                  if (inv) {
                    const next = {
                      ...existing,
                      id,
                      name: inv.name,
                      category: inv.category,
                      itemCount: typeof inv.itemCount === "number" ? inv.itemCount : existing.itemCount ?? 0,
                      createdAt: inv.createdAt,
                      updatedAt: inv.updatedAt
                    };
                    map.set(id, next);
                  } else {
                    map.delete(id);
                  }

                  const list = Array.from(map.values());
                  list.sort((a, b) => {
                    const aTime = a.updatedAt ?? a.createdAt ?? 0;
                    const bTime = b.updatedAt ?? b.createdAt ?? 0;
                    return bTime - aTime;
                  });

                  return list;
                });
                setLoading(false);
              },
              (err) => {
                console.error("Error loading inventory data:", err);
                setLoading(false);
              }
            );
            invUnsubs.set(id, unsubInv);
          }

          if (!itemUnsubs.has(id)) {
            const itemsRef = ref(database, `inventoryItems/${id}`);
            const unsubItems = onValue(
              itemsRef,
              (itemsSnap) => {
                const items = itemsSnap.val() || {};
                let sum = 0;

                for (const it of Object.values(items)) {
                  const q = Number(it.quantity) || 0;
                  const p = Number(it.price) || 0;
                  const t = Number(it.total) || (q * p);
                  if (Number.isFinite(t)) sum += t;
                }

                const total = Math.round(sum * 100) / 100;

                setInventories((prev) => {
                  const map = new Map(prev.map((i) => [i.id, i]));
                  const existing = map.get(id) || { id };
                  map.set(id, { ...existing, totalValue: total });

                  const list = Array.from(map.values());
                  list.sort((a, b) => {
                    const aTime = a.updatedAt ?? a.createdAt ?? 0;
                    const bTime = b.updatedAt ?? b.createdAt ?? 0;
                    return bTime - aTime;
                  });

                  return list;
                });

                setLoading(false);
              },
              (err) => {
                console.error("Error loading inventory item totals:", err);
                setLoading(false);
              }
            );
            itemUnsubs.set(id, unsubItems);
          }
        });
      },
      (err) => {
        console.error("Error loading user inventory index:", err);
        setLoading(false);
      }
    );

    return () => {
      try {
        unsubscribeUserIndex();
      } catch (err) {
        console.error("Error unsubscribing user index:", err);
      }

      for (const unsub of invUnsubs.values()) {
        try {
          unsub();
        } catch (err) {
          console.error("Error unsubscribing inventory listener:", err);
        }
      }

      for (const unsub of itemUnsubs.values()) {
        try {
          unsub();
        } catch (err) {
          console.error("Error unsubscribing item listener:", err);
        }
      }

      invUnsubs.clear();
      itemUnsubs.clear();
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
      <>
        <EmptyState
          icon={illustration}
          title="No inventories yet"
          description="Create your first inventory to start managing your items and track their values."
          buttonText="Create Your First Inventory"
          buttonAriaLabel="Create your first inventory"
          onButtonClick={handleOpenModal}
        />
        <NewInventoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateInventory}
        />
      </>
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