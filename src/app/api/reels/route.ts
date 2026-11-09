import { NextRequest, NextResponse } from "next/server";
import { Reel, ReelsApiResponse } from "@/types/reel";
import curatedReels from "@/data/reels.json";
import { siteConfig } from "@/config/site";

interface CacheEntry {
  timestamp: number;
  response: ReelsApiResponse;
}

// In-memory route cache across lambda/server invocations to prevent rate-limiting
const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const USER_AGENTS = [
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

/**
 * Attempts to parse public media nodes from Instagram web profile without tokens
 */
async function scrapeInstagramPublicProfile(username: string): Promise<Reel[] | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const targetUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(
      username
    )}`;

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "x-ig-app-id": "936619743392459",
        "User-Agent": getRandomUserAgent(),
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "x-asbd-id": "129477",
        "x-requested-with": "XMLHttpRequest",
        Referer: `https://www.instagram.com/${username}/`,
      },
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    const user = json?.data?.user;
    if (!user) return null;

    const timelineEdges = user?.edge_owner_to_timeline_media?.edges || [];
    const videoTimelineEdges = user?.edge_felix_video_timeline?.edges || [];
    const combinedEdges = [...videoTimelineEdges, ...timelineEdges];

    const parsedReels: Reel[] = [];
    const seenShortcodes = new Set<string>();

    for (const edge of combinedEdges) {
      const node = edge?.node;
      if (!node) continue;

      const isVideo = Boolean(node.is_video || node.video_url);
      const shortcode = node.shortcode;

      if (!isVideo || !shortcode || seenShortcodes.has(shortcode)) continue;
      seenShortcodes.add(shortcode);

      const videoUrl =
        node.video_url ||
        node.video_resources?.[0]?.src ||
        node.video_dash_manifest ||
        `https://www.instagram.com/reel/${shortcode}/`;

      const thumbnailUrl =
        node.display_url ||
        node.thumbnail_src ||
        node.thumbnail_resources?.[node.thumbnail_resources.length - 1]?.src ||
        "/brand/logo.png";

      const captionText =
        node.edge_media_to_caption?.edges?.[0]?.node?.text ||
        "Sealed pack smartphone delivery at The Mobile Lounge Kakod! Check offline deal price on WhatsApp.";

      parsedReels.push({
        id: node.id || `ig_${shortcode}`,
        shortcode,
        videoUrl,
        embedUrl: `https://www.instagram.com/p/${shortcode}/embed`,
        instagramUrl: `https://www.instagram.com/reel/${shortcode}/`,
        thumbnailUrl,
        caption: captionText,
        author: username,
        authorAvatar: user.profile_pic_url_hd || user.profile_pic_url || "/brand/logo.png",
        likes: Number(node.edge_liked_by?.count || node.edge_media_preview_like?.count || 120),
        views: Number(node.video_view_count || node.video_play_count || 1500),
        commentsCount: Number(node.edge_media_to_comment?.count || 12),
        postedAt: node.taken_at_timestamp
          ? new Date(node.taken_at_timestamp * 1000).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })
          : "Recently",
        audioTitle: "Original Audio • The Mobile Lounge Kakod",
        isStoreDemo: false,
      });

      if (parsedReels.length >= 10) break;
    }

    return parsedReels.length > 0 ? parsedReels : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const usernameParam = searchParams.get("username") || siteConfig.contact.instagramHandle;
  const cleanUsername = usernameParam.replace(/^@/, "").trim().toLowerCase();
  const forceRefresh = searchParams.get("refresh") === "true";

  // Check in-memory server cache
  const cached = memoryCache.get(cleanUsername);
  const now = Date.now();

  if (!forceRefresh && cached && now - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(
      {
        ...cached.response,
        source: "cached",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "X-Reels-Source": "memory_cache",
        },
      }
    );
  }

  // Attempt live public scrape
  const liveScrapedReels = await scrapeInstagramPublicProfile(cleanUsername);

  if (liveScrapedReels && liveScrapedReels.length > 0) {
    const successResponse: ReelsApiResponse = {
      success: true,
      username: cleanUsername,
      source: "live_scrape",
      total: liveScrapedReels.length,
      reels: liveScrapedReels,
    };

    memoryCache.set(cleanUsername, {
      timestamp: now,
      response: successResponse,
    });

    return NextResponse.json(successResponse, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Reels-Source": "live_scrape",
      },
    });
  }

  // Fallback to high-definition curated store reels to guarantee zero downtime / zero blank screens
  const fallbackList: Reel[] = (curatedReels as Reel[]).map((r) => ({
    ...r,
    author: cleanUsername,
  }));

  const fallbackResponse: ReelsApiResponse = {
    success: true,
    username: cleanUsername,
    source: "curated_fallback",
    total: fallbackList.length,
    reels: fallbackList,
  };

  memoryCache.set(cleanUsername, {
    timestamp: now,
    response: fallbackResponse,
  });

  return NextResponse.json(fallbackResponse, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Reels-Source": "curated_fallback",
    },
  });
}
