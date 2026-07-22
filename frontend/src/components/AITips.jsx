function AITips({ meal }) {
  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="text-xl font-bold">
        💡 AI Nutrition Tips
      </h2>

      {meal?.health_feedback?.length > 0 ? (
        <ul className="mt-5 space-y-3 text-gray-300">
          {meal.health_feedback.map((tip, index) => (
            <li
              key={index}
              className="rounded-lg bg-slate-800 px-4 py-3"
            >
              ✅ {tip}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-gray-400">
          No AI recommendations available yet.
        </p>
      )}
    </div>
  );
}

export default AITips;