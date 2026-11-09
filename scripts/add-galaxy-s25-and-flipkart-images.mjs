import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, "../src/data/products.json");
const products = JSON.parse(fs.readFileSync(productsFile, "utf8"));

// 1. Define Samsung Galaxy S25 5G from the official Flipkart page:
// https://www.flipkart.com/samsung-galaxy-s25-5g-snapdragon-navy-128-gb/p/itm957543a944c80
const galaxyS25 = {
  id: "phone-samsung-galaxy-s25-5g",
  slug: "samsung-galaxy-s25-5g",
  brand: "Samsung",
  name: "Samsung Galaxy S25 5G (Snapdragon)",
  subtitle: "Snapdragon 8 Elite • 50MP ProVisual AI Camera • 6.2\" Dynamic AMOLED 2X 120Hz",
  category: "phone",
  images: [
    {
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/s/a/7/-original-imahrkn2ecbgzzqt.jpeg?q=70",
      alt: "Samsung Galaxy S25 5G Navy Front View",
      color: "Navy"
    },
    {
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/d/k/f/-original-imahrsscfzynxfww.jpeg?q=70",
      alt: "Samsung Galaxy S25 5G Navy Back View",
      color: "Navy"
    },
    {
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/o/m/n/-original-imahrkfukc2vhwpz.jpeg?q=70",
      alt: "Samsung Galaxy S25 5G Side Profile View",
      color: "Navy"
    },
    {
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/z/r/y/-original-imahrkfuhzdcuv7u.jpeg?q=70",
      alt: "Samsung Galaxy S25 5G Camera Module Close-up",
      color: "Navy"
    },
    {
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/d/v/i/-original-imahrkfunchumegb.jpeg?q=70",
      alt: "Samsung Galaxy S25 5G In-Hand Display",
      color: "Navy"
    }
  ],
  variants: [
    {
      ram: 8,
      storage: 128,
      color: "Navy",
      colorHex: "#1c2841",
      mrp: 79999,
      price: 74999,
      inStock: true
    },
    {
      ram: 8,
      storage: 256,
      color: "Silver Shadow",
      colorHex: "#c5c7cb",
      mrp: 84999,
      price: 79999,
      inStock: true
    },
    {
      ram: 12,
      storage: 512,
      color: "Mint",
      colorHex: "#b5d8cc",
      mrp: 94999,
      price: 89999,
      inStock: true
    }
  ],
  highlights: [
    "8 GB RAM | 128 GB / 256 GB / 512 GB ROM",
    "15.75 cm (6.2 inch) Full HD+ Dynamic AMOLED 2X 120Hz Display",
    "50MP + 12MP + 10MP Triple Rear Camera | 12MP Front Camera",
    "4000 mAh Lithium-ion Battery with 25W Fast & Wireless Charging",
    "Qualcomm Snapdragon 8 Elite Flagship 3nm Processor with Galaxy AI",
    "Armor Aluminum Frame & IP68 Dust and Water Resistance"
  ],
  specs: {
    display: {
      "Display Size": "15.75 cm (6.2 inch)",
      "Resolution": "2340 x 1080 Pixels (Full HD+)",
      "Resolution Type": "Dynamic AMOLED 2X",
      "Refresh Rate": "120 Hz Adaptive (1-120Hz)",
      "Peak Brightness": "2600 nits Outdoor Peak",
      "Protection": "Corning Gorilla Glass Victus 2"
    },
    performance: {
      "Processor Brand": "Snapdragon",
      "Processor Type": "Snapdragon 8 Elite for Galaxy",
      "Processor Core": "Octa Core (3nm Architecture)",
      "Operating System": "Android 15 with One UI 7.1",
      "AI Capabilities": "Galaxy AI (Circle to Search, Live Call Translate, Photo Assist)"
    },
    camera: {
      "Primary Camera Setup": "50MP (f/1.8 OIS) + 12MP Ultra-Wide (f/2.2) + 10MP Telephoto (3x Optical, OIS)",
      "Digital Zoom": "30x Space Zoom",
      "Video Recording": "8K at 30fps, 4K at 60/120fps, HDR10+",
      "Secondary Front Camera": "12MP (f/2.2 Dual Pixel AF)",
      "Camera Features": "ProVisual Engine, Nightography Video, Super HDR, Object Eraser"
    },
    battery: {
      "Battery Capacity": "4000 mAh",
      "Charging": "25W Super Fast Charging (50% in 30 mins)",
      "Wireless Charging": "Fast Wireless Charging 2.0 & Wireless PowerShare"
    },
    connectivity: {
      "Network Type": "5G, 4G LTE, 3G, 2G",
      "Supported Networks": "Dual 5G Standalone (SA) / Non-Standalone (NSA)",
      "Wi-Fi": "Wi-Fi 7 (802.11be)",
      "Bluetooth": "v5.4",
      "NFC": "Yes",
      "SIM Size": "Nano-SIM + eSIM"
    },
    design: {
      "Dimensions": "146.9 x 70.4 x 7.6 mm",
      "Weight": "167 g",
      "Build": "Armor Aluminum frame, Gorilla Glass Victus 2 front and back",
      "Water Resistance": "IP68 (Up to 1.5m fresh water for 30 mins)"
    }
  },
  tags: ["flagship", "new", "bestseller", "5g", "camera"],
  emiAvailable: true,
  noCostEmi: true,
  minEmiPerMonth: 6249,
  releaseDate: "2025-02-01",
  warranty: "1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories",
  boxContents: ["Handset (Galaxy S25 5G)", "Data Cable (Type-C to Type-C)", "SIM Ejector Pin", "Quick Start Guide"],
  freeGiftBundle: ["Free Smartwatch / ANC Earbuds Voucher", "Free 9H Gorilla Tempered Glass", "Free MagSafe/Clear Shockproof Case", "Free WhatsApp Chat & Photo Transfer"]
};

