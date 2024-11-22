import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";

const containerVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const buttonVariants = {
  initial: { scale: 0.5 },
  enter: { scale: 1 },
  exit: { scale: 0.5 },
};

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 p-4 flex items-center justify-center bg-transparent"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div variants={buttonVariants}>
            <button
              className="z-50 flex items-center justify-center bg-transparent p-4 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={connect}
              aria-label="Start Call"
            >
              <Mic
                className="size-12 text-black dark:text-white"
                strokeWidth={2}
              />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
