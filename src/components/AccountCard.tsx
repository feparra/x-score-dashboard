import React from "react";
import type { Account } from "@/lib/types";

interface Props {
  account: Account;
}

export default function AccountCard({ account }: Props) {
  return (
    <div className="bento">
      <div className="text-meta-lg mb-6">Account Summary</div>
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{account.display_name}</h2>
        <span className="font-mono text-sm text-textMuted">{account.username}</span>
      </div>
      <p className="text-sm text-textMuted mb-6 leading-relaxed max-w-md">{account.bio}</p>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-meta">Followers</span>
          <span className="font-mono font-bold text-xl">{account.followers.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-meta">Following</span>
          <span className="font-mono font-bold text-xl">{account.following.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-meta">Total Posts</span>
          <span className="font-mono font-bold text-xl">{account.posts_count.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}