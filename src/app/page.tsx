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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 sm:px-6 sm:py-6 md:py-8">
        <LiveData initialData={data} />

        <div className="flex flex-col gap-4 sm:gap-6">
          <AccountCard account={data.account} />

          <MetricsRow summary={data.summary} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <ScoreChart posts={data.posts} />

            <div className="bento" style={{ padding: 0 }}>
              <div
                className="px-4 py-4 sm:px-8 sm:py-6 flex items-center justify-between"
                style={{ borderBottom: "1px solid #E5E5E5" }}
              >
                <div className="text-meta-lg">Engagement Totals</div>
                <div className="text-meta">All posts</div>
              </div>
              <div className="p-4 sm:p-8 grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Replies</span>
                  <span className="data-value">{data.summary.total_replies}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Likes</span>
                  <span className="data-value">{data.summary.total_likes}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Reposts</span>
                  <span className="data-value">{data.summary.total_reposts}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-meta">Views</span>
                  <span className="data-value">{data.summary.total_views}</span>
                </div>
              </div>

              <div
                className="px-4 py-4 sm:px-8 sm:py-6"
                style={{ borderTop: "1px solid #E5E5E5" }}
              >
                <div className="text-meta mb-3 sm:mb-4">Best Post</div>
                <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 text-textMuted">
                  {data.summary.best_post.text}
                </p>
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <span
                    className="score-badge score-high"
                    style={{ fontSize: "14px", padding: "6px 10px" }}
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