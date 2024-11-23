"use client";
import { cn } from "utils";
import { useVoice } from "@humeai/voice-react";
import { motion } from "framer-motion";
import { ComponentRef, forwardRef, useRef, useEffect } from "react";
import { EmotionScores as HumeEmotionScores } from "hume/api/resources/empathicVoice/types/EmotionScores";

type EmotionScores = HumeEmotionScores & Record<string, number>;

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messages.length) return;

    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Find the latest user message
    const latestUserMessage = messages.findLast(
      (msg) => msg.type === "user_message"
    );

    if (
      latestUserMessage &&
      "models" in latestUserMessage &&
      latestUserMessage.models?.prosody
    ) {
      // Extract emotion scores
      const emotionScores =
        (latestUserMessage.models.prosody?.scores as EmotionScores) ?? null;

      if (emotionScores) {
        // Save to localStorage
        localStorage.setItem("emotionScores", JSON.stringify(emotionScores));
      }
    }
  }, [messages]);

  return (
    <motion.div
      layoutScroll
      className="grow rounded-md overflow-auto p-4"
      ref={ref}
    >
      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        {messages.map((msg, index) =>
          msg.type === "user_message" || msg.type === "assistant_message" ? (
            <motion.div
              key={msg.type + index}
              className={cn(
                "max-w-[80%]",
                "bg-white bg-opacity-80",
                "border-2 border-white/30",
                "rounded-2xl shadow-lg",
                msg.type === "user_message" ? "ml-auto" : ""
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
            >
              <div className="p-4">{msg.message.content}</div>
            </motion.div>
          ) : null
        )}

        {/* Ref for auto-scroll */}
        <div ref={messagesEndRef} />
      </motion.div>
    </motion.div>
  );
});

export default Messages;
