import React from "react";

export default function Footer() {
  return (
    <footer className="inverted w-full mt-8 sm:mt-12 md:mt-16" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-bold text-xs sm:text-sm tracking-tight text-white">SYNERGY DRIVE</span>
          <span className="text-meta" style={{ color: "#FF5A1F" }}>SYSTEMS</span>
        </div>
        <div className="text-meta text-center sm:text-right" style={{ color: "rgba(255,255,255,0.4)" }}>
          X Score Dashboard
        </div>
      </div>
    </footer>
  );
}