import React from "react";

export default function Footer() {
  return (
    <footer className="inverted w-full mt-16" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-sm tracking-tight text-white">SYNERGY DRIVE</span>
          <span className="text-meta" style={{ color: "#FF5A1F" }}>SYSTEMS</span>
        </div>
        <div className="text-meta" style={{ color: "rgba(255,255,255,0.4)" }}>
          X Score Dashboard — Industrial Control &amp; VFD Specialists
        </div>
      </div>
    </footer>
  );
}