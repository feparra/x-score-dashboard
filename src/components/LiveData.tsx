"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { DashboardData } from "@/lib/types";

interface Props {
  initialData: DashboardData;
}

export default function LiveData({ initialData }: Props) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>(initialData.generated_at);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/data");
      if (!res.ok) return;
      const json: DashboardData = await res.json();
      setData(json);
      setLastUpdated(json.generated_at);
    } catch {
      // silent fail
    }
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  const formatTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return ts;
    }
  };

  return (
    <div className="flex items-center justify-between py-3 sm:py-4 mb-2" style={{ borderBottom: "1px solid #E5E5E5", paddingBottom: "12px" }}>
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {autoRefresh && <span className="live-dot" />}
        <span className="text-meta truncate" style={{ fontSize: "9px" }}>
          <span className="sm:hidden">{autoRefresh ? "LIVE" : "PAUSED"}</span>
          <span className="hidden sm:inline">{autoRefresh ? "LIVE" : "PAUSED"} — Last updated: {formatTime(lastUpdated)}</span>
        </span>
      </div>
      <button
        onClick={() => setAutoRefresh((v) => !v)}
        className="btn-clinical"
        style={{ padding: "6px 12px", fontSize: "9px" }}
      >
        {autoRefresh ? "Pause" : "Resume"}
      </button>
    </div>
  );
}