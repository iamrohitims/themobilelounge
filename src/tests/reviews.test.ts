import { describe, it, expect } from "vitest";
import { dataRepo } from "@/lib/repo";

describe("Reviews Data & Testimonials", () => {
  it("loads reviews from repo and returns valid review structures", async () => {
    const reviews = await dataRepo.reviews.getAll();
    expect(Array.isArray(reviews)).toBe(true);
    expect(reviews.length).toBeGreaterThanOrEqual(5);

    const latest = reviews[0];
    expect(latest).toHaveProperty("id");
    expect(latest).toHaveProperty("author");
    expect(latest).toHaveProperty("rating");
    expect(latest).toHaveProperty("comment");
    expect(latest.rating).toBeGreaterThanOrEqual(1);
    expect(latest.rating).toBeLessThanOrEqual(5);
  });

  it("calculates accurate review stats", async () => {
    const stats = await dataRepo.reviews.getStats();
    expect(stats.totalReviews).toBeGreaterThanOrEqual(5);
    expect(stats.averageRating).toBeGreaterThanOrEqual(4.0);
    expect(stats.averageRating).toBeLessThanOrEqual(5.0);
  });

  it("ensures latest 5-6 reviews slice cleanly", async () => {
    const reviews = await dataRepo.reviews.getAll();
    const topReviews = reviews.slice(0, 6);
    expect(topReviews.length).toBeLessThanOrEqual(6);
    expect(topReviews.length).toBeGreaterThanOrEqual(1);
  });
});
