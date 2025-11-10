import { useEffect, useState, useCallback } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../../../firebase/config";
import { useAuth } from "../../../../context/AuthContext";
import { FaSync } from "react-icons/fa";
import "./recent-activity.css";

const INITIAL_VISIBLE = 5;
const MAX_VISIBLE = 10;

function RecentActivity() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]); // limited to MAX_VISIBLE
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const formatDate = (ms) => {
    if (!ms || !Number.isFinite(ms)) return "—";
    return new Date(ms).toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const load = useCallback(async () => {
    if (!currentUser?.uid) return;
    setLoading(true);
    setVisibleCount(INITIAL_VISIBLE);

    try {
      // 1) Inventory IDs owned by user
      const invSnap = await get(ref(database, `userInventories/${currentUser.uid}`));
      const invIds = Object.keys(invSnap.val() || {});
      if (invIds.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // 2) Fetch inventory names
      const nameSnaps = await Promise.all(
        invIds.map((id) => get(ref(database, `inventories/${id}/name`)))
      );
      const nameMap = {};
      nameSnaps.forEach((s, i) => {
        nameMap[invIds[i]] = s.exists() ? s.val() : "Unnamed Inventory";
      });

      // 3) Fetch items for each inventory
      const itemSnaps = await Promise.all(
        invIds.map((id) => get(ref(database, `inventoryItems/${id}`)))
      );

      // 4) Flatten -> sort by createdAt/updatedAt desc
      const all = [];
      itemSnaps.forEach((snap, idx) => {
        const invId = invIds[idx];
        const items = snap.val() || {};
        Object.entries(items).forEach(([itemId, data]) => {
          const ts = Number(data?.createdAt || data?.updatedAt || 0);
          all.push({
            inventoryId: invId,
            inventoryName: nameMap[invId] || "Unnamed Inventory",
            itemId,
            title: data?.title || data?.name || "(Untitled Item)",
            ts
          });
        });
      });

      all.sort((a, b) => b.ts - a.ts);
      // 5) Limit to MAX_VISIBLE
      setRows(all.slice(0, MAX_VISIBLE));
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    load();
  }, [load]);

  const showMore = () => {
    setVisibleCount((v) => Math.min(MAX_VISIBLE, rows.length, v + INITIAL_VISIBLE));
  };

  const visibleRows = rows.slice(0, visibleCount);
  const canLoadMore = visibleCount < rows.length;

  return (
    <div className="recent-activity">
      <div className="recent-activity__header">
        <h2 className="recent-activity__title">Recently Added Items</h2>
        <button
          className="recent-activity__reload-btn"
          onClick={load}
          disabled={loading}
          aria-label="Reload"
        >
          <FaSync className={loading ? "spin" : ""} />
          <span>Reload</span>
        </button>
      </div>

      <div className="recent-activity__table-container">
        <table className="recent-activity__table">
          <thead>
            <tr>
              <th>Inventory</th>
              <th>Item</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="recent-activity__empty">Loading…</td>
              </tr>
            ) : visibleRows.length === 0 ? (
              <tr>
                <td colSpan={3} className="recent-activity__empty">No items found</td>
              </tr>
            ) : (
              visibleRows.map((r) => (
                <tr key={`${r.inventoryId}_${r.itemId}`}>
                  <td className="recent-activity__inventory-cell">{r.inventoryName}</td>
                  <td className="recent-activity__title-cell">{r.title}</td>
                  <td className="recent-activity__timestamp-cell">{formatDate(r.ts)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && canLoadMore && (
        <div className="recent-activity__footer">
          <button
            className="recent-activity__loadmore-btn"
            onClick={showMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentActivity;