import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET(_req: NextRequest) {
  try {
    const data = await redis.get("tgt:dashboard");
    if (!data) {
      return Response.json(
        { error: "No data available yet. Waiting for first scraper run." },
        { status: 404 }
      );
    }
    return Response.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch data from Redis", details: String(err) },
      { status: 500 }
    );
  }
}