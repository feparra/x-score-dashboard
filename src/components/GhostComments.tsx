import React from "react";
import type { GhostComments } from "@/lib/types";

interface Props {
  comments: GhostComments;
}

export default function GhostComments({ comments }: Props) {
  return (
    <div className="bento inverted" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 flex-wrap">
        <span className="text-meta-lg" style={{ color: "#FF5A1F" }}>Ghost Analysis</span>
        <span className="text-meta" style={{ color: "rgba(255,255,255,0.4)" }}>
          {new Date(comments.updated_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
          {comments.analysis}
        </p>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="text-meta mb-3 sm:mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          Recommendations
        </div>
        <ol className="flex flex-col gap-3">
          {comments.recommendations.map((rec, i) => (
            <li key={i} className="flex gap-2 sm:gap-4 text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              <span className="font-mono text-xs flex-shrink-0" style={{ color: "#FF5A1F", minWidth: "20px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ol>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
        <div className="text-meta mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Next Action</div>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
          {comments.next_action}
        </p>
      </div>
    </div>
  );
}