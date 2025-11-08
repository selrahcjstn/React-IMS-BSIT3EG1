import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./chart.css";

function Chart() {
  const data = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 600 },
    { month: "Apr", value: 800 },
    { month: "May", value: 500 },
    { month: "Jun", value: 700 },
    { month: "Jul", value: 750 },
    { month: "Aug", value: 900 },
    { month: "Sep", value: 850 },
    { month: "Oct", value: 950 },
    { month: "Nov", value: 1100 },
    { month: "Dec", value: 1300 },
  ];

  return (
    <div className="chart">
      <h2 className="chart__title">Inventory Value (Last 12 Months)</h2>

      <div className="chart__wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2F77EB" stopOpacity={0.8} />
                
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="linear"
              dataKey="value"
              stroke="#2F77EB"
              strokeWidth={2}
              fill="url(#valueColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
