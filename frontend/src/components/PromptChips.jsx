const prompts = [
  "🥩 High Protein Foods",
  "🍌 Healthy Weight Gain",
  "🥗 Improve Today's Meal",
  "💧 Hydration Tips",
  "🏋️ Meal Plan",
  "📊 Explain My Macros",
];

function PromptChips({ onPromptClick }) {
  return (
    <div className="mt-6">

      <h3 className="text-lg font-semibold text-cyan-400 mb-4">
        ⚡ Quick Questions
      </h3>

      <div className="flex flex-wrap gap-3">

        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="rounded-full border border-cyan-500/20 bg-slate-900 px-4 py-2 text-sm hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300"
          >
            {prompt}
          </button>
        ))}

      </div>

    </div>
  );
}

export default PromptChips;