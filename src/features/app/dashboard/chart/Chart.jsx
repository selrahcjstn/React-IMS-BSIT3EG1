import { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../../../firebase/config";
import { useAuth } from "../../../../context/AuthContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./chart.css";

function Chart() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = useMemo(() => {
    const fmt = new Intl.DateTimeFormat("en", { month: "short" });
    const now = new Date();
    const arr = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      arr.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: fmt.format(d), value: 0 });
    }
    return arr;
  }, []);

  useEffect(() => {
    if (!currentUser?.uid) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const userInvSnap = await get(ref(database, `userInventories/${currentUser.uid}`));
        const idsObj = userInvSnap.val() || {};
        const invIds = Object.keys(idsObj);
        if (invIds.length === 0) {
          if (!cancelled) {
            setData(months.map(m => ({ month: m.month, value: 0 })));
            setLoading(false);
          }
          return;
        }

        const itemSnaps = await Promise.all(
          invIds.map((id) => get(ref(database, `inventoryItems/${id}`)))
        );

        const buckets = new Map(months.map(m => [m.key, 0]));
        for (const s of itemSnaps) {
          const items = s.val() || {};
          for (const it of Object.values(items)) {
            const ts = Number(it?.updatedAt || it?.createdAt || 0);
            if (!Number.isFinite(ts) || ts <= 0) continue;
            const d = new Date(ts);
            const key = `${d.getFullYear()}-${d.getMonth()}`;

            const qty = Number(it?.quantity) || 0;
            const price =
              it?.price != null
                ? Number(it.price)
                : it?.unitPrice != null
                ? Number(it.unitPrice)
                : 0;
            const rawTotal =
              it?.total != null
                ? Number(it.total)
                : it?.totalValue != null
                ? Number(it.totalValue)
                : qty * price;
            const itemTotal = Number.isFinite(rawTotal) ? rawTotal : 0;

            if (buckets.has(key)) {
              buckets.set(key, (buckets.get(key) || 0) + itemTotal);
            }
          }
        }

        if (!cancelled) {
          const series = months.map(m => ({
            month: m.month,
            value: buckets.get(m.key) || 0
          }));
          setData(series);
        }
      } catch {
        if (!cancelled) {
          setData(months.map(m => ({ month: m.month, value: 0 })));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [currentUser?.uid, months]);

  return (
    <div className="chart">
      <h2 className="chart__title">Inventory Value (Last 12 Months)</h2>
      <div className="chart__wrapper">
        {loading ? (
          <div className="chart__loading">Loading chart...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F77EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2F77EB" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}
                formatter={(v) =>
                  "₱" + Number(v || 0).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }
                labelStyle={{ color: "#1e293b" }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#2F77EB"
                strokeWidth={2.5}
                fill="url(#valueColor)"
                isAnimationActive={!loading}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Chart;