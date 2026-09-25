import React from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";

interface Props {
  posts: Post[];
}

function truncate(text: string, max: number): string {
  const clean = text.replace(/^Pinned TGT Analytics · |^TGT Analytics · /, "");
  return clean.length > max ? clean.slice(0, max) + "..." : clean;
}

export default function PostsTable({ posts }: Props) {
  const sorted = [...posts].sort((a, b) => b.estimated_score - a.estimated_score);

  return (
    <div className="bento" style={{ padding: 0 }}>
      <div className="px-8 py-6 flex items-center justify-between" style={{ borderBottom: "1px solid #E5E5E5" }}>
        <div className="text-meta-lg">Top Posts</div>
        <div className="text-meta">{sorted.length} posts</div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Post</th>
              <th>Score</th>
              <th>Replies</th>
              <th>Likes</th>
              <th>Reposts</th>
              <th>Views</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((post, i) => {
              const scoreClass = post.estimated_score >= 10 ? "score-high" : "";
              return (
                <tr key={i}>
                  <td>
                    <div className="flex flex-col gap-1">
                      {post.pinned && (
                        <span className="text-meta" style={{ color: "#FF5A1F" }}>Pinned</span>
                      )}
                      <span className="text-sm leading-snug">{truncate(post.text, 100)}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`score-badge ${scoreClass}`}>
                      {post.estimated_score.toFixed(2)}
                    </span>
                  </td>
                  <td className="mono">{post.engagement.replies}</td>
                  <td className="mono">{post.engagement.likes}</td>
                  <td className="mono">{post.engagement.reposts}</td>
                  <td className="mono">{post.engagement.views}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        href={`/post/${i}`}
                        className="text-meta hover:text-accent"
                        style={{ color: "#828282" }}
                      >
                        Details
                      </Link>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-meta hover:text-accent"
                        style={{ color: "#828282" }}
                      >
                        View ↗
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}