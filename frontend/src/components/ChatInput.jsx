import { useState } from "react";
import axios from "axios";

function ChatInput({
  messages,
  setMessages,
  setLoading,
}) {
  const [input, setInput] = useState("");

  const handleSend = async (customMessage = null) => {
    const message = customMessage || input;

    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const response = await axios.post(
  "https://nutrilens-ai-igp4.onrender.com/coach",
  {
    message,
  }
);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to reach the AI Coach.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 flex gap-3">

      <input
        type="text"
        placeholder="Ask your AI Nutrition Coach..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 rounded-xl bg-slate-900 border border-cyan-500/20 px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
      />

      <button
        onClick={() => handleSend()}
        className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
      >
        Send
      </button>

    </div>
  );
}

export default ChatInput;