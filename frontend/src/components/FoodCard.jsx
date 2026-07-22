function FoodCard({ food }) {
  return (
    <div className="border-b border-slate-700 py-4 last:border-none">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">

        <div>
          <h3 className="text-lg font-semibold capitalize text-white">
            🍽 {food.name}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
             {food.weight_g} 
          </p>
        </div>

        <span className="text-xl font-bold text-cyan-400">
          🔥 {food.calories} kcal
        </span>

      </div>

      {/* Macros */}
      <div className="flex flex-wrap gap-3">

        <div className="rounded-full bg-slate-800 px-4 py-2 text-sm">
          💪 <span className="font-semibold">{food.protein_g} g</span>
        </div>

        <div className="rounded-full bg-slate-800 px-4 py-2 text-sm">
          🍚 <span className="font-semibold">{food.carbs_g} g</span>
        </div>

        <div className="rounded-full bg-slate-800 px-4 py-2 text-sm">
          🥑 <span className="font-semibold">{food.fat_g} g</span>
        </div>

      </div>

    </div>
  );
}

export default FoodCard;