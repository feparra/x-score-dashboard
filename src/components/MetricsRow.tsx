import React from "react";
import type { Summary } from "@/lib/types";

interface Props {
  summary: Summary;
}

export default function MetricsRow({ summary }: Props) {
  const metrics = [
    { label: "Total Score", value: summary.total_score.toFixed(2), highlight: true },
    { label: "Avg Score / Post", value: summary.avg_score.toFixed(2) },
    { label: "Posts Analyzed", value: summary.post_count.toString() },
    { label: "Best Post Score", value: summary.best_post.score.toFixed(2), highlight: true },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0" style={{ border: "1px solid #E5E5E5" }}>
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="p-6 lg:p-8 flex flex-col gap-3"
          style={{
            borderRight: i < metrics.length - 1 ? "1px solid #E5E5E5" : "none",
            borderBottom: "1px solid #E5E5E5",
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