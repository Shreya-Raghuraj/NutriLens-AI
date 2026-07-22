import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyTracker() {
  const data = [
    { day: "Mon", calories: 1600 },
    { day: "Tue", calories: 1850 },
    { day: "Wed", calories: 2100 },
    { day: "Thu", calories: 1700 },
    { day: "Fri", calories: 1950 },
    { day: "Sat", calories: 2200 },
    { day: "Sun", calories: 1800 },
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="mb-6 text-xl font-bold">
        📅 Weekly Calories
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />

          <Bar
            dataKey="calories"
            radius={[8, 8, 0, 0]}
            fill="#06b6d4"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyTracker;