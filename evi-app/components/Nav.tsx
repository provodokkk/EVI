"use client";

import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <div
      className={
        "px-10 py-4 flex items-center h-30 fixed top-0 left-0 w-full z-20 bg-white/10 backdrop-blur-lg"
      }
    >
      <div className="flex items-center">
        <Link
          href="https://www.socialnetworks.uzh.ch/en/news/AI-Meets-Empathy-AI-Empathy-Research-Initiative.html"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AI Empathy research initiative"
        >
          <Image
            src="/AI-Empathy-logo.png"
            alt="AI Empathy Research Initiative logo"
            width={240}
            height={60}
            className="h-[60px] w-auto"
          />
        </Link>
      </div>
    </div>
  );
};
