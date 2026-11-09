import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFile = path.join(__dirname, "../src/data/products.json");

const products = JSON.parse(fs.readFileSync(productsFile, "utf8"));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function getFlipkartImages(productName, brand) {
  try {
    const query = `${brand} ${productName}`.replace(/5G/g, "").replace(/\(Snapdragon\)/g, "").trim();
    const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    
    console.log(`[SEARCH] Query: "${query}"`);
    const searchRes = await fetch(searchUrl, { headers });
    if (!searchRes.ok) {
      console.warn(`[WARN] Search failed with status ${searchRes.status} for ${query}`);
      return null;
    }
    const searchHtml = await searchRes.text();
    
    // Find the first product link
    const linkMatches = [...searchHtml.matchAll(/href="(\/[^"]*\/p\/itm[^"]*pid=MOB[^"]*)"/g)];
    if (!linkMatches || linkMatches.length === 0) {
      console.warn(`[WARN] No product links found in search for ${query}`);
      // Fallback: extract direct mobile images from search HTML
      const rawSearchImgs = [...new Set(searchHtml.match(/https:\/\/rukminim2\.flixcart\.com\/image\/[0-9]+\/[0-9]+\/xif0q\/mobile\/[a-z0-9\/-]+\.jpeg/g) || [])];
      if (rawSearchImgs.length > 0) {
        return rawSearchImgs.slice(0, 4).map((url, i) => ({
          src: url.replace(/\/[0-9]+\/[0-9]+\//, "/832/832/"),
          alt: `${productName} Angle ${i + 1}`,
          color: "Standard",
        }));
      }
      return null;
    }

    const relativeLink = linkMatches[0][1].replace(/&amp;/g, "&");
    const productUrl = `https://www.flipkart.com${relativeLink}`;
    console.log(`[FOUND PRODUCT] ${productUrl.slice(0, 80)}...`);

    await sleep(400);

    const prodRes = await fetch(productUrl, { headers });
    if (!prodRes.ok) {
      console.warn(`[WARN] Product page failed with status ${prodRes.status}`);
      return null;
    }

    const prodHtml = await prodRes.text();

    // Extract all flixcart mobile images
    const rawMatches = [
      ...new Set(
        prodHtml.match(
          /https:\/\/rukminim2\.flixcart\.com\/image\/[0-9]+\/[0-9]+\/xif0q\/mobile\/[a-z0-9\/-]+\.jpeg/g
        ) || []
      ),
    ];

    if (!rawMatches || rawMatches.length === 0) {
      console.warn(`[WARN] No flixcart mobile images found on product page for ${productName}`);
      return null;
    }

    // Filter to only unique image hashes
    const uniqueMap = new Map();
    for (const url of rawMatches) {
      const highRes = url.replace(/\/[0-9]+\/[0-9]+\//, "/832/832/");
      // Extract key filename
      const filename = highRes.split("/").pop();
      if (!uniqueMap.has(filename)) {
        uniqueMap.set(filename, highRes);
      }
    }

    const uniqueUrls = Array.from(uniqueMap.values());
    console.log(`[SUCCESS] Extracted ${uniqueUrls.length} unique studio images for ${productName}`);

    // Take up to 5 images
    const selected = uniqueUrls.slice(0, 5);
    const angleLabels = ["Front View", "Back View", "Side Profile", "Camera Module", "In-Hand Display"];

    return selected.map((src, idx) => ({
      src,
      alt: `${productName} ${angleLabels[idx] || `Studio View ${idx + 1}`}`,
      color: idx === 0 ? "Default" : "Variant",
    }));
  } catch (err) {
    console.error(`[ERROR] Failed to fetch images for ${productName}:`, err.message);
    return null;
  }
}

async function run() {
  console.log(`Starting Flipkart image export for ${products.length} products...`);
  let updatedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    
    // Check if product already has real flipkart images (at least 3)
    const hasFlipkart = p.images && p.images.length >= 3 && p.images.every((img) => img.src && img.src.includes("flixcart"));
    if (hasFlipkart) {
      console.log(`[SKIP ${i + 1}/${products.length}] ${p.name} already has ${p.images.length} Flipkart images.`);
      continue;
    }

    console.log(`\n[FETCH ${i + 1}/${products.length}] Fetching Flipkart images for: ${p.brand} ${p.name}`);
    const images = await getFlipkartImages(p.name, p.brand);
    
    if (images && images.length >= 2) {
      p.images = images;
      updatedCount++;
      console.log(`=> Updated ${p.name} with ${images.length} real studio images.`);
      
      // Save periodically
      fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf8");
    } else {
      console.log(`=> Could not find sufficient studio images for ${p.name}, keeping existing.`);
    }

    // Polite delay
    await sleep(600);
  }

  // Final save
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf8");
  console.log(`\nFinished! Successfully updated ${updatedCount} products with real Flipkart studio images.`);
}

run();
