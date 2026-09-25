import React from "react";
import type { Summary } from "@/lib/types";

interface Props {
  summary: Summary;
}

export default function MetricsRow({ summary }: Props) {
  const metrics = [
    { label: "Total Score", value: summary.total_score.toFixed(2), highlight: true },
    { label: "Avg / Post", value: summary.avg_score.toFixed(2) },
    { label: "Posts", value: summary.post_count.toString() },
    { label: "Best Score", value: summary.best_post.score.toFixed(2), highlight: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ border: "1px solid #E5E5E5" }}>
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="p-4 sm:p-6 md:p-8 flex flex-col gap-2"
          style={{
            borderRight: i < metrics.length - 1 ? "1px solid #E5E5E5" : "none",
            borderBottom: i < 2 ? "1px solid #E5E5E5" : "none",
          }}
        >
          <span className="text-meta">{m.label}</span>
          <span
            className="data-value"
            style={m.highlight ? { color: "#FF5A1F" } : undefined}
          >
            {m.value}
          </span>
        </div>
      ))}
    </div>
  );
}