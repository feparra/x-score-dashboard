import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountCard from "@/components/AccountCard";
import MetricsRow from "@/components/MetricsRow";
import ScoreChart from "@/components/ScoreChart";
import PostsTable from "@/components/PostsTable";
import GhostComments from "@/components/GhostComments";
import LiveData from "@/components/LiveData";
import type { DashboardData } from "@/lib/types";

async function getData(): Promise<DashboardData> {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <LiveData initialData={data} />

        <div className="flex flex-col gap-6">
          <AccountCard account={data.account} />

          <MetricsRow summary={data.summary} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScoreChart posts={data.posts} />

            <div className="bento" style={{ padding: 0 }}>
              <div
                className="px-8 py-6 flex items-center justify-between"
                style={{ borderBottom: "1px solid #E5E5E5" }}
              >
                <div className="text-meta-lg">Engagement Totals</div>
                <div className="text-meta">All posts</div>
              </div>
              <div className="p-8 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Total Replies</span>
                  <span className="data-value">{data.summary.total_replies}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Total Likes</span>
                  <span className="data-value">{data.summary.total_likes}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Total Reposts</span>
                  <span className="data-value">{data.summary.total_reposts}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Total Views</span>
                  <span className="data-value">{data.summary.total_views}</span>
                </div>
              </div>

              <div
                className="px-8 py-6"
                style={{ borderTop: "1px solid #E5E5E5" }}
              >
                <div className="text-meta mb-4">Best Post</div>
                <p className="text-sm leading-relaxed mb-4 text-textMuted">
                  {data.summary.best_post.text}
                </p>
                <div className="flex items-center gap-4">
                  <span
                    className="score-badge score-high"
                    style={{ fontSize: "18px", padding: "8px 12px" }}
                  >
                    {data.summary.best_post.score.toFixed(2)}
                  </span>
                  <a
                    href={data.summary.best_post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-meta"
                    style={{ color: "#828282" }}
                  >
                    View on X ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <PostsTable posts={data.posts} />

          <GhostComments comments={data.ghost_comments} />
        </div>
      </main>

      <Footer />
    </div>
  );
}