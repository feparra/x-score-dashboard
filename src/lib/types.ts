export interface Engagement {
  replies: number;
  reposts: number;
  likes: number;
  views: number;
  bookmarks: number;
}

export interface SignalBreakdown {
  replies: { count: number; weight: number; score: number };
  reposts: { count: number; weight: number; score: number };
  likes: { count: number; weight: number; score: number };
  views: { count: number; weight: number; score: number };
  bookmarks: { count: number; weight: number; score: number };
}

export interface Post {
  text: string;
  url: string;
  timestamp: string;
  pinned: boolean;
  engagement: Engagement;
  signal_breakdown: SignalBreakdown;
  estimated_score: number;
}

export interface Account {
  username: string;
  display_name: string;
  followers: number;
  following: number;
  posts_count: number;
  bio: string;
}

export interface Summary {
  total_score: number;
  avg_score: number;
  post_count: number;
  total_replies: number;
  total_reposts: number;
  total_likes: number;
  total_views: number;
  best_post: {
    text: string;
    url: string;
    score: number;
  };
}

export interface GhostComments {
  analysis: string;
  recommendations: string[];
  next_action: string;
  updated_at: string;
}

export interface Weights {
  reply: number;
  repost: number;
  favorite: number;
  share: number;
  quote: number;
  follow_author: number;
  dwell: number;
  [key: string]: number;
}

export interface DashboardData {
  account: Account;
  summary: Summary;
  posts: Post[];
  ghost_comments: GhostComments;
  weights: Weights;
  generated_at: string;
}