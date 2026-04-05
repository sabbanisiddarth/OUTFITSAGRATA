"use client";

import { useState } from "react";
import Image from "next/image";

export function SocialIcons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
      <a
        href="https://insta.openinapp.co/gv8pb"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center size-10 rounded-xl transition-colors duration-200"
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
        aria-label="Instagram"
      >
        <span
          className={`absolute inset-0 rounded-lg bg-white/20 transition-all duration-300 ease-out ${
            hoveredIndex === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />
        <span
          className={`relative z-10 transition-all duration-300 ease-out ${
            hoveredIndex === 0 ? "scale-110" : ""
          }`}
        >
          <img
            src="/images/image10.jpg"
            alt="Instagram"
            className="w-[18px] h-[18px] object-contain"
          />
        </span>
        <span
          className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-white transition-all duration-300 ease-out ${
            hoveredIndex === 0 ? "w-3 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </a>
    </div>
  );
}

// Standalone Instagram icon using image10.jpg
export function InstagramIconImage() {
  return (
    <img
      src="/images/image10.jpg"
      alt="Instagram"
      className="w-5 h-5 object-contain"
    />
  );
}
