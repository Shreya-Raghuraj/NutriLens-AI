function ChatBubble({ sender, text }) {
  const isAI = sender === "ai";

  return (
    <div
      className={`flex ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-md transition-all
          ${
            isAI
              ? "bg-slate-800 border border-cyan-500/20 text-white"
              : "bg-cyan-500 text-slate-950 font-medium"
          }`}
      >
        <div className="flex items-center gap-2 mb-2">

          <span className="text-xl">
            {isAI ? "🤖" : "👤"}
          </span>

          <span
            className={`text-sm font-semibold ${
              isAI ? "text-cyan-400" : "text-slate-900"
            }`}
          >
            {isAI ? "AI Coach" : "You"}
          </span>

        </div>

        <p className="leading-7 whitespace-pre-wrap">
          {text}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;