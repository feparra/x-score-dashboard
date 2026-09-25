import React from "react";
import type { Post } from "@/lib/types";

interface Props {
  posts: Post[];
}

export default function ScoreChart({ posts }: Props) {
  const maxScore = Math.max(...posts.map((p) => p.estimated_score), 1);
  const sorted = [...posts].sort((a, b) => b.estimated_score - a.estimated_score);

  const weights = [
    { label: "Replies (5.0x)", value: "Highest weight" },
    { label: "Reposts (1.0x)", value: "Amplification" },
    { label: "Likes (0.5x)", value: "Light signal" },
    { label: "Views (0.05x)", value: "Dwell proxy" },
    { label: "Bookmarks (0.5x)", value: "Save intent" },
  ];

  return (
    <div className="bento">
      <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
        <div className="text-meta-lg">Score Distribution</div>
        <div className="text-meta hidden sm:block">Per post</div>
      </div>

      {/* Mobile: horizontal bars */}
      <div className="bar-container-mobile md:hidden">
        {sorted.map((post, i) => {
          const widthPct = (post.estimated_score / maxScore) * 100;
          const truncated = post.text.replace(/^TGT Analytics · |^Pinned TGT Analytics · /, "").slice(0, 20) + "...";
          return (
            <div key={i} className="bar-row">
              <span className="bar-label-mobile">{truncated}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${widthPct}%` }} />
              </div>
              <span className="bar-value-mobile">{post.estimated_score.toFixed(1)}</span>
            </div>
          );
        })}
      </div>

      {/* Desktop: vertical bars */}
      <div className="bar-container-desktop hidden md:flex">
        {sorted.map((post, i) => {
          const heightPct = (post.estimated_score / maxScore) * 100;
          const truncated = post.text.replace(/^TGT Analytics · |^Pinned TGT Analytics · /, "").slice(0, 20) + "...";
          return (
            <div
              key={i}
              className="bar"
              style={{ height: `${heightPct}%` }}
              title={post.text.slice(0, 80)}
            >
              <span className="bar-value">{post.estimated_score.toFixed(1)}</span>
              <span className="bar-label">{truncated}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4" style={{ borderTop: "1px solid #E5E5E5" }}>
        {weights.map((w) => (
          <div key={w.label} className="flex flex-col gap-1">
            <span className="text-meta">{w.label}</span>
            <span className="text-xs text-textMuted">{w.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}