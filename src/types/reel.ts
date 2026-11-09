export interface Reel {
  id: string;
  shortcode: string;
  videoUrl?: string;
  embedUrl: string;
  instagramUrl: string;
  thumbnailUrl: string;
  caption: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  views?: number;
  commentsCount?: number;
  phoneTag?: string;
  phoneSlug?: string;
  dealPrice?: string;
  postedAt?: string;
  audioTitle?: string;
  isStoreDemo?: boolean;
}

export interface ReelsApiResponse {
  success: boolean;
  username: string;
  source: "live_scrape" | "cached" | "curated_fallback";
  total: number;
  reels: Reel[];
  error?: string;
}
