import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const mealTypes = [
  {
    name: "Breakfast",
    emoji: "🌅",
  },
  {
    name: "Lunch",
    emoji: "🍛",
  },
  {
    name: "Snack",
    emoji: "☕",
  },
  {
    name: "Dinner",
    emoji: "🌙",
  },
];

function History() {
  const [history, setHistory] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [menuIndex, setMenuIndex] = useState(null);

  useEffect(() => {
    const meals =
      JSON.parse(localStorage.getItem("mealHistory")) || [];

    setHistory(meals);
  }, []);

  const saveHistory = (updated) => {
    setHistory(updated);

    localStorage.setItem(
      "mealHistory",
      JSON.stringify(updated)
    );
  };

  const handleDelete = () => {
    const updated = history.filter(
      (_, i) => i !== deleteIndex
    );

    saveHistory(updated);

    setDeleteIndex(null);
  };

  const handleMealTypeChange = (
    index,
    type
  ) => {
    const updated = [...history];

    updated[index].mealType = type;

    saveHistory(updated);

    setMenuIndex(null);
  };

  const totalCalories = history.reduce(
    (sum, meal) =>
      sum + (meal.total_calories || 0),
    0
  );

  const badgeStyle = (mealType) => {
    switch (mealType) {
      case "Breakfast":
        return {
          emoji: "🌅",
          color:
            "bg-yellow-500/20 text-yellow-300",
        };

      case "Lunch":
        return {
          emoji: "🍛",
          color:
            "bg-orange-500/20 text-orange-300",
        };

      case "Snack":
        return {
          emoji: "☕",
          color:
            "bg-purple-500/20 text-purple-300",
        };

      default:
        return {
          emoji: "🌙",
          color:
            "bg-blue-500/20 text-blue-300",
        };
    }
  };
return (
  <div className="min-h-screen bg-slate-950 text-white">
    <Navbar />

    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-cyan-400">
        Meal History
      </h1>

      <p className="mt-2 text-gray-400">
        Track and manage all your AI meal analyses.
      </p>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="rounded-2xl bg-slate-900 border border-cyan-500/20 p-6">
          <p className="text-gray-400">Meals Logged</p>
          <h2 className="text-3xl font-bold mt-2">
            {history.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-cyan-500/20 p-6">
          <p className="text-gray-400">Total Calories</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalCalories} kcal
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-cyan-500/20 p-6">
          <p className="text-gray-400">Latest Meal</p>
          <h2 className="text-2xl font-bold mt-2">
            {history.length ? history[0].mealType : "--"}
          </h2>
        </div>

      </div>

      {history.length === 0 ? (

        <div className="mt-20 text-center text-gray-400">
          <p className="text-2xl">
            🍽 No meals logged yet.
          </p>
        </div>

      ) : (

        <div className="space-y-8 mt-10">

          {history.map((meal, index) => {

            const badge = badgeStyle(meal.mealType);

            return (

              <div
                key={index}
                className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-400/40"
              >

                <div className="flex justify-between items-start flex-wrap gap-5">

                  <div>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${badge.color}`}
                    >
                      {badge.emoji} {meal.mealType}
                    </span>

                    <p className="mt-3 text-sm text-gray-400">
                      {meal.date}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div>
                      <p className="text-sm text-gray-400">
                        Calories
                      </p>
                      <p className="font-bold text-xl">
                        {meal.total_calories}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">
                        Protein
                      </p>
                      <p className="font-bold text-xl">
                        {meal.total_protein_g} g
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">
                        Carbs
                      </p>
                      <p className="font-bold text-xl">
                        {meal.total_carbs_g} g
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">
                        Fat
                      </p>
                      <p className="font-bold text-xl">
                        {meal.total_fat_g} g
                      </p>
                    </div>

                  </div>

                </div>

                {/* Foods */}

                <div className="mt-6 border-t border-slate-700 pt-5">

                  <h3 className="font-semibold text-cyan-300 mb-4">
                    🍽 AI Detected Foods
                  </h3>

                  <div className="space-y-2">

                    {meal.foods?.map((food, i) => (

                      <div
                        key={i}
                        className="flex justify-between rounded-xl bg-slate-800 px-4 py-3"
                      >
                        <span>{food.name}</span>

                        <span className="text-gray-400">
                          {food.estimated_weight_g} g
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="mt-6 flex justify-end gap-3 relative">

                  <button
                    onClick={() =>
                      setMenuIndex(
                        menuIndex === index
                          ? null
                          : index
                      )
                    }
                    className="rounded-xl border border-cyan-500/30 px-4 py-2 hover:bg-slate-800 transition"
                  >
                    ✏️ Change Meal Type
                  </button>

                  <button
                    onClick={() =>
                      setDeleteIndex(index)
                    }
                    className="rounded-xl bg-red-500/20 text-red-300 px-4 py-2 hover:bg-red-500/30 transition"
                  >
                    🗑 Delete Meal
                  </button>

                  {menuIndex === index && (

                    <div className="absolute right-40 top-14 w-52 rounded-2xl border border-cyan-500/20 bg-slate-900 shadow-xl overflow-hidden z-20">

                      {mealTypes.map((type) => (

                        <button
                          key={type.name}
                          onClick={() =>
                            handleMealTypeChange(
                              index,
                              type.name
                            )
                          }
                          className="w-full text-left px-5 py-3 hover:bg-slate-800 transition"
                        >
                          {type.emoji} {type.name}
                        </button>

                      ))}

                    </div>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      )}
                    {/* Delete Confirmation Modal */}

      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900 p-8 shadow-2xl">

            <div className="text-center">

              <div className="text-6xl mb-4">
                🗑️
              </div>

              <h2 className="text-2xl font-bold">
                Delete Meal?
              </h2>

              <p className="mt-4 text-gray-400 leading-relaxed">
                This meal will be permanently removed
                from your history.
              </p>

              <p className="text-sm text-red-300 mt-2">
                This action cannot be undone.
              </p>

            </div>

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setDeleteIndex(null)}
                className="rounded-xl border border-slate-700 px-5 py-3 hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  </div>
);
}

export default History;