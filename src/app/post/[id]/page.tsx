import fs from "fs";
import path from "path";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { DashboardData, Post } from "@/lib/types";

async function getData(): Promise<DashboardData> {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const data = await getData();
  return data.posts.map((_, i) => ({ id: String(i) }));
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData();
  const idx = parseInt(params.id, 10);

  if (isNaN(idx) || idx < 0 || idx >= data.posts.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-16">
          <div className="bento text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Link href="/" className="btn-clinical inline-block">
              ← Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const post: Post = data.posts[idx];
  const breakdown = post.signal_breakdown;
  const signals = [
    { key: "replies", label: "Replies", ...breakdown.replies },
    { key: "reposts", label: "Reposts", ...breakdown.reposts },
    { key: "likes", label: "Likes", ...breakdown.likes },
    { key: "views", label: "Views", ...breakdown.views },
    { key: "bookmarks", label: "Bookmarks", ...breakdown.bookmarks },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        <Link href="/" className="text-meta inline-block mb-6 hover:text-accent">
          ← Back to Dashboard
        </Link>

        {/* Post text */}
        <div className="bento mb-6">
          <div className="text-meta-lg mb-6">Post Content</div>
          <p className="text-base leading-relaxed mb-6">
            {post.text.replace(/^Pinned TGT Analytics · |^TGT Analytics · /, "")}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clinical-accent btn-clinical"
            >
              View on X ↗
            </a>
            <span className="text-meta">
              {new Date(post.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {post.pinned && (
              <span className="text-meta" style={{ color: "#FF5A1F" }}>
                Pinned
              </span>
            )}
          </div>
        </div>

        {/* Score */}
        <div className="bento mb-6">
          <div className="text-meta-lg mb-6">Estimated Score</div>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="data-value-xl" style={{ color: "#FF5A1F" }}>
              {post.estimated_score.toFixed(2)}
            </span>
            <span className="text-meta">Total estimated score</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="bento mb-6" style={{ padding: 0 }}>
          <div
            className="px-8 py-6 text-meta-lg"
            style={{ borderBottom: "1px solid #E5E5E5" }}
          >
            Score Breakdown
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Signal</th>
                <th>Count</th>
                <th>Weight</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((s) => (
                <tr key={s.key}>
                  <td className="font-medium">{s.label}</td>
                  <td className="mono">{s.count}</td>
                  <td className="mono">{s.weight.toFixed(2)}x</td>
                  <td>
                    <span
                      className={`score-badge ${s.score >= 5 ? "score-high" : ""}`}
                    >
                      {s.score.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#F5F5F5" }}>
                <td className="font-bold">Total</td>
                <td></td>
                <td></td>
                <td>
                  <span
                    className="score-badge score-high"
                    style={{ fontSize: "16px" }}
                  >
                    {post.estimated_score.toFixed(2)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Engagement metrics */}
        <div className="bento">
          <div className="text-meta-lg mb-6">Engagement Metrics</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-meta">Replies</span>
              <span className="data-value">{post.engagement.replies}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-meta">Reposts</span>
              <span className="data-value">{post.engagement.reposts}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-meta">Likes</span>
              <span className="data-value">{post.engagement.likes}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-meta">Views</span>
              <span className="data-value">{post.engagement.views}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-meta">Bookmarks</span>
              <span className="data-value">{post.engagement.bookmarks}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}