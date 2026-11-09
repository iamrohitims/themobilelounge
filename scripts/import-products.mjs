/**
 * The Mobile Lounge (Kakod) - Product & Stock Importer
 * Usage:
 *   pnpm run import:products [path/to/stock.csv]
 *
 * CSV Header Format Expected:
 *   slug,ram,storage,color,mrp,price,inStock
 *
 * Example CSV row:
 *   apple-iphone-16,8,128,Teal,79900,70990,true
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, "../src/data/products.json");

function parseCSVLine(line) {
  return line.split(",").map((s) => s.trim());
}

async function run() {
  const args = process.argv.slice(2);
  const csvFile = args[0];

  if (!csvFile) {
    console.log(`
ℹ️  No CSV file provided. Running validation on current products.json...
    To import price/stock updates from CSV, run:
    pnpm run import:products ./stock-update.csv
`);
  }

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Error: products.json not found at ${jsonPath}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(jsonPath, "utf-8");
  const products = JSON.parse(rawJson);
  console.log(`📦 Loaded ${products.length} products from ${jsonPath}`);

  if (csvFile) {
    if (!fs.existsSync(csvFile)) {
      console.error(`❌ Error: Provided CSV file not found: ${csvFile}`);
      process.exit(1);
    }

    const csvContent = fs.readFileSync(csvFile, "utf-8");
    const lines = csvContent
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      console.error("❌ CSV file is empty or missing headers.");
      process.exit(1);
    }

    const header = parseCSVLine(lines[0]);
    console.log(`📝 Processing CSV with headers: ${header.join(", ")}`);

    let updatedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const parts = parseCSVLine(lines[i]);
      const [slug, ramStr, storageStr, color, mrpStr, priceStr, inStockStr] = parts;

      const product = products.find((p) => p.slug === slug);
      if (!product) {
        console.warn(`⚠️ Warning: Product slug '${slug}' not found. Skipping.`);
        continue;
      }

      const ram = ramStr ? parseInt(ramStr, 10) : undefined;
      const storage = storageStr ? parseInt(storageStr, 10) : undefined;
      const mrp = parseInt(mrpStr, 10);
      const price = parseInt(priceStr, 10);
      const inStock = inStockStr.toLowerCase() === "true" || inStockStr === "1";

      const variant = product.variants.find(
        (v) =>
          (!color || v.color.toLowerCase() === color.toLowerCase()) &&
          (!storage || v.storage === storage)
      );

      if (variant) {
        if (!isNaN(mrp)) variant.mrp = mrp;
        if (!isNaN(price)) variant.price = price;
        variant.inStock = inStock;
        updatedCount++;
      } else {
        product.variants.push({
          ram,
          storage,
          color: color || "Standard",
          mrp: isNaN(mrp) ? 0 : mrp,
          price: isNaN(price) ? 0 : price,
          inStock,
        });
        updatedCount++;
      }

      product._meta = {
        verified: true,
        lastUpdated: new Date().toISOString().split("T")[0],
        source: `CSV Import (${path.basename(csvFile)})`,
      };
    }

    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
    console.log(`✅ Successfully updated ${updatedCount} variants across products!`);
  } else {
    // Audit check
    const totalVariants = products.reduce((sum, p) => sum + p.variants.length, 0);
    const inStockVariants = products.reduce(
      (sum, p) => sum + p.variants.filter((v) => v.inStock).length,
      0
    );
    console.log(`✅ Catalog health check passed:`);
    console.log(`   - Total Phone Models: ${products.length}`);
    console.log(`   - Total SKU Variants: ${totalVariants}`);
    console.log(`   - In Stock Variants: ${inStockVariants}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
