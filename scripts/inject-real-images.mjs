import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPath = path.join(__dirname, "seed-generator.mjs");
let content = fs.readFileSync(seedPath, "utf8");

// Image mapping rules
function getRealPhoneImages(slug, brand, name) {
  const s = slug.toLowerCase();
  if (s.includes("iphone-16-pro")) {
    return [
      { src: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", alt: `${name} Desert Titanium` },
      { src: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80", alt: `${name} Natural Titanium` },
      { src: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80", alt: `${name} Black Titanium` }
    ];
  }
  if (s.includes("iphone-16")) {
    return [
      { src: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80", alt: `${name} Ultramarine` },
      { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", alt: `${name} Teal` }
    ];
  }
  if (s.includes("iphone-15")) {
    return [
      { src: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80", alt: `${name} Blue` },
      { src: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80", alt: `${name} Black` }
    ];
  }
  if (s.includes("iphone-13") || s.includes("iphone-14")) {
    return [
      { src: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80", alt: `${name} Midnight` },
      { src: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80", alt: `${name} Starlight` }
    ];
  }
  if (s.includes("galaxy-s24-ultra")) {
    return [
      { src: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", alt: `${name} Titanium Gray` },
      { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", alt: `${name} Titanium Violet` }
    ];
  }
  if (s.includes("galaxy-s24") || s.includes("galaxy-s23")) {
    return [
      { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", alt: `${name} Onyx Black` },
      { src: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", alt: `${name} Marble Gray` }
    ];
  }
  if (s.includes("fold") || s.includes("flip")) {
    return [
      { src: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80", alt: `${name} Silver Shadow` },
      { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", alt: `${name} Navy` }
    ];
  }
  if (s.includes("galaxy-a") || s.includes("galaxy-m")) {
    return [
      { src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", alt: `${name} Awesome Iceblue` },
      { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", alt: `${name} Awesome Navy` }
    ];
  }
  if (s.includes("oneplus-12") || s.includes("oneplus-open")) {
    return [
      { src: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80", alt: `${name} Flowy Emerald` },
      { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", alt: `${name} Silky Black` }
    ];
  }
  if (s.includes("oneplus-nord")) {
    return [
      { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80", alt: `${name} Mercurial Silver` },
      { src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", alt: `${name} Oasis Green` }
    ];
  }
  if (s.includes("vivo-x100")) {
    return [
      { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", alt: `${name} Asteroid Black` },
      { src: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80", alt: `${name} Sunset Orange` }
    ];
  }
  if (s.includes("vivo-v40") || s.includes("vivo-v30")) {
    return [
      { src: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80", alt: `${name} Ganges Blue` },
      { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", alt: `${name} Titanium Gray` }
    ];
  }
  if (s.includes("vivo-t3") || s.includes("vivo-y")) {
    return [
      { src: "https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=800&q=80", alt: `${name} Sandstone Orange` },
      { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80", alt: `${name} Emerald Green` }
    ];
  }
  if (s.includes("reno") || s.includes("oppo-f") || s.includes("oppo-a")) {
    return [
      { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", alt: `${name} Sunset Gold` },
      { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80", alt: `${name} Space Brown` }
    ];
  }
  if (s.includes("realme")) {
    return [
      { src: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80", alt: `${name} Fluid Silver` },
      { src: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80", alt: `${name} Razor Green` }
    ];
  }
  if (s.includes("xiaomi") || s.includes("redmi")) {
    return [
      { src: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80", alt: `${name} Jade Green` },
      { src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", alt: `${name} Midnight Black` }
    ];
  }
  if (s.includes("moto")) {
    return [
      { src: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80", alt: `${name} Nordic Wood` },
      { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80", alt: `${name} Forest Grey` }
    ];
  }
  if (s.includes("iqoo")) {
    return [
      { src: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80", alt: `${name} Legend White` },
      { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", alt: `${name} Alpha Black` }
    ];
  }
  if (s.includes("poco")) {
    return [
      { src: "https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=800&q=80", alt: `${name} Poco Yellow` },
      { src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", alt: `${name} Spectre Black` }
    ];
  }

  return [
    { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", alt: `${name} Official Edition` }
  ];
}

// Read products.json, update it, and re-save
const productsFile = path.join(__dirname, "../src/data/products.json");
const products = JSON.parse(fs.readFileSync(productsFile, "utf8"));

for (const p of products) {
  const realImages = getRealPhoneImages(p.slug, p.brand, p.name);
  p.images = p.images.map((orig, idx) => {
    const real = realImages[idx % realImages.length];
    return {
      src: real.src,
      alt: `${p.name} ${orig.color || real.alt}`,
      color: orig.color || "Standard"
    };
  });
  // Clean warranty
  if (p.warranty) {
    p.warranty = p.warranty.replace(/\s*\+\s*2-Year Store Assistance\*/g, "");
    p.warranty = p.warranty.replace(/2-Year Extended Store Warranty\*/g, "Official Brand Warranty");
  }
}

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
console.log(`Successfully updated ${products.length} products with real smartphone photography & cleaned warranty!`);
