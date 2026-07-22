function HealthScore({ score }) {
  const getColor = () => {
    if (score >= 8) return "border-green-500 text-green-400";
    if (score >= 5) return "border-yellow-500 text-yellow-400";
    return "border-red-500 text-red-400";
  };

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="text-xl font-bold">
        ⭐ Health Score
      </h2>

      <div className="mt-8 flex justify-center">
        <div
          className={`flex h-40 w-40 items-center justify-center rounded-full border-8 ${getColor()}`}
        >
          <span className="text-5xl font-bold">
            {score}/10
          </span>
        </div>
      </div>

      <p className="mt-6 text-center text-gray-400">
        AI Estimated Meal Quality
      </p>
    </div>
  );
}

export default HealthScore;