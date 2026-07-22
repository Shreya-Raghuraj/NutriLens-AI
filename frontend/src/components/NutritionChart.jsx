import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#06b6d4", "#3b82f6", "#6366f1"];

function NutritionChart({ protein, carbs, fat }) {
  const data = [
    { name: "Protein", value: protein },
    { name: "Carbs", value: carbs },
    { name: "Fat", value: fat },
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="mb-6 text-2xl font-bold">
        Nutrition Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NutritionChart;