function GoalTracker() {
  const goals = {
    calories: 2000,
    protein: 80,
    carbs: 250,
    fat: 60,
  };

  const current = JSON.parse(localStorage.getItem("mealAnalysis"));

  const progress = (currentValue, goal) =>
    Math.min((currentValue / goal) * 100, 100);

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">

      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl">🎯</span>
        <h2 className="text-2xl font-bold">
          Today's Goal
        </h2>
      </div>

      {/* Calories */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span>Calories</span>
          <span>
            {current.total_calories} / {goals.calories} kcal
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-700">

          <div
            className="h-3 rounded-full bg-cyan-400"
            style={{
              width: `${progress(
                current.total_calories,
                goals.calories
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Protein */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span>Protein</span>
          <span>
            {current.total_protein_g} / {goals.protein} g
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-700">

          <div
            className="h-3 rounded-full bg-green-400"
            style={{
              width: `${progress(
                current.total_protein_g,
                goals.protein
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Carbs */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span>Carbs</span>
          <span>
            {current.total_carbs_g} / {goals.carbs} g
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-700">

          <div
            className="h-3 rounded-full bg-yellow-400"
            style={{
              width: `${progress(
                current.total_carbs_g,
                goals.carbs
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Fat */}

      <div>

        <div className="flex justify-between mb-2">
          <span>Fat</span>
          <span>
            {current.total_fat_g} / {goals.fat} g
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-700">

          <div
            className="h-3 rounded-full bg-red-400"
            style={{
              width: `${progress(
                current.total_fat_g,
                goals.fat
              )}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default GoalTracker;