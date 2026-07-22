import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import PromptChips from "../components/PromptChips";
import TypingIndicator from "../components/TypingIndicator";

function Coach() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm your AI Nutrition Coach. Ask me anything about nutrition, weight gain, healthy eating, or your meals.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handlePromptClick = async (prompt) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: prompt,
      },
    ]);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/coach",
        {
          message: prompt,
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
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            🥗 AI Nutrition Coach
          </h1>

          <p className="text-gray-400 mt-2">
            Your personal nutrition assistant.
          </p>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl h-[500px] overflow-y-auto p-6 space-y-4">

          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              sender={msg.sender}
              text={msg.text}
            />
          ))}

          {loading && <TypingIndicator />}

        </div>

        <PromptChips onPromptClick={handlePromptClick} />

        <ChatInput
          messages={messages}
          setMessages={setMessages}
          setLoading={setLoading}
        />

      </div>
    </div>
  );
}

export default Coach;