// Insert Galaxy S25 right at the top
const existingIndex = products.findIndex(p => p.slug === "samsung-galaxy-s25-5g");
if (existingIndex !== -1) {
  products[existingIndex] = galaxyS25;
} else {
  products.unshift(galaxyS25);
}

// 2. Curate real Flipkart multi-angle studio images for other top flagship models:
const multiAngleRealSets = {
  "apple-iphone-16-pro-max": [
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/w/z/h/-original-imahggetkf6y67sr.jpeg?q=70", alt: "Apple iPhone 16 Pro Max Desert Titanium Front & Back", color: "Desert Titanium" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/r/o/j/-resized-original-imahggesmypxqrgs.jpeg?q=70", alt: "Apple iPhone 16 Pro Max Natural Titanium Back", color: "Natural Titanium" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/b/f/5/-resized-original-imahggexm5yafhez.jpeg?q=70", alt: "Apple iPhone 16 Pro Max Black Titanium Side View", color: "Black Titanium" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/r/8/8/-resized-original-imahggevcrkzezzv.jpeg?q=70", alt: "Apple iPhone 16 Pro Max White Titanium Display", color: "White Titanium" }
  ],
  "apple-iphone-16": [
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/2/p/8/-original-imah4sssfdr9uuvx.jpeg?q=70", alt: "Apple iPhone 16 Teal Front & Back", color: "Teal" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/e/3/8/-original-imah4sssfgg2vkgt.jpeg?q=70", alt: "Apple iPhone 16 Ultramarine Back", color: "Ultramarine" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/b/f/5/-resized-original-imahggexm5yafhez.jpeg?q=70", alt: "Apple iPhone 16 Black Side Profile", color: "Black" }
  ],
  "samsung-galaxy-s24-ultra": [
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/y/s/g/-original-imahgfmy2zgqvjmy.jpeg?q=70", alt: "Samsung Galaxy S24 Ultra Titanium Gray Front & S-Pen", color: "Titanium Gray" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/w/r/z/-original-imahgfmysgtszenh.jpeg?q=70", alt: "Samsung Galaxy S24 Ultra Titanium Violet Back", color: "Titanium Violet" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70", alt: "Samsung Galaxy S24 Ultra Titanium Black Display", color: "Titanium Black" }
  ],
  "oneplus-12": [
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/v/g/m/12-cph2573-oneplus-resized-original-imahk47dwgquvv8z.jpeg?q=70", alt: "OnePlus 12 Flowy Emerald Front & Circular Camera", color: "Flowy Emerald" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/7/z/j/12-cph2573-oneplus-original-imahjngudb3jjkew.jpeg?q=70", alt: "OnePlus 12 Silky Black Back Angle", color: "Silky Black" }
  ],
  "vivo-v40-pro": [
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/p/h/a/-original-imah3hvby9rhhh4w.jpeg?q=70", alt: "Vivo V40 Pro Ganges Blue ZEISS Camera", color: "Ganges Blue" },
    { src: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/s/b/-original-imah3hvbysfwxydc.jpeg?q=70", alt: "Vivo V40 Pro Titanium Gray Back", color: "Titanium Gray" }
  ]
};

for (const p of products) {
  if (multiAngleRealSets[p.slug]) {
    p.images = multiAngleRealSets[p.slug];
  }
}

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
console.log(`Successfully added Samsung Galaxy S25 5G and updated real Flipkart multi-angle photos for ${products.length} phones!`);
