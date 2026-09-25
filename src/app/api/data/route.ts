import fs from "fs";
import path from "path";
import type { NextApiResponse } from "next";
import type { DashboardData } from "@/lib/types";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "data.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const data: DashboardData = JSON.parse(fileContents);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to load data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}