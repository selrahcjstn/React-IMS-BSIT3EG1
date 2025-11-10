import { useEffect, useState } from "react";
import { ref, onValue, get } from "firebase/database";
import { database } from "../../../../firebase/config";
import { useAuth } from "../../../../context/AuthContext";
import "./dashboard-box-container.css";
import DashboardBox from "../../../../components/inventory/dashboard-box/DashboardBox";
import { FaBoxes, FaCoins, FaExclamationTriangle, FaLayerGroup } from "react-icons/fa";

function DashboardBoxContainer() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalQuantity: 0,
    totalValue: 0,
    lowStockCount: 0,
    inventoryCount: 0,
  });

  useEffect(() => {
    if (!currentUser?.uid) return;
    let cancelled = false;

    const userInvRef = ref(database, `userInventories/${currentUser.uid}`);
    const off = onValue(
      userInvRef,
      async (snap) => {
        try {
          const idsObj = snap.val() || {};
          const ids = Object.keys(idsObj);
          const inventoryCount = ids.length;

            // Early exit if no inventories
          if (inventoryCount === 0) {
            if (!cancelled) {
              setMetrics({
                totalQuantity: 0,
                totalValue: 0,
                lowStockCount: 0,
                inventoryCount: 0,
              });
              setLoading(false);
            }
            return;
          }

          // Fetch items for each inventory and compute totals
          const itemSnaps = await Promise.all(
            ids.map((id) => get(ref(database, `inventoryItems/${id}`)))
          );

          let totalQuantity = 0;
          let totalValue = 0;
          let lowStockCount = 0;

          for (const s of itemSnaps) {
            const items = s.val() || {};
            for (const item of Object.values(items)) {
              const qty = Number(item?.quantity) || 0;
              const price =
                item?.price != null
                  ? Number(item.price)
                  : item?.unitPrice != null
                  ? Number(item.unitPrice)
                  : 0;

              // Prefer stored total fields; fallback to qty * price
              const rawTotal =
                item?.total != null
                  ? Number(item.total)
                  : item?.totalValue != null
                  ? Number(item.totalValue)
                  : qty * price;

              const itemTotal = Number.isFinite(rawTotal) ? rawTotal : 0;

              totalQuantity += qty;
              totalValue += itemTotal;
              if (qty <= 3) lowStockCount += 1;
            }
          }

          if (!cancelled) {
            setMetrics({
              totalQuantity,
              totalValue,
              lowStockCount,
              inventoryCount,
            });
          }
        } catch {
          if (!cancelled) {
            setMetrics({
              totalQuantity: 0,
              totalValue: 0,
              lowStockCount: 0,
              inventoryCount: 0,
            });
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      },
      () => {
        if (!cancelled) setLoading(false);
      }
    );

    return () => {
      cancelled = true;
      try {
        off();
      } catch (error) {
        console.error(error);
      }
    };
  }, [currentUser?.uid]);

  const formatCurrency = (val) =>
    "₱" +
    Number(val || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="dashboard__box-container">
      <DashboardBox
        title="Inventories Owned"
        value={loading ? "…" : String(metrics.inventoryCount)}
        icon={<FaLayerGroup />}
        iconClass="dashboard__box-icon--inventories"
      />

      <DashboardBox
        title="Item Quantity"
        value={loading ? "…" : String(metrics.totalQuantity)}
        icon={<FaBoxes />}
      />

      <DashboardBox
        title="Overall Value"
        value={loading ? "…" : formatCurrency(metrics.totalValue)}
        icon={<FaCoins />}
        iconClass="dashboard__box-icon--money"
      />

      <DashboardBox
        title="Low Stocks"
        value={loading ? "…" : String(metrics.lowStockCount)}
        icon={<FaExclamationTriangle />}
        iconClass="dashboard__box-icon--alert"
      />
    </div>
  );
}

export default DashboardBoxContainer;