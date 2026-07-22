function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="bg-slate-800 border border-cyan-500/20 rounded-2xl px-5 py-4 max-w-xs">

        <div className="flex items-center gap-2 mb-2">

          <span className="text-xl">🤖</span>

          <span className="text-sm font-semibold text-cyan-400">
            AI Coach
          </span>

        </div>

        <div className="flex gap-2">

          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"></span>

          <span
            className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>

          <span
            className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;