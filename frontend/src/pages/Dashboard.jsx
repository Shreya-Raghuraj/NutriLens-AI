import { useEffect, useState } from "react";

import FoodCard from "../components/FoodCard";
import HealthOverview from "../components/HealthOverview";
import AITips from "../components/AITips";
import GoalTracker from "../components/GoalTracker";
import WeeklyTracker from "../components/WeeklyTracker";

function Dashboard() {
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("mealAnalysis");

    if (data) {
      setMealData(JSON.parse(data));
    }
  }, []);

  if (!mealData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">
          No meal analyzed yet 🍽️
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10 max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold">
        Meal Analysis
      </h1>

      <p className="mt-2 text-gray-400">
        Here's your AI-generated nutrition report.
      </p>

      <div className="mt-10">
        <GoalTracker />
      </div>

      {/* TOP ROW */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10 items-start">

        <AITips meal={mealData} />

        <HealthOverview meal={mealData} />

      </div>

      {/* BOTTOM ROW */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8 items-start">

        {/* Ingredients */}
        <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">

          <h2 className="text-2xl font-bold">
            🍽 Detected Ingredients
          </h2>

          <p className="text-sm text-gray-400 mt-2 mb-6">
            AI identified {mealData.foods.length} ingredient
            {mealData.foods.length !== 1 ? "s" : ""} in your meal.
          </p>

          <div className="space-y-3">
            {mealData.foods.map((food, index) => (
              <FoodCard
                key={index}
                food={food}
              />
            ))}
          </div>

        </div>

        {/* Weekly */}
        <WeeklyTracker />

      </div>

    </div>
  );
}

export default Dashboard;