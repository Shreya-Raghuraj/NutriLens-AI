function HealthOverview({ meal }) {
  const score = meal?.health_score ?? 0;

  const scoreColor =
    score >= 8
      ? "text-green-400 border-green-400"
      : score >= 5
      ? "text-yellow-400 border-yellow-400"
      : "text-red-400 border-red-400";

  const nutrition = [
    {
      label: "Calories",
      value: `${meal.total_calories} kcal`,
      icon: "🔥",
    },
    {
      label: "Protein",
      value: `${meal.total_protein_g} g`,
      icon: "💪",
    },
    {
      label: "Carbs",
      value: `${meal.total_carbs_g} g`,
      icon: "🍚",
    },
    {
      label: "Fat",
      value: `${meal.total_fat_g} g`,
      icon: "🥑",
    },
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10 h-full flex flex-col">

      <h2 className="text-2xl font-bold">
        ⭐ Health Overview
      </h2>

      {/* Score */}
      <div className="flex justify-center my-6">
        <div
          className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center ${scoreColor}`}
        >
          <span className="text-4xl font-bold">{score}</span>
          <span className="text-sm text-gray-400 leading-tight">/10</span>
        </div>
      </div>

      {/* Nutrition */}
      <div className="border-t border-slate-700 pt-5">

        <h3 className="text-xl font-semibold mb-4">
          🥗 Nutrition Facts
        </h3>

        <div className="grid grid-cols-2 gap-2">

          {nutrition.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-slate-800 p-3 border border-slate-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.icon}</span>

                <span className="text-sm text-gray-400 leading-tight">
                  {item.label}
                </span>
              </div>

              <p className="text-xl font-bold break-words">
                {item.value}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default HealthOverview;