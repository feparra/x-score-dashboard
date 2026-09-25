import React from "react";

export default function Header() {
  return (
    <header className="inverted w-full" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-xl tracking-tight text-white">SYNERGY DRIVE</span>
          <span className="text-meta-lg" style={{ color: "#FF5A1F" }}>SYSTEMS</span>
        </div>
        <div className="text-meta hidden sm:block">X Score Dashboard</div>
      </div>
    </header>
  );
}