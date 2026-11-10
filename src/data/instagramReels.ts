/**
 * Centralized Instagram Reel URLs for The Mobile Lounge Kakod (@themobilelounge_kakod)
 *
 * To add or remove Reels:
 * Simply add or remove URL strings in this array.
 * Valid formats:
 * - https://www.instagram.com/reel/SHORTCODE/
 * - https://www.instagram.com/p/SHORTCODE/
 */
export const instagramReels: string[] = [
  "https://www.instagram.com/reel/DfRnkQZpVvK/",
  "https://www.instagram.com/reel/DfhAZ5rvnq_/",
  "https://www.instagram.com/reel/DfcXieovfWc/",
  "https://www.instagram.com/reel/DfbTu_iPAB_/",
  "https://www.instagram.com/reel/DfaO8FzP8hM/",
  "https://www.instagram.com/reel/DfY-uZqPZe6/",
];

/**
 * Extracts the canonical Instagram shortcode from a Reel or Post URL.
 */
export function extractReelShortcode(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Returns the canonical permalink for Instagram's embed mechanism.
 */
export function getCanonicalReelUrl(url: string): string | null {
  const shortcode = extractReelShortcode(url);
  if (!shortcode) return null;
  return `https://www.instagram.com/reel/${shortcode}/`;
}
