"use client";

import { InstagramReels } from "@/components/InstagramReels";

export function InstagramSection({ reels }: { reels?: string[] }) {
  return <InstagramReels reels={reels} />;
}

export default InstagramSection;
