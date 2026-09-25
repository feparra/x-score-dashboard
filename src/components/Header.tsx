import React from "react";

export default function Header() {
  return (
    <header className="inverted w-full" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:py-8 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-bold text-base sm:text-xl tracking-tight text-white">TGT</span>
          <span className="text-meta" style={{ color: "#FF5A1F" }}>ANALYTICS</span>
        </div>
        <div className="text-meta hidden sm:block">X Score Dashboard</div>
      </div>
    </header>
  );
}