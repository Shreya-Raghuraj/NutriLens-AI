function NutritionFacts({
  calories,
  protein,
  carbs,
  fat,
}) {
  const nutrition = [
    {
      label: "Calories",
      value: `${calories} kcal`,
      icon: "🔥",
    },
    {
      label: "Protein",
      value: `${protein} g`,
      icon: "💪",
    },
    {
      label: "Carbs",
      value: `${carbs} g`,
      icon: "🍚",
    },
    {
      label: "Fat",
      value: `${fat} g`,
      icon: "🥑",
    },
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10 h-full">
      <h2 className="text-2xl font-bold">
        🥗 Nutrition Facts
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Nutritional breakdown of your analyzed meal.
      </p>

      <div className="mt-8 space-y-4">
        {nutrition.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl bg-slate-800 px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>

              <div>
                <p className="text-sm text-gray-400">
                  {item.label}
                </p>

                <p className="font-semibold text-lg">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NutritionFacts;