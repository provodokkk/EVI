"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "utils";

const motionProps = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  const buttonClasses =
    "flex items-center justify-center h-12 w-12 rounded-full p-0";
  const toggleClasses = cn(
    "h-12 w-12 rounded-full flex items-center justify-center",
    isMuted ? "bg-red-500 text-white" : "bg-green-500 text-white",
    "transition-colors duration-300"
  );

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full flex items-center justify-center z-10",
        "bg-white/10 backdrop-blur-lg"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            {...motionProps}
            className={"p-4 rounded-2xl flex items-center gap-4 my-2"}
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => (isMuted ? unmute() : mute())}
              className={toggleClasses}
              variant="default"
            >
              {isMuted ? (
                <MicOff className="size-5" />
              ) : (
                <Mic className="size-5" />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <Button
              className={buttonClasses}
              onClick={() => {
                disconnect();
              }}
              variant="destructive"
            >
              <Phone
                className="size-5 "
                strokeWidth={2}
                stroke="currentColor"
              />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
