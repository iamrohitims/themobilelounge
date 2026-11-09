import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedProducts = [
  // --- APPLE ---
  {
    id: "phone-apple-iphone-16-pro-max",
    slug: "apple-iphone-16-pro-max",
    brand: "Apple",
    name: "Apple iPhone 16 Pro Max",
    subtitle: "A18 Pro • 48MP Fusion • Grade 5 Titanium • Apple Intelligence",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-16-pro-max/desert-titanium.svg", alt: "Apple iPhone 16 Pro Max Desert Titanium", color: "Desert Titanium" },
      { src: "/products/apple-iphone-16-pro-max/natural-titanium.svg", alt: "Apple iPhone 16 Pro Max Natural Titanium", color: "Natural Titanium" },
      { src: "/products/apple-iphone-16-pro-max/black-titanium.svg", alt: "Apple iPhone 16 Pro Max Black Titanium", color: "Black Titanium" }
    ],
    variants: [
      { ram: 8, storage: 256, color: "Desert Titanium", colorHex: "#d4b896", mrp: 144900, price: 134990, inStock: true },
      { ram: 8, storage: 512, color: "Natural Titanium", colorHex: "#9d9a94", mrp: 164900, price: 154990, inStock: true },
      { ram: 8, storage: 1000, color: "Black Titanium", colorHex: "#2b2b2b", mrp: 184900, price: 174990, inStock: true }
    ],
    highlights: [
      "6.9-inch Super Retina XDR ProMotion 120Hz display with thinnest borders ever",
      "A18 Pro chip with 6-core GPU built for advanced Apple Intelligence",
      "Camera Control button for instant zoom, focus, and aperture control",
      "48MP Fusion + 48MP Ultra Wide + 5x Telephoto prism zoom lens",
      "Up to 33 hours video playback with MagSafe Qi2 wireless charging"
    ],
    specs: {
      display: { "Size & Type": "6.9\" Super Retina XDR OLED ProMotion 120Hz", "Resolution": "2868 x 1320 pixels (460 ppi)", "Brightness": "2000 nits peak outdoor", "Protection": "Latest-generation Ceramic Shield" },
      performance: { "Processor": "Apple A18 Pro Bionic (3nm)", "Neural Engine": "16-core Neural Engine", "OS": "iOS 18 (Apple Intelligence ready)" },
      camera: { "Main": "48MP Fusion (f/1.78, Sensor-shift OIS)", "Ultra Wide": "48MP (f/2.2, 120° FOV, Macro)", "Telephoto": "12MP 5x Tetraprism (f/2.8, 120mm)", "Front Camera": "12MP TrueDepth (f/1.9, 4K60 Dolby Vision)" },
      battery: { "Capacity": "4685 mAh equivalent", "Charging": "50% in 30 mins (25W+ MagSafe or USB-C)", "Connector": "USB Type-C (USB 3 up to 10Gbps)" },
      connectivity: { "5G": "Sub-6GHz with 4x4 MIMO", "Wi-Fi": "Wi-Fi 7 (802.11be)", "Bluetooth": "v5.3", "SIM": "Dual SIM (Nano-SIM + eSIM)" },
      design: { "Materials": "Grade 5 Titanium frame with textured matte glass back", "Weight": "227g", "Water Resistance": "IP68 (6m up to 30 mins)" }
    },
    tags: ["new", "flagship", "bestseller", "camera", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 9999,
    releaseDate: "2024-09-20",
    warranty: "1 Year Official Apple India Warranty ",
    boxContents: ["iPhone 16 Pro Max", "USB-C to USB-C Braided Cable (1m)", "Documentation"],
    freeGiftBundle: ["Free Smartwatch / ANC Earbuds Voucher", "Free 9H Tempered Glass", "Free MagSafe Case"]
  },
  {
    id: "phone-apple-iphone-16-pro",
    slug: "apple-iphone-16-pro",
    brand: "Apple",
    name: "Apple iPhone 16 Pro",
    subtitle: "A18 Pro • 6.3\" ProMotion • 5x Optical Zoom • Camera Control",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-16-pro/desert-titanium.svg", alt: "Apple iPhone 16 Pro Desert Titanium", color: "Desert Titanium" },
      { src: "/products/apple-iphone-16-pro/white-titanium.svg", alt: "Apple iPhone 16 Pro White Titanium", color: "White Titanium" }
    ],
    variants: [
      { ram: 8, storage: 128, color: "Desert Titanium", colorHex: "#d4b896", mrp: 119900, price: 111990, inStock: true },
      { ram: 8, storage: 256, color: "White Titanium", colorHex: "#e3e4e5", mrp: 129900, price: 121990, inStock: true }
    ],
    highlights: [
      "Compact 6.3-inch ProMotion 120Hz display with aerospace Titanium build",
      "5x Telephoto zoom lens now on the smaller Pro size",
      "Dedicated touch-sensitive Camera Control button",
      "ProRes 4K120 fps video recording & studio-quality 4-mic array"
    ],
    specs: {
      display: { "Size & Type": "6.3\" Super Retina XDR ProMotion OLED 120Hz", "Resolution": "2622 x 1206 pixels", "Brightness": "2000 nits peak" },
      performance: { "Processor": "A18 Pro (3nm)", "OS": "iOS 18 with Apple Intelligence" },
      camera: { "Main": "48MP Fusion", "Ultra Wide": "48MP", "Telephoto": "12MP 5x", "Front": "12MP TrueDepth" },
      battery: { "Video Playback": "Up to 27 hours", "Charging": "USB-C fast charge" },
      connectivity: { "5G": "Yes", "Wi-Fi": "Wi-Fi 7", "Bluetooth": "v5.3" },
      design: { "Build": "Titanium Frame", "Weight": "199g", "Water Resistance": "IP68" }
    },
    tags: ["new", "flagship", "camera", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 8299,
    releaseDate: "2024-09-20",
    warranty: "1 Year Official Apple Warranty",
    boxContents: ["iPhone 16 Pro", "USB-C Cable", "Manual"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "9H Glass & Case"]
  },
  {
    id: "phone-apple-iphone-16-plus",
    slug: "apple-iphone-16-plus",
    brand: "Apple",
    name: "Apple iPhone 16 Plus",
    subtitle: "A18 Chip • 6.7\" Display • Record Battery Life • Action Button",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-16-plus/ultramarine.svg", alt: "Apple iPhone 16 Plus Ultramarine", color: "Ultramarine" },
      { src: "/products/apple-iphone-16-plus/pink.svg", alt: "Apple iPhone 16 Plus Pink", color: "Pink" }
    ],
    variants: [
      { ram: 8, storage: 128, color: "Ultramarine", colorHex: "#3f5d94", mrp: 89900, price: 81990, inStock: true },
      { ram: 8, storage: 256, color: "Pink", colorHex: "#e397aa", mrp: 99900, price: 91990, inStock: true }
    ],
    highlights: [
      "Gigantic 6.7-inch Super Retina XDR OLED display",
      "Apple A18 Bionic chip + Camera Control button",
      "Longest battery life on any standard iPhone model (up to 27 hours)"
    ],
    specs: {
      display: { "Size & Type": "6.7\" Super Retina XDR OLED", "Resolution": "2796 x 1290 pixels" },
      performance: { "Processor": "A18 Bionic", "OS": "iOS 18" },
      camera: { "Main": "48MP 2-in-1 Fusion", "Ultra Wide": "12MP with Macro", "Front": "12MP" },
      battery: { "Playtime": "Up to 27 hrs video", "Charging": "USB-C fast charge" },
      connectivity: { "5G": "Yes", "Wi-Fi": "Wi-Fi 7", "Bluetooth": "v5.3" },
      design: { "Build": "Aluminum + Color-infused back glass", "Weight": "199g" }
    },
    tags: ["new", "bestseller", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 6199,
    releaseDate: "2024-09-20",
    warranty: "1 Year Official Apple Warranty",
    boxContents: ["iPhone 16 Plus", "USB-C Cable"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "Screen Guard & Case"]
  },
  {
    id: "phone-apple-iphone-16",
    slug: "apple-iphone-16",
    brand: "Apple",
    name: "Apple iPhone 16",
    subtitle: "A18 Chip • 48MP Fusion • Camera Control • Apple Intelligence Ready",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-16/teal.svg", alt: "Apple iPhone 16 Teal", color: "Teal" },
      { src: "/products/apple-iphone-16/ultramarine.svg", alt: "Apple iPhone 16 Ultramarine", color: "Ultramarine" },
      { src: "/products/apple-iphone-16/black.svg", alt: "Apple iPhone 16 Black", color: "Black" }
    ],
    variants: [
      { ram: 8, storage: 128, color: "Teal", colorHex: "#52948b", mrp: 79900, price: 71990, inStock: true },
      { ram: 8, storage: 256, color: "Ultramarine", colorHex: "#3f5d94", mrp: 89900, price: 81990, inStock: true }
    ],
    highlights: [
      "Brand-new Camera Control button for rapid photo taking & visual intelligence",
      "Powerful A18 Bionic processor built for Apple Intelligence",
      "48MP Fusion camera with 2x optical telephoto quality",
      "Action button replaces traditional ring/silent switch"
    ],
    specs: {
      display: { "Size & Type": "6.1\" Super Retina XDR OLED", "Resolution": "2556 x 1179 pixels", "Brightness": "2000 nits peak" },
      performance: { "Processor": "Apple A18 Bionic (3nm)", "RAM": "8GB", "OS": "iOS 18" },
      camera: { "Main": "48MP Fusion (f/1.6, OIS)", "Ultra Wide": "12MP (f/2.2, Macro)", "Front": "12MP TrueDepth" },
      battery: { "Video Playback": "Up to 22 hours", "Charging": "USB-C, MagSafe 25W" },
      connectivity: { "5G": "Sub-6GHz", "Wi-Fi": "Wi-Fi 7", "Bluetooth": "v5.3" },
      design: { "Build": "Aerospace-grade Aluminum", "Weight": "170g", "Water Resistance": "IP68" }
    },
    tags: ["new", "bestseller", "camera", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 5399,
    releaseDate: "2024-09-20",
    warranty: "1 Year Official Apple Warranty",
    boxContents: ["iPhone 16", "USB-C Cable", "SIM Pin"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "9H Glass & Case"]
  },
  {
    id: "phone-apple-iphone-15-pro-max",
    slug: "apple-iphone-15-pro-max",
    brand: "Apple",
    name: "Apple iPhone 15 Pro Max",
    subtitle: "A17 Pro • 5x Telephoto • Natural Titanium • Dynamic Island",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-15-pro-max/natural-titanium.svg", alt: "Apple iPhone 15 Pro Max Natural Titanium", color: "Natural Titanium" }
    ],
    variants: [
      { ram: 8, storage: 256, color: "Natural Titanium", colorHex: "#9d9a94", mrp: 139900, price: 119990, inStock: true }
    ],
    highlights: [
      "Aerospace-grade Titanium design with Action Button",
      "A17 Pro chip for hardware-accelerated console ray tracing games",
      "5x Periscope telephoto camera"
    ],
    specs: {
      display: { "Size": "6.7\" ProMotion 120Hz OLED" },
      performance: { "Chip": "A17 Pro (3nm)" },
      camera: { "Setup": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto" },
      battery: { "Playback": "29 hrs video" },
      connectivity: { "Port": "USB-C 3.0 (10Gbps)" },
      design: { "Material": "Titanium", "Weight": "221g" }
    },
    tags: ["flagship", "camera", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 8999,
    releaseDate: "2023-09-22",
    warranty: "1 Year Apple India Warranty",
    boxContents: ["iPhone 15 Pro Max", "USB-C Braided Cable"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "9H Glass & Case"]
  },
  {
    id: "phone-apple-iphone-15",
    slug: "apple-iphone-15",
    brand: "Apple",
    name: "Apple iPhone 15",
    subtitle: "Dynamic Island • 48MP Main • USB-C • Color-Infused Glass",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-15/black.svg", alt: "Apple iPhone 15 Black", color: "Black" },
      { src: "/products/apple-iphone-15/blue.svg", alt: "Apple iPhone 15 Blue", color: "Blue" },
      { src: "/products/apple-iphone-15/pink.svg", alt: "Apple iPhone 15 Pink", color: "Pink" }
    ],
    variants: [
      { ram: 6, storage: 128, color: "Black", colorHex: "#1c1d1f", mrp: 69900, price: 58990, inStock: true },
      { ram: 6, storage: 256, color: "Blue", colorHex: "#dbe5ec", mrp: 79900, price: 68990, inStock: true }
    ],
    highlights: [
      "Dynamic Island brings alerts and Live Activities seamlessly to your screen",
      "48MP Main camera with 2x optical zoom capability",
      "Universal USB-C charging connector",
      "Durable color-infused glass and Ceramic Shield"
    ],
    specs: {
      display: { "Size & Type": "6.1\" Super Retina XDR OLED", "Resolution": "2556 x 1179 pixels", "Brightness": "2000 nits peak" },
      performance: { "Processor": "A16 Bionic (4nm)", "OS": "iOS 18 Upgradeable" },
      camera: { "Main": "48MP (f/1.6, OIS)", "Ultra Wide": "12MP (f/2.4, 120°)", "Front": "12MP TrueDepth" },
      battery: { "Video": "Up to 20 hours", "Port": "USB-C 2.0" },
      connectivity: { "5G": "Yes", "Wi-Fi": "Wi-Fi 6", "Bluetooth": "v5.3" },
      design: { "Weight": "171g", "Water Resistance": "IP68" }
    },
    tags: ["bestseller", "camera", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 4399,
    releaseDate: "2023-09-22",
    warranty: "1 Year Official Apple Warranty",
    boxContents: ["iPhone 15", "USB-C Cable"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "9H Glass & Case"]
  },
  {
    id: "phone-apple-iphone-13",
    slug: "apple-iphone-13",
    brand: "Apple",
    name: "Apple iPhone 13",
    subtitle: "A15 Bionic • Cinematic Mode 4K • Dual 12MP OIS • 5G",
    category: "phone",
    images: [
      { src: "/products/apple-iphone-13/midnight.svg", alt: "Apple iPhone 13 Midnight", color: "Midnight" },
      { src: "/products/apple-iphone-13/starlight.svg", alt: "Apple iPhone 13 Starlight", color: "Starlight" }
    ],
    variants: [
      { ram: 4, storage: 128, color: "Midnight", colorHex: "#1f2024", mrp: 59900, price: 44990, inStock: true }
    ],
    highlights: [
      "Most affordable entry into the genuine Apple iPhone ecosystem",
      "Blazing-fast A15 Bionic processor with 5G connectivity",
      "Cinematic mode in 1080p and 4K HDR Dolby Vision recording"
    ],
    specs: {
      display: { "Size": "6.1\" Super Retina XDR OLED", "Resolution": "2532 x 1170 pixels" },
      performance: { "Processor": "Apple A15 Bionic" },
      camera: { "Setup": "12MP Wide (Sensor-shift OIS) + 12MP Ultra Wide" },
      battery: { "Life": "Up to 19 hours video playback" },
      connectivity: { "5G": "Yes", "Port": "Lightning" },
      design: { "Weight": "173g", "Rating": "IP68" }
    },
    tags: ["bestseller", "budget", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 3299,
    releaseDate: "2021-09-24",
    warranty: "1 Year Apple India Warranty",
    boxContents: ["iPhone 13", "USB-C to Lightning Cable"],
    freeGiftBundle: ["Free 20W Fast Adapter Combo", "Tempered Glass & Cover"]
  },

  // --- SAMSUNG ---
  {
    id: "phone-samsung-galaxy-s24-ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    name: "Samsung Galaxy S24 Ultra 5G",
    subtitle: "200MP Quad Zoom • Snapdragon 8 Gen 3 • Titanium • S-Pen & Galaxy AI",
    category: "phone",
    images: [
      { src: "/products/samsung-galaxy-s24-ultra/titanium-gray.svg", alt: "Samsung Galaxy S24 Ultra Titanium Gray", color: "Titanium Gray" },
      { src: "/products/samsung-galaxy-s24-ultra/titanium-black.svg", alt: "Samsung Galaxy S24 Ultra Titanium Black", color: "Titanium Black" }
    ],
    variants: [
      { ram: 12, storage: 256, color: "Titanium Gray", colorHex: "#686762", mrp: 129999, price: 109990, inStock: true },
      { ram: 12, storage: 512, color: "Titanium Black", colorHex: "#2b2a29", mrp: 139999, price: 119990, inStock: true }
    ],
    highlights: [
      "Industry-leading 200MP camera with 100x Space Zoom & AI Nightography",
      "Titanium frame with anti-reflective Corning Gorilla Armor glass",
      "Full Galaxy AI suite: Circle to Search, Live Call Translation & Note Assist",
      "Built-in Bluetooth S-Pen for writing, drawing, and remote camera control"
    ],
    specs: {
      display: { "Size & Type": "6.8\" Dynamic AMOLED 2X 1-120Hz Flat", "Resolution": "QHD+ (3120 x 1440 pixels)", "Brightness": "2600 nits peak" },
      performance: { "Chipset": "Snapdragon 8 Gen 3 for Galaxy (4nm)", "RAM": "12GB LPDDR5X", "OS": "One UI 6.1 (7 Years OS updates guaranteed)" },
      camera: { "Main": "200MP (f/1.7, OIS)", "Periscope Telephoto": "50MP 5x Optical (10x Optical Quality)", "Telephoto": "10MP 3x", "Ultra Wide": "12MP", "Front": "12MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "45W Wired (65% in 30 mins) + 15W Wireless" },
      connectivity: { "5G": "Dual 5G Bands", "Wi-Fi": "Wi-Fi 7", "Bluetooth": "v5.3", "UWB": "Yes" },
      design: { "Chassis": "Grade 2 Titanium Frame", "Weight": "232g", "Rating": "IP68 Water Resistant" }
    },
    tags: ["flagship", "camera", "gaming", "5g", "bestseller"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 7999,
    releaseDate: "2024-01-24",
    warranty: "1 Year Samsung India Warranty",
    boxContents: ["Galaxy S24 Ultra", "S-Pen", "Type-C Cable", "SIM Ejector"],
    freeGiftBundle: ["Free Smartwatch / ANC Buds Voucher", "45W Fast Adapter Combo", "Curved Glass & Case"]
  },
  {
    id: "phone-samsung-galaxy-s24-plus",
    slug: "samsung-galaxy-s24-plus",
    brand: "Samsung",
    name: "Samsung Galaxy S24+ 5G",
    subtitle: "QHD+ 120Hz Display • 12GB RAM • 4900mAh • Galaxy AI",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-s24-plus/onyx-black.svg", alt: "Samsung Galaxy S24+ Onyx Black", color: "Onyx Black" }],
    variants: [
      { ram: 12, storage: 256, color: "Onyx Black", colorHex: "#222222", mrp: 99999, price: 79990, inStock: true }
    ],
    highlights: ["6.7\" QHD+ Dynamic AMOLED 2X display", "12GB RAM standard + Galaxy AI features", "4900mAh battery with 45W super fast charge"],
    specs: {
      display: { "Size": "6.7\" QHD+ Dynamic AMOLED 2X 120Hz" },
      performance: { "Processor": "Exynos 2400 Deca-Core / Snapdragon 8 Gen 3" },
      camera: { "Setup": "50MP Main OIS + 10MP 3x + 12MP Ultra Wide" },
      battery: { "Capacity": "4900 mAh", "Charging": "45W" },
      connectivity: { "5G": "Yes" },
      design: { "Armor Aluminum": "Yes", "Rating": "IP68" }
    },
    tags: ["flagship", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 5999,
    releaseDate: "2024-01-24",
    warranty: "1 Year Official Samsung Warranty",
    boxContents: ["Galaxy S24+", "Type-C Cable"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-samsung-galaxy-s24",
    slug: "samsung-galaxy-s24",
    brand: "Samsung",
    name: "Samsung Galaxy S24 5G",
    subtitle: "Compact Flagship • 6.2\" 120Hz AMOLED • 50MP AI • One UI 6",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-s24/amber-yellow.svg", alt: "Samsung Galaxy S24 Amber Yellow", color: "Amber Yellow" }],
    variants: [
      { ram: 8, storage: 128, color: "Amber Yellow", colorHex: "#ebd891", mrp: 74999, price: 62990, inStock: true },
      { ram: 8, storage: 256, color: "Cobalt Violet", colorHex: "#4f455c", mrp: 79999, price: 67990, inStock: true }
    ],
    highlights: ["Ultra-compact 6.2\" size that fits comfortably in one hand", "Full Galaxy AI capabilities", "7 years of Android OS and security upgrades"],
    specs: {
      display: { "Size": "6.2\" Dynamic AMOLED 2X 120Hz" },
      performance: { "Chip": "Exynos 2400 (4nm)" },
      camera: { "Setup": "50MP OIS + 10MP 3x + 12MP Ultra Wide" },
      battery: { "Capacity": "4000 mAh", "Charging": "25W" },
      connectivity: { "5G": "Yes" },
      design: { "Weight": "167g", "Rating": "IP68" }
    },
    tags: ["flagship", "5g", "bestseller"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 4699,
    releaseDate: "2024-01-24",
    warranty: "1 Year Samsung Warranty",
    boxContents: ["Galaxy S24", "USB-C Cable"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "Tempered Glass & Case"]
  },
  {
    id: "phone-samsung-galaxy-s23-fe",
    slug: "samsung-galaxy-s23-fe",
    brand: "Samsung",
    name: "Samsung Galaxy S23 FE 5G",
    subtitle: "Fan Edition Flagship • 50MP Nightography • 120Hz AMOLED • IP68",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-s23-fe/mint.svg", alt: "Samsung Galaxy S23 FE Mint", color: "Mint" }],
    variants: [
      { ram: 8, storage: 128, color: "Mint", colorHex: "#b7d5c7", mrp: 54999, price: 37990, inStock: true }
    ],
    highlights: ["Flagship S-series features at mid-range pricing", "50MP pro camera with 3x optical zoom", "IP68 water resistance & wireless charging"],
    specs: {
      display: { "Size": "6.4\" Dynamic AMOLED 2X 120Hz" },
      performance: { "Processor": "Exynos 2200 4nm" },
      camera: { "Setup": "50MP + 8MP 3x + 12MP" },
      battery: { "Capacity": "4500 mAh", "Charging": "25W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP68" }
    },
    tags: ["bestseller", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2899,
    releaseDate: "2023-10-10",
    warranty: "1 Year Samsung Warranty",
    boxContents: ["Phone", "USB Cable"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-samsung-galaxy-a55",
    slug: "samsung-galaxy-a55-5g",
    brand: "Samsung",
    name: "Samsung Galaxy A55 5G",
    subtitle: "Metal Frame • 50MP OIS • Gorilla Glass Victus+ • 5000mAh",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-a55/awesome-iceblue.svg", alt: "Samsung Galaxy A55 Awesome Iceblue", color: "Awesome Iceblue" }],
    variants: [
      { ram: 8, storage: 128, color: "Awesome Iceblue", colorHex: "#c5d7e8", mrp: 42999, price: 34990, inStock: true },
      { ram: 12, storage: 256, color: "Awesome Navy", colorHex: "#283344", mrp: 48999, price: 39990, inStock: true }
    ],
    highlights: ["Premium metal side rails and glass back", "50MP OIS triple camera with Knox Security vault", "4 major OS updates + 5 years security patches"],
    specs: {
      display: { "Size": "6.6\" Super AMOLED 120Hz", "Protection": "Gorilla Glass Victus+" },
      performance: { "Processor": "Exynos 1480 with AMD Xclipse 530 GPU" },
      camera: { "Setup": "50MP OIS + 12MP Ultra Wide + 5MP Macro" },
      battery: { "Capacity": "5000 mAh", "Charging": "25W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP67" }
    },
    tags: ["bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2699,
    releaseDate: "2024-03-15",
    warranty: "1 Year Samsung Warranty",
    boxContents: ["Galaxy A55", "Type-C Cable"],
    freeGiftBundle: ["Free Earbuds / Watch Voucher", "9H Glass & Case"]
  },
  {
    id: "phone-samsung-galaxy-a35",
    slug: "samsung-galaxy-a35-5g",
    brand: "Samsung",
    name: "Samsung Galaxy A35 5G",
    subtitle: "Super AMOLED 120Hz • 50MP OIS • IP67 Water Resistant",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-a35/awesome-lilac.svg", alt: "Samsung Galaxy A35 Awesome Lilac", color: "Awesome Lilac" }],
    variants: [
      { ram: 8, storage: 128, color: "Awesome Lilac", colorHex: "#d8c7dc", mrp: 33999, price: 27990, inStock: true }
    ],
    highlights: ["6.6\" Super AMOLED 120Hz punch-hole display", "50MP OIS primary camera", "IP67 dust and water resistance"],
    specs: {
      display: { "Size": "6.6\" FHD+ Super AMOLED 120Hz" },
      performance: { "Processor": "Exynos 1380 (5nm)" },
      camera: { "Main": "50MP OIS + 8MP + 5MP" },
      battery: { "Capacity": "5000 mAh" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP67" }
    },
    tags: ["5g"],
    emiAvailable: true,
    minEmiPerMonth: 2199,
    releaseDate: "2024-03-15",
    warranty: "1 Year Samsung Warranty",
    boxContents: ["Phone", "Cable"],
    freeGiftBundle: ["Free Smartwatch", "Glass & Cover"]
  },
  {
    id: "phone-samsung-galaxy-m35",
    slug: "samsung-galaxy-m35-5g",
    brand: "Samsung",
    name: "Samsung Galaxy M35 5G",
    subtitle: "Monster 6000mAh Battery • 120Hz AMOLED • 50MP OIS • Vapor Chamber",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-m35/dark-blue.svg", alt: "Samsung Galaxy M35 Dark Blue", color: "Dark Blue" }],
    variants: [
      { ram: 6, storage: 128, color: "Dark Blue", colorHex: "#1c2b42", mrp: 21499, price: 16990, inStock: true },
      { ram: 8, storage: 128, color: "Thunder Grey", colorHex: "#45484c", mrp: 23499, price: 18490, inStock: true }
    ],
    highlights: ["Massive 6000mAh battery lasts 2 full days", "50MP camera with Optical Image Stabilization (OIS)", "Vapor chamber liquid cooling for non-stop gaming"],
    specs: {
      display: { "Size": "6.6\" Super AMOLED 120Hz FHD+" },
      performance: { "Chip": "Exynos 1380 with Vapor Chamber Cooling" },
      camera: { "Setup": "50MP OIS + 8MP + 2MP" },
      battery: { "Capacity": "6000 mAh", "Charging": "25W" },
      connectivity: { "5G": "12 5G Bands" },
      design: { "Weight": "222g" }
    },
    tags: ["bestseller", "budget", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1399,
    releaseDate: "2024-07-17",
    warranty: "1 Year Official Warranty",
    boxContents: ["Galaxy M35", "Type-C Cable"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-samsung-galaxy-m15",
    slug: "samsung-galaxy-m15-5g",
    brand: "Samsung",
    name: "Samsung Galaxy M15 5G",
    subtitle: "Super AMOLED 90Hz • 6000mAh Battery • 50MP Triple Camera",
    category: "phone",
    images: [{ src: "/products/samsung-galaxy-m15/celestial-blue.svg", alt: "Samsung Galaxy M15 Celestial Blue", color: "Celestial Blue" }],
    variants: [
      { ram: 4, storage: 128, color: "Celestial Blue", colorHex: "#99b5d1", mrp: 15999, price: 11990, inStock: true },
      { ram: 6, storage: 128, color: "Stone Grey", colorHex: "#4f5255", mrp: 17499, price: 13490, inStock: true }
    ],
    highlights: ["Only phone in segment with genuine Super AMOLED display", "Mammoth 6000mAh battery", "4 generations of Android upgrades promised"],
    specs: {
      display: { "Size": "6.5\" Super AMOLED 90Hz" },
      performance: { "Chip": "MediaTek Dimensity 6100+ 5G" },
      camera: { "Main": "50MP + 5MP + 2MP" },
      battery: { "Capacity": "6000 mAh" },
      connectivity: { "5G": "Yes" },
      design: { "Weight": "217g" }
    },
    tags: ["budget", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 999,
    releaseDate: "2024-04-08",
    warranty: "1 Year Samsung Warranty",
    boxContents: ["Galaxy M15", "Cable"],
    freeGiftBundle: ["Free Earbuds", "Glass & Cover"]
  },

  // --- ONEPLUS ---
  {
    id: "phone-oneplus-12",
    slug: "oneplus-12-5g",
    brand: "OnePlus",
    name: "OnePlus 12 5G",
    subtitle: "Snapdragon 8 Gen 3 • 4th Gen Hasselblad • 5400mAh • 100W SuperVOOC",
    category: "phone",
    images: [{ src: "/products/oneplus-12/flowy-emerald.svg", alt: "OnePlus 12 Flowy Emerald", color: "Flowy Emerald" }],
    variants: [
      { ram: 12, storage: 256, color: "Flowy Emerald", colorHex: "#2b4a3f", mrp: 64999, price: 58990, inStock: true },
      { ram: 16, storage: 512, color: "Silky Black", colorHex: "#1f1f1f", mrp: 69999, price: 63990, inStock: true }
    ],
    highlights: ["Ultra-flagship 2K 120Hz ProXDR display with 4500 nits peak brightness", "Sony LYT-808 50MP sensor with Hasselblad color tuning", "Charges 1 to 100% in just 26 minutes with 100W in-box charger"],
    specs: {
      display: { "Size": "6.82\" 2K 120Hz ProXDR LTPO AMOLED", "Brightness": "4500 nits" },
      performance: { "Processor": "Snapdragon 8 Gen 3 (4nm)", "Cooling": "Dual Cryo-velocity VC" },
      camera: { "Setup": "50MP LYT-808 OIS + 64MP 3x Periscope + 48MP Ultra Wide" },
      battery: { "Capacity": "5400 mAh", "Charging": "100W Wired + 50W AIRVOOC" },
      connectivity: { "5G": "Dual 5G", "Wi-Fi": "Wi-Fi 7", "IR Blaster": "Yes" },
      design: { "Rating": "IP65", "Weight": "220g" }
    },
    tags: ["flagship", "camera", "gaming", "5g", "bestseller"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 4499,
    releaseDate: "2024-01-23",
    warranty: "1 Year Official Brand Warranty",
    boxContents: ["OnePlus 12", "100W Power Adapter", "Type-A to Type-C Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "Tempered Glass"]
  },
  {
    id: "phone-oneplus-12r",
    slug: "oneplus-12r-5g",
    brand: "OnePlus",
    name: "OnePlus 12R 5G",
    subtitle: "Snapdragon 8 Gen 2 • 1.5K 120Hz LTPO 4.0 • 5500mAh Battery • 100W",
    category: "phone",
    images: [{ src: "/products/oneplus-12r/cool-blue.svg", alt: "OnePlus 12R Cool Blue", color: "Cool Blue" }],
    variants: [
      { ram: 8, storage: 128, color: "Cool Blue", colorHex: "#527598", mrp: 39999, price: 35990, inStock: true },
      { ram: 16, storage: 256, color: "Iron Gray", colorHex: "#38393b", mrp: 45999, price: 40990, inStock: true }
    ],
    highlights: ["Largest 5500mAh battery ever on any OnePlus phone", "100W SuperVOOC charger in the box", "Smooth 120Hz 4th Gen LTPO display with Aqua Touch"],
    specs: {
      display: { "Size": "6.78\" 1.5K LTPO4 AMOLED 120Hz" },
      performance: { "Chip": "Snapdragon 8 Gen 2" },
      camera: { "Setup": "50MP Sony IMX890 OIS + 8MP + 2MP" },
      battery: { "Capacity": "5500 mAh", "Charging": "100W in-box" },
      connectivity: { "5G": "Yes" },
      design: { "Frame": "Matte Aluminum" }
    },
    tags: ["bestseller", "gaming", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 2799,
    releaseDate: "2024-01-23",
    warranty: "1 Year Official Warranty",
    boxContents: ["OnePlus 12R", "100W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-oneplus-nord-4",
    slug: "oneplus-nord-4-5g",
    brand: "OnePlus",
    name: "OnePlus Nord 4 5G",
    subtitle: "All-Metal Unibody • Snapdragon 7+ Gen 3 • 5500mAh • 100W SuperVOOC",
    category: "phone",
    images: [{ src: "/products/oneplus-nord-4/mercurial-silver.svg", alt: "OnePlus Nord 4 Mercurial Silver", color: "Mercurial Silver" }],
    variants: [
      { ram: 8, storage: 128, color: "Mercurial Silver", colorHex: "#c8cbce", mrp: 29999, price: 27990, inStock: true },
      { ram: 12, storage: 256, color: "Oasis Green", colorHex: "#779685", mrp: 32999, price: 30990, inStock: true }
    ],
    highlights: ["First 5G all-metal unibody phone of the modern era", "Flagship-grade Snapdragon 7+ Gen 3 chip", "4 years of Android OS + 6 years of security updates"],
    specs: {
      display: { "Size": "6.74\" 1.5K AMOLED 120Hz", "Brightness": "2150 nits" },
      performance: { "Chipset": "Snapdragon 7+ Gen 3" },
      camera: { "Setup": "50MP Sony LYT-600 OIS + 8MP Ultra Wide" },
      battery: { "Capacity": "5500 mAh", "Charging": "100W" },
      connectivity: { "5G": "Yes", "IR Remote": "Yes" },
      design: { "Chassis": "Aircraft-grade Aluminum Unibody" }
    },
    tags: ["new", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2199,
    releaseDate: "2024-07-16",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "100W Adapter", "Red Cable"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "Tempered Glass"]
  },
  {
    id: "phone-oneplus-nord-ce4",
    slug: "oneplus-nord-ce4-5g",
    brand: "OnePlus",
    name: "OnePlus Nord CE4 5G",
    subtitle: "Snapdragon 7 Gen 3 • 100W SuperVOOC • 5500mAh • 120Hz AMOLED",
    category: "phone",
    images: [{ src: "/products/oneplus-nord-ce4/celadon-marble.svg", alt: "OnePlus Nord CE4 Celadon Marble", color: "Celadon Marble" }],
    variants: [
      { ram: 8, storage: 128, color: "Celadon Marble", colorHex: "#c0d7cb", mrp: 24999, price: 22990, inStock: true }
    ],
    highlights: ["Fastest charging in ₹25k segment: 100W SuperVOOC", "Sony LYT-600 50MP OIS camera", "Raw power from Snapdragon 7 Gen 3"],
    specs: {
      display: { "Size": "6.7\" FHD+ AMOLED 120Hz" },
      performance: { "Chip": "Snapdragon 7 Gen 3" },
      camera: { "Setup": "50MP OIS + 8MP" },
      battery: { "Capacity": "5500 mAh", "Charging": "100W in-box" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP54" }
    },
    tags: ["bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1799,
    releaseDate: "2024-04-01",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "100W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Earbuds Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-oneplus-nord-ce4-lite",
    slug: "oneplus-nord-ce4-lite-5g",
    brand: "OnePlus",
    name: "OnePlus Nord CE4 Lite 5G",
    subtitle: "5500mAh Battery • 80W SuperVOOC • 50MP Sony LYT-600 OIS • 120Hz AMOLED",
    category: "phone",
    images: [{ src: "/products/oneplus-nord-ce4-lite/mega-blue.svg", alt: "OnePlus Nord CE4 Lite Mega Blue", color: "Mega Blue" }],
    variants: [
      { ram: 8, storage: 128, color: "Mega Blue", colorHex: "#275eb5", mrp: 19999, price: 17990, inStock: true }
    ],
    highlights: ["High-brightness 2100 nits AMOLED screen", "Massive 5500mAh battery with 80W fast charging", "Dual stereo speakers with 300% Ultra Volume Mode"],
    specs: {
      display: { "Size": "6.67\" 120Hz AMOLED" },
      performance: { "Chip": "Snapdragon 695 5G" },
      camera: { "Setup": "50MP Sony LYT-600 OIS + 2MP Depth" },
      battery: { "Capacity": "5500 mAh", "Charging": "80W" },
      connectivity: { "5G": "Yes", "Headphone Jack": "3.5mm" },
      design: { "Rating": "IP54" }
    },
    tags: ["budget", "5g", "bestseller"],
    emiAvailable: true,
    minEmiPerMonth: 1399,
    releaseDate: "2024-06-24",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "80W Adapter", "Red Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },

  // --- VIVO ---
  {
    id: "phone-vivo-x100-pro",
    slug: "vivo-x100-pro-5g",
    brand: "Vivo",
    name: "Vivo X100 Pro 5G",
    subtitle: "ZEISS 1-inch Main Camera • ZEISS APO Telephoto • Dimensity 9300 • 100W",
    category: "phone",
    images: [{ src: "/products/vivo-x100-pro/asteroid-black.svg", alt: "Vivo X100 Pro Asteroid Black", color: "Asteroid Black" }],
    variants: [
      { ram: 16, storage: 512, color: "Asteroid Black", colorHex: "#1f2022", mrp: 96999, price: 89990, inStock: true }
    ],
    highlights: ["1-inch Sony IMX989 sensor with ZEISS T* lens coating", "ZEISS APO Floating Telephoto macro camera", "MediaTek Dimensity 9300 All-Big-Core flagship chipset"],
    specs: {
      display: { "Size": "6.78\" 1.5K 120Hz LTPO AMOLED 3000 nits" },
      performance: { "Chip": "Dimensity 9300 + Vivo V3 Imaging Chip" },
      camera: { "Setup": "50MP 1-inch OIS + 50MP ZEISS APO + 50MP Ultra Wide" },
      battery: { "Capacity": "5400 mAh", "Charging": "100W Wired + 50W Wireless" },
      connectivity: { "5G": "Yes" },
      design: { "Sun Halo Design": "Yes", "Rating": "IP68" }
    },
    tags: ["flagship", "camera", "5g"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 6999,
    releaseDate: "2024-01-04",
    warranty: "1 Year Vivo Warranty",
    boxContents: ["Phone", "100W FlashCharge Adapter", "Case"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "Glass & Case"]
  },
  {
    id: "phone-vivo-v40-pro",
    slug: "vivo-v40-pro-5g",
    brand: "Vivo",
    name: "Vivo V40 Pro 5G",
    subtitle: "All 50MP ZEISS Cameras • Dimensity 9200+ • 5500mAh Slim • 80W",
    category: "phone",
    images: [{ src: "/products/vivo-v40-pro/ganges-blue.svg", alt: "Vivo V40 Pro Ganges Blue", color: "Ganges Blue" }],
    variants: [
      { ram: 8, storage: 256, color: "Ganges Blue", colorHex: "#466e8c", mrp: 54999, price: 49990, inStock: true },
      { ram: 12, storage: 512, color: "Titanium Grey", colorHex: "#616366", mrp: 60999, price: 55990, inStock: true }
    ],
    highlights: ["Triple 50MP ZEISS cameras with 2x and 50x telephoto zoom", "50MP ZEISS Group Selfie camera with autofocus", "Slimmest 5500mAh phone with IP68 water resistance"],
    specs: {
      display: { "Size": "6.78\" 1.5K 120Hz 3D Curved AMOLED 4500 nits" },
      performance: { "Chip": "MediaTek Dimensity 9200+ Flagship (4nm)" },
      camera: { "Setup": "50MP Sony IMX921 OIS + 50MP Sony IMX816 Telephoto + 50MP Ultra Wide" },
      battery: { "Capacity": "5500 mAh BlueVolt", "Charging": "80W FlashCharge" },
      connectivity: { "5G": "Yes" },
      design: { "Thickness": "7.58mm Ultra-Slim", "Rating": "IP68" }
    },
    tags: ["new", "camera", "flagship", "5g", "bestseller"],
    emiAvailable: true,
    noCostEmi: true,
    minEmiPerMonth: 3899,
    releaseDate: "2024-08-07",
    warranty: "1 Year Vivo India Warranty",
    boxContents: ["Vivo V40 Pro", "80W Charger", "Type-C Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch / ANC Buds Voucher", "Glass & Case"]
  },
  {
    id: "phone-vivo-v40",
    slug: "vivo-v40-5g",
    brand: "Vivo",
    name: "Vivo V40 5G",
    subtitle: "ZEISS Cinema Portrait • 5500mAh Slimmest 3D Curve • IP68 • Aura Light",
    category: "phone",
    images: [{ src: "/products/vivo-v40/lotus-purple.svg", alt: "Vivo V40 Lotus Purple", color: "Lotus Purple" }],
    variants: [
      { ram: 8, storage: 128, color: "Lotus Purple", colorHex: "#a98ec2", mrp: 39999, price: 34990, inStock: true },
      { ram: 8, storage: 256, color: "Ganges Blue", colorHex: "#466e8c", mrp: 42999, price: 36990, inStock: true }
    ],
    highlights: ["Studio-grade ZEISS portraits with smart Aura Light", "Giant 5500mAh battery packed into a 7.58mm slim curved body", "Full IP68 submersible water resistance"],
    specs: {
      display: { "Size": "6.78\" 120Hz 3D Curved AMOLED" },
      performance: { "Chip": "Snapdragon 7 Gen 3" },
      camera: { "Setup": "50MP ZEISS OIS + 50MP ZEISS Ultra Wide + 50MP Selfie" },
      battery: { "Capacity": "5500 mAh", "Charging": "80W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP68" }
    },
    tags: ["new", "camera", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2699,
    releaseDate: "2024-08-07",
    warranty: "1 Year Official Warranty",
    boxContents: ["Vivo V40", "80W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-vivo-t3-pro",
    slug: "vivo-t3-pro-5g",
    brand: "Vivo",
    name: "Vivo T3 Pro 5G",
    subtitle: "3D Curved AMOLED • Snapdragon 7 Gen 3 • 5500mAh • Vegan Leather",
    category: "phone",
    images: [{ src: "/products/vivo-t3-pro/sandstone-orange.svg", alt: "Vivo T3 Pro Sandstone Orange", color: "Sandstone Orange" }],
    variants: [
      { ram: 8, storage: 128, color: "Sandstone Orange", colorHex: "#e37936", mrp: 29999, price: 24990, inStock: true }
    ],
    highlights: ["Premium vegan leather design with luxury watch ring camera", "Snapdragon 7 Gen 3 with 820,000+ AnTuTu benchmark score", "5500mAh battery with 80W fast charging"],
    specs: {
      display: { "Size": "6.77\" 3D Curved AMOLED 120Hz 4500 nits" },
      performance: { "Chip": "Snapdragon 7 Gen 3 (4nm)" },
      camera: { "Setup": "50MP Sony IMX882 OIS + 8MP Ultra Wide" },
      battery: { "Capacity": "5500 mAh", "Charging": "80W" },
      connectivity: { "5G": "Yes" },
      design: { "Finish": "Vegan Leather / Matte Glass" }
    },
    tags: ["bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1999,
    releaseDate: "2024-08-27",
    warranty: "1 Year Vivo Warranty",
    boxContents: ["Phone", "80W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Earbuds Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-vivo-t3x",
    slug: "vivo-t3x-5g",
    brand: "Vivo",
    name: "Vivo T3x 5G",
    subtitle: "Snapdragon 6 Gen 1 • 6000mAh Battery • 120Hz Display • Stereo Speakers",
    category: "phone",
    images: [{ src: "/products/vivo-t3x/crimson-bliss.svg", alt: "Vivo T3x Crimson Bliss", color: "Crimson Bliss" }],
    variants: [
      { ram: 4, storage: 128, color: "Crimson Bliss", colorHex: "#822637", mrp: 17499, price: 13490, inStock: true },
      { ram: 6, storage: 128, color: "Celestial Green", colorHex: "#436a56", mrp: 18999, price: 14990, inStock: true }
    ],
    highlights: ["Most powerful processor under ₹15,000 (Snapdragon 6 Gen 1)", "6000mAh battery with 44W FlashCharge", "300% audio boost dual stereo speakers"],
    specs: {
      display: { "Size": "6.72\" 120Hz FHD+" },
      performance: { "Chip": "Snapdragon 6 Gen 1 (4nm)" },
      camera: { "Setup": "50MP HD Primary + 2MP Bokeh" },
      battery: { "Capacity": "6000 mAh", "Charging": "44W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP64" }
    },
    tags: ["budget", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1099,
    releaseDate: "2024-04-17",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "44W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },

  // --- OPPO ---
  {
    id: "phone-oppo-reno-12-pro",
    slug: "oppo-reno-12-pro-5g",
    brand: "Oppo",
    name: "Oppo Reno 12 Pro 5G",
    subtitle: "AI Studio Portrait • Quad-Curved AMOLED • 50MP Telephoto • Armor Body",
    category: "phone",
    images: [{ src: "/products/oppo-reno-12-pro/sunset-gold.svg", alt: "Oppo Reno 12 Pro Sunset Gold", color: "Sunset Gold" }],
    variants: [
      { ram: 12, storage: 256, color: "Sunset Gold", colorHex: "#d8ba82", mrp: 41999, price: 36990, inStock: true }
    ],
    highlights: ["Sponge Bionic architecture with aerospace high-strength alloy body", "50MP 2x Telephoto portrait camera + 50MP autofocus selfie", "AI Eraser 2.0 & AI Clear Face photo enhancements"],
    specs: {
      display: { "Size": "6.7\" Infinite View Quad-Curved 120Hz AMOLED" },
      performance: { "Chip": "MediaTek Dimensity 7300-Energy (4nm)" },
      camera: { "Setup": "50MP Sony LYT-600 OIS + 50MP Telephoto + 8MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "80W SuperVOOC" },
      connectivity: { "5G": "Yes", "AI LinkBoost": "Yes" },
      design: { "Armor Shield": "Yes", "Rating": "IP65" }
    },
    tags: ["new", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2899,
    releaseDate: "2024-07-12",
    warranty: "1 Year Oppo Warranty",
    boxContents: ["Phone", "80W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "Tempered Glass"]
  },
  {
    id: "phone-oppo-reno-12",
    slug: "oppo-reno-12-5g",
    brand: "Oppo",
    name: "Oppo Reno 12 5G",
    subtitle: "3D Fluid Design • AI Portrait Retouch • 5000mAh • 80W SuperVOOC",
    category: "phone",
    images: [{ src: "/products/oppo-reno-12/astro-silver.svg", alt: "Oppo Reno 12 Astro Silver", color: "Astro Silver" }],
    variants: [
      { ram: 8, storage: 256, color: "Astro Silver", colorHex: "#cfd3d8", mrp: 37999, price: 32990, inStock: true }
    ],
    highlights: ["Corning Gorilla Glass 7i protection", "AI Summary, AI Record and AI Clear Voice capabilities", "80W SuperVOOC flash charging"],
    specs: {
      display: { "Size": "6.7\" Quad-Curved AMOLED 120Hz" },
      performance: { "Chip": "Dimensity 7300-Energy" },
      camera: { "Setup": "50MP Sony LYT-600 OIS + 8MP + 2MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "80W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP65" }
    },
    tags: ["5g"],
    emiAvailable: true,
    minEmiPerMonth: 2599,
    releaseDate: "2024-07-12",
    warranty: "1 Year Oppo Warranty",
    boxContents: ["Phone", "80W Charger", "Cable"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-oppo-f27-pro-plus",
    slug: "oppo-f27-pro-plus-5g",
    brand: "Oppo",
    name: "Oppo F27 Pro+ 5G",
    subtitle: "India's 1st IP69 Waterproof Phone • Armor Body • 3D Curved AMOLED",
    category: "phone",
    images: [{ src: "/products/oppo-f27-pro-plus/dusk-pink.svg", alt: "Oppo F27 Pro+ Dusk Pink", color: "Dusk Pink" }],
    variants: [
      { ram: 8, storage: 128, color: "Dusk Pink", colorHex: "#c5878d", mrp: 29999, price: 27990, inStock: true }
    ],
    highlights: ["Triple waterproof certification: IP69, IP68, and IP66", "Resists hot water jets and high-pressure steam cleaning", "360-degree Armour Body drop resistance"],
    specs: {
      display: { "Size": "6.7\" 3D Curved AMOLED 120Hz Gorilla Glass Victus 2" },
      performance: { "Chip": "MediaTek Dimensity 7050 5G" },
      camera: { "Setup": "64MP Primary + 2MP Portrait" },
      battery: { "Capacity": "5000 mAh", "Charging": "67W SuperVOOC" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP69 / IP68 / IP66 Waterproof" }
    },
    tags: ["new", "5g", "bestseller"],
    emiAvailable: true,
    minEmiPerMonth: 2199,
    releaseDate: "2024-06-13",
    warranty: "1 Year Oppo Warranty",
    boxContents: ["Phone", "67W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Glass & Cover"]
  },
  {
    id: "phone-oppo-a3-pro",
    slug: "oppo-a3-pro-5g",
    brand: "Oppo",
    name: "Oppo A3 Pro 5G",
    subtitle: "Military Grade Shock Resistance • 50MP AI • 5100mAh • 45W",
    category: "phone",
    images: [{ src: "/products/oppo-a3-pro/starry-black.svg", alt: "Oppo A3 Pro Starry Black", color: "Starry Black" }],
    variants: [
      { ram: 8, storage: 128, color: "Starry Black", colorHex: "#222225", mrp: 20999, price: 17990, inStock: true }
    ],
    highlights: ["SGS 5-star drop resistance certification", "Splash Touch technology works even with wet fingers", "5100mAh long-lasting battery with 45W SuperVOOC"],
    specs: {
      display: { "Size": "6.67\" 120Hz 1000 nits Display" },
      performance: { "Chip": "Dimensity 6300 5G" },
      camera: { "Setup": "50MP Dual Camera" },
      battery: { "Capacity": "5100 mAh", "Charging": "45W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP54" }
    },
    tags: ["budget", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1399,
    releaseDate: "2024-06-21",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "45W Charger", "Cable"],
    freeGiftBundle: ["Free Earbuds", "Tempered Glass & Cover"]
  },

  // --- REALME ---
  {
    id: "phone-realme-13-pro-plus",
    slug: "realme-13-pro-plus-5g",
    brand: "Realme",
    name: "Realme 13 Pro+ 5G",
    subtitle: "Monet Gold Luxury Glass • Sony LYT-701 OIS • 50MP Periscope 3x • 5200mAh",
    category: "phone",
    images: [{ src: "/products/realme-13-pro-plus/monet-gold.svg", alt: "Realme 13 Pro+ Monet Gold", color: "Monet Gold" }],
    variants: [
      { ram: 8, storage: 256, color: "Monet Gold", colorHex: "#d0b07b", mrp: 36999, price: 32990, inStock: true }
    ],
    highlights: ["First phone with dual Sony 50MP LYT sensors with Ultra OIS", "Periscope telephoto camera with 3x optical and 120x SuperZoom", "Monet art-inspired frosted glass back"],
    specs: {
      display: { "Size": "6.7\" 120Hz Curved Vision AMOLED" },
      performance: { "Chip": "Snapdragon 7s Gen 2 (4nm)" },
      camera: { "Setup": "50MP Sony LYT-701 OIS + 50MP Sony LYT-600 3x Periscope + 8MP" },
      battery: { "Capacity": "5200 mAh", "Charging": "80W Ultra Charge" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP65" }
    },
    tags: ["new", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2599,
    releaseDate: "2024-07-30",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "80W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-realme-13-plus",
    slug: "realme-13-plus-5g",
    brand: "Realme",
    name: "Realme 13+ 5G",
    subtitle: "Dimensity 7300 Energy • 90 FPS Gaming • 80W Ultra Charge • 50MP Sony",
    category: "phone",
    images: [{ src: "/products/realme-13-plus/victory-gold.svg", alt: "Realme 13+ Victory Gold", color: "Victory Gold" }],
    variants: [
      { ram: 8, storage: 128, color: "Victory Gold", colorHex: "#dfbd7f", mrp: 25999, price: 22990, inStock: true }
    ],
    highlights: ["Certified 90 FPS gaming on BGMI and Free Fire", "Massive stainless steel vapor cooling area (6050mm²)", "80W charging reaches 50% in just 19 minutes"],
    specs: {
      display: { "Size": "6.67\" 120Hz OLED 2000 nits" },
      performance: { "Chip": "MediaTek Dimensity 7300-Energy (4nm)" },
      camera: { "Setup": "50MP Sony LYT-600 OIS" },
      battery: { "Capacity": "5000 mAh", "Charging": "80W" },
      connectivity: { "5G": "Yes" },
      design: { "Speed Victory Design": "Yes" }
    },
    tags: ["gaming", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1799,
    releaseDate: "2024-08-29",
    warranty: "1 Year Realme Warranty",
    boxContents: ["Phone", "80W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Earbuds Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-realme-narzo-70-pro",
    slug: "realme-narzo-70-pro-5g",
    brand: "Realme",
    name: "Realme Narzo 70 Pro 5G",
    subtitle: "Horizon Glass Design • Sony IMX890 Flagship OIS • Air Gestures • 67W",
    category: "phone",
    images: [{ src: "/products/realme-narzo-70-pro/glass-green.svg", alt: "Realme Narzo 70 Pro Glass Green", color: "Glass Green" }],
    variants: [
      { ram: 8, storage: 128, color: "Glass Green", colorHex: "#537365", mrp: 24999, price: 18990, inStock: true }
    ],
    highlights: ["Sony IMX890 flagship 50MP sensor with OIS", "Creative Air Gestures let you browse reels without touching the screen", "Premium two-tone horizon glass design"],
    specs: {
      display: { "Size": "6.67\" 120Hz AMOLED 2000 nits" },
      performance: { "Chip": "Dimensity 7050 5G" },
      camera: { "Setup": "50MP Sony IMX890 OIS + 8MP + 2MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "67W" },
      connectivity: { "5G": "Yes" },
      design: { "Air Gestures": "Supported" }
    },
    tags: ["bestseller", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1499,
    releaseDate: "2024-03-19",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "67W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-realme-p1",
    slug: "realme-p1-5g",
    brand: "Realme",
    name: "Realme P1 5G",
    subtitle: "Dimensity 7050 5G • 120Hz AMOLED Display • 45W Charge • 50MP Camera",
    category: "phone",
    images: [{ src: "/products/realme-p1/phoenix-red.svg", alt: "Realme P1 Phoenix Red", color: "Phoenix Red" }],
    variants: [
      { ram: 6, storage: 128, color: "Phoenix Red", colorHex: "#a03337", mrp: 18999, price: 14990, inStock: true }
    ],
    highlights: ["Only 120Hz AMOLED display with in-display fingerprint in this price bracket", "Powerful 6nm MediaTek Dimensity 7050 chip", "Phoenix Feather feather-light textured design"],
    specs: {
      display: { "Size": "6.67\" 120Hz AMOLED with Rainwater Smart Touch" },
      performance: { "Chip": "Dimensity 7050 5G" },
      camera: { "Setup": "50MP AI Camera" },
      battery: { "Capacity": "5000 mAh", "Charging": "45W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP54" }
    },
    tags: ["budget", "5g", "bestseller"],
    emiAvailable: true,
    minEmiPerMonth: 1199,
    releaseDate: "2024-04-15",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "45W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Earbuds", "Tempered Glass & Cover"]
  },

  // --- XIAOMI / REDMI ---
  {
    id: "phone-xiaomi-14-civi",
    slug: "xiaomi-14-civi-5g",
    brand: "Xiaomi",
    name: "Xiaomi 14 Civi 5G",
    subtitle: "Leica Cinematic Optics • Snapdragon 8s Gen 3 • Dual 32MP Selfie • 1.5K AMOLED",
    category: "phone",
    images: [{ src: "/products/xiaomi-14-civi/matcha-green.svg", alt: "Xiaomi 14 Civi Matcha Green", color: "Matcha Green" }],
    variants: [
      { ram: 8, storage: 256, color: "Matcha Green", colorHex: "#7a9a77", mrp: 54999, price: 42990, inStock: true }
    ],
    highlights: ["Co-engineered with Leica with authentic Leica photographic styles", "Flagship Snapdragon 8s Gen 3 with dual floating micro-curve glass", "Dual 32MP front cameras with AI Teleprompter"],
    specs: {
      display: { "Size": "6.55\" 1.5K 120Hz Quad-Curved AMOLED 3000 nits" },
      performance: { "Chip": "Snapdragon 8s Gen 3 (4nm)" },
      camera: { "Setup": "50MP Leica Summilux OIS + 50MP Leica 2x Telephoto + 12MP Leica Ultra Wide" },
      battery: { "Capacity": "4700 mAh", "Charging": "67W Turbo Charge" },
      connectivity: { "5G": "Yes" },
      design: { "Weight": "177g Ultra-Light" }
    },
    tags: ["flagship", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 3399,
    releaseDate: "2024-06-12",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "67W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "Tempered Glass & Case"]
  },
  {
    id: "phone-redmi-note-13-pro-plus",
    slug: "redmi-note-13-pro-plus-5g",
    brand: "Xiaomi",
    name: "Redmi Note 13 Pro+ 5G",
    subtitle: "200MP OIS Camera • 120W HyperCharge • Curved 1.5K AMOLED • IP68",
    category: "phone",
    images: [{ src: "/products/redmi-note-13-pro-plus/fusion-purple.svg", alt: "Redmi Note 13 Pro+ Fusion Purple", color: "Fusion Purple" }],
    variants: [
      { ram: 8, storage: 256, color: "Fusion Purple", colorHex: "#a695b8", mrp: 33999, price: 29990, inStock: true },
      { ram: 12, storage: 512, color: "Fusion Black", colorHex: "#222222", mrp: 37999, price: 33990, inStock: true }
    ],
    highlights: ["200MP camera with 4x lossless in-sensor zoom", "Blazing 120W HyperCharge powers 100% in 19 minutes", "IP68 waterproof certification with Gorilla Glass Victus"],
    specs: {
      display: { "Size": "6.67\" 1.5K 120Hz 3D Curved AMOLED" },
      performance: { "Chip": "MediaTek Dimensity 7200-Ultra (4nm)" },
      camera: { "Setup": "200MP Samsung ISOCELL HP3 OIS + 8MP + 2MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "120W in-box" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP68" }
    },
    tags: ["bestseller", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2399,
    releaseDate: "2024-01-04",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "120W HyperCharger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-redmi-note-13",
    slug: "redmi-note-13-5g",
    brand: "Xiaomi",
    name: "Redmi Note 13 5G",
    subtitle: "108MP 3x Zoom • 120Hz AMOLED with Ultra-Thin Bezels • 33W Fast Charge",
    category: "phone",
    images: [{ src: "/products/redmi-note-13/prism-gold.svg", alt: "Redmi Note 13 Prism Gold", color: "Prism Gold" }],
    variants: [
      { ram: 6, storage: 128, color: "Prism Gold", colorHex: "#d1b37b", mrp: 20999, price: 16990, inStock: true }
    ],
    highlights: ["108MP camera with 3x in-sensor lossless zoom", "Slimmest Redmi Note ever at just 7.6mm", "Vibrant 120Hz AMOLED with ultra-narrow bezels"],
    specs: {
      display: { "Size": "6.67\" 120Hz AMOLED FHD+" },
      performance: { "Chip": "MediaTek Dimensity 6080 5G" },
      camera: { "Setup": "108MP + 8MP + 2MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "33W" },
      connectivity: { "5G": "Yes", "IR Blaster": "Yes" },
      design: { "Thickness": "7.6mm", "Rating": "IP54" }
    },
    tags: ["budget", "5g", "bestseller"],
    emiAvailable: true,
    minEmiPerMonth: 1399,
    releaseDate: "2024-01-04",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "33W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-redmi-13c",
    slug: "redmi-13c-5g",
    brand: "Xiaomi",
    name: "Redmi 13C 5G",
    subtitle: "Star Trail Design • 50MP AI Dual Camera • 90Hz Display • 5000mAh",
    category: "phone",
    images: [{ src: "/products/redmi-13c/starlight-black.svg", alt: "Redmi 13C Starlight Black", color: "Starlight Black" }],
    variants: [
      { ram: 4, storage: 128, color: "Starlight Black", colorHex: "#1a1a1a", mrp: 13999, price: 9999, inStock: true },
      { ram: 8, storage: 256, color: "Startrail Green", colorHex: "#456a57", mrp: 16999, price: 12990, inStock: true }
    ],
    highlights: ["Most affordable true 5G smartphone from Xiaomi", "Star Trail aesthetic reflective back pattern", "Massive 5000mAh battery with fast Type-C charging"],
    specs: {
      display: { "Size": "6.74\" 90Hz Display with Corning Gorilla Glass" },
      performance: { "Chip": "MediaTek Dimensity 6100+ 5G (6nm)" },
      camera: { "Setup": "50MP AI Primary Camera" },
      battery: { "Capacity": "5000 mAh", "Charging": "18W Type-C" },
      connectivity: { "5G": "Dual 5G SIM" },
      design: { "Design": "Star Trail Glass Feel" }
    },
    tags: ["budget", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 899,
    releaseDate: "2023-12-06",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "Charger", "Cable"],
    freeGiftBundle: ["Free Earbuds", "Tempered Glass & Cover"]
  },

  // --- MOTOROLA ---
  {
    id: "phone-motorola-edge-50-ultra",
    slug: "motorola-edge-50-ultra-5g",
    brand: "Motorola",
    name: "Motorola Edge 50 Ultra 5G",
    subtitle: "Real Wood / Vegan Leather • Snapdragon 8s Gen 3 • 125W TurboPower • IP68",
    category: "phone",
    images: [{ src: "/products/motorola-edge-50-ultra/nordic-wood.svg", alt: "Motorola Edge 50 Ultra Nordic Wood", color: "Nordic Wood" }],
    variants: [
      { ram: 12, storage: 512, color: "Nordic Wood", colorHex: "#8f7358", mrp: 64999, price: 54990, inStock: true }
    ],
    highlights: ["First phone with natural FSC-certified real wood finish", "Pantone Validated camera with 50MP periscope 3x zoom", "125W TurboPower + 50W wireless charging"],
    specs: {
      display: { "Size": "6.7\" 1.5K 144Hz Super HD pOLED 2500 nits" },
      performance: { "Chip": "Snapdragon 8s Gen 3 (4nm)" },
      camera: { "Setup": "50MP OIS + 64MP 3x Periscope OIS + 50MP Ultra Wide" },
      battery: { "Capacity": "4500 mAh", "Charging": "125W Wired + 50W Wireless" },
      connectivity: { "5G": "Yes", "Wi-Fi": "Wi-Fi 7" },
      design: { "Material": "Natural Wood / Vegan Leather", "Rating": "IP68" }
    },
    tags: ["flagship", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 4299,
    releaseDate: "2024-06-18",
    warranty: "1 Year Motorola Warranty",
    boxContents: ["Phone", "125W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch / Earbuds Voucher", "Tempered Glass & Cover"]
  },
  {
    id: "phone-motorola-edge-50-pro",
    slug: "motorola-edge-50-pro-5g",
    brand: "Motorola",
    name: "Motorola Edge 50 Pro 5G",
    subtitle: "Pantone Color & Skin Tone • 144Hz 1.5K pOLED • 125W Turbo • 3x Telephoto",
    category: "phone",
    images: [{ src: "/products/motorola-edge-50-pro/luxe-lavender.svg", alt: "Motorola Edge 50 Pro Luxe Lavender", color: "Luxe Lavender" }],
    variants: [
      { ram: 8, storage: 256, color: "Luxe Lavender", colorHex: "#b5a2bf", mrp: 36999, price: 29990, inStock: true }
    ],
    highlights: ["World's first Pantone validated camera and true color display", "Handmade Italian acetate / vegan leather rear panel", "Fastest 125W charging in segment with IP68 rating"],
    specs: {
      display: { "Size": "6.7\" 1.5K 144Hz 3D Curved pOLED 2000 nits" },
      performance: { "Chip": "Snapdragon 7 Gen 3" },
      camera: { "Setup": "50MP f/1.4 OIS + 10MP 3x Telephoto OIS + 13MP Ultra Wide" },
      battery: { "Capacity": "4500 mAh", "Charging": "125W Wired + 50W Wireless" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP68" }
    },
    tags: ["bestseller", "camera", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2399,
    releaseDate: "2024-04-03",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "125W Turbo Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-moto-g85",
    slug: "moto-g85-5g",
    brand: "Motorola",
    name: "Moto G85 5G",
    subtitle: "3D Curved 120Hz pOLED • Sony LYT-600 OIS • Vegan Leather • 5000mAh",
    category: "phone",
    images: [{ src: "/products/moto-g85/olive-green.svg", alt: "Moto G85 Olive Green", color: "Olive Green" }],
    variants: [
      { ram: 8, storage: 128, color: "Olive Green", colorHex: "#687654", mrp: 20999, price: 16990, inStock: true },
      { ram: 12, storage: 256, color: "Cobalt Blue", colorHex: "#334e7a", mrp: 22999, price: 18990, inStock: true }
    ],
    highlights: ["First phone under ₹18,000 with a 3D curved pOLED display", "Sony LYT-600 50MP camera with OIS", "Dolby Atmos dual stereo speakers with clean Hello UI"],
    specs: {
      display: { "Size": "6.67\" 3D Curved 120Hz pOLED Gorilla Glass 5" },
      performance: { "Chip": "Snapdragon 6s Gen 3 5G" },
      camera: { "Setup": "50MP Sony LYT-600 OIS + 8MP Ultra Wide" },
      battery: { "Capacity": "5000 mAh", "Charging": "33W" },
      connectivity: { "5G": "13 5G Bands" },
      design: { "Finish": "Soft Vegan Leather" }
    },
    tags: ["budget", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1399,
    releaseDate: "2024-07-10",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "33W TurboPower Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },

  // --- iQOO ---
  {
    id: "phone-iqoo-12",
    slug: "iqoo-12-5g",
    brand: "iQOO",
    name: "iQOO 12 5G",
    subtitle: "Snapdragon 8 Gen 3 • Supercomputing Q1 Chip • 64MP Periscope • 120W",
    category: "phone",
    images: [{ src: "/products/iqoo-12/legend-white.svg", alt: "iQOO 12 Legend White", color: "Legend White" }],
    variants: [
      { ram: 12, storage: 256, color: "Legend White", colorHex: "#f0f0f0", mrp: 59999, price: 52990, inStock: true }
    ],
    highlights: ["Extreme gaming benchmark with dedicated Q1 graphics chip", "144Hz LTPO AMOLED flat gaming display", "Periscope telephoto camera with 100x digital zoom"],
    specs: {
      display: { "Size": "6.78\" 1.5K 144Hz LTPO AMOLED 3000 nits" },
      performance: { "Chip": "Snapdragon 8 Gen 3 + Q1 Supercomputing Chip" },
      camera: { "Setup": "50MP OmniVision 1/1.3\" OIS + 64MP 3x Periscope + 50MP Ultra Wide" },
      battery: { "Capacity": "5000 mAh", "Charging": "120W FlashCharge in-box" },
      connectivity: { "5G": "Yes" },
      design: { "BMW M Motorsport Legend Stripes": "Yes" }
    },
    tags: ["gaming", "flagship", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 4199,
    releaseDate: "2023-12-12",
    warranty: "1 Year Official Warranty",
    boxContents: ["Phone", "120W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch / Earbuds", "Tempered Glass & Cover"]
  },
  {
    id: "phone-iqoo-neo-9-pro",
    slug: "iqoo-neo-9-pro-5g",
    brand: "iQOO",
    name: "iQOO Neo 9 Pro 5G",
    subtitle: "Snapdragon 8 Gen 2 • Dual-Tone Leather • Sony IMX920 OIS • 120W",
    category: "phone",
    images: [{ src: "/products/iqoo-neo-9-pro/fiery-red.svg", alt: "iQOO Neo 9 Pro Fiery Red", color: "Fiery Red" }],
    variants: [
      { ram: 8, storage: 128, color: "Fiery Red", colorHex: "#c8353b", mrp: 39999, price: 33990, inStock: true }
    ],
    highlights: ["Highest gaming FPS stability with Snapdragon 8 Gen 2 at ₹35k", "Same Sony IMX920 main sensor as Vivo X100 flagship", "120W FlashCharge reaches 50% in 11 minutes"],
    specs: {
      display: { "Size": "6.78\" 1.5K 144Hz LTPO AMOLED" },
      performance: { "Chip": "Snapdragon 8 Gen 2 + Q1 Chip" },
      camera: { "Setup": "50MP Sony IMX920 OIS + 8MP Ultra Wide" },
      battery: { "Capacity": "5160 mAh", "Charging": "120W" },
      connectivity: { "5G": "Yes" },
      design: { "Dual-tone Vegan Leather": "Yes" }
    },
    tags: ["gaming", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 2699,
    releaseDate: "2024-02-22",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "120W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-iqoo-z9s-pro",
    slug: "iqoo-z9s-pro-5g",
    brand: "iQOO",
    name: "iQOO Z9s Pro 5G",
    subtitle: "3D Curved AMOLED • Snapdragon 7 Gen 3 • 5500mAh Ultra Slim • 80W",
    category: "phone",
    images: [{ src: "/products/iqoo-z9s-pro/flamboyant-orange.svg", alt: "iQOO Z9s Pro Flamboyant Orange", color: "Flamboyant Orange" }],
    variants: [
      { ram: 8, storage: 128, color: "Flamboyant Orange", colorHex: "#d87431", mrp: 29999, price: 24990, inStock: true }
    ],
    highlights: ["Brightest display in class at 4500 nits peak brightness", "Sony IMX882 50MP OIS camera with 4K recording", "Giant 5500mAh battery in a 7.49mm slim body"],
    specs: {
      display: { "Size": "6.77\" 120Hz 3D Curved AMOLED 4500 nits" },
      performance: { "Chip": "Snapdragon 7 Gen 3 (4nm)" },
      camera: { "Setup": "50MP Sony OIS + 8MP Ultra Wide" },
      battery: { "Capacity": "5500 mAh", "Charging": "80W" },
      connectivity: { "5G": "Yes" },
      design: { "Rating": "IP64" }
    },
    tags: ["new", "gaming", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1999,
    releaseDate: "2024-08-21",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "80W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Earbuds", "Tempered Glass & Cover"]
  },

  // --- POCO ---
  {
    id: "phone-poco-x6-pro",
    slug: "poco-x6-pro-5g",
    brand: "Poco",
    name: "Poco X6 Pro 5G",
    subtitle: "Dimensity 8300-Ultra • 1.5K 120Hz Flow AMOLED • 64MP OIS • 67W",
    category: "phone",
    images: [{ src: "/products/poco-x6-pro/racing-yellow.svg", alt: "Poco X6 Pro Racing Yellow", color: "Racing Yellow" }],
    variants: [
      { ram: 8, storage: 256, color: "Racing Yellow", colorHex: "#f0c22b", mrp: 30999, price: 23990, inStock: true },
      { ram: 12, storage: 512, color: "Spectre Black", colorHex: "#1c1c1c", mrp: 34999, price: 26990, inStock: true }
    ],
    highlights: ["1.4 Million AnTuTu monster processor (Dimensity 8300-Ultra)", "1.5K Flow AMOLED with HDR10+ and Dolby Vision", "WildBoost Gaming Optimization 2.0"],
    specs: {
      display: { "Size": "6.67\" 1.5K 120Hz Flow AMOLED" },
      performance: { "Chip": "MediaTek Dimensity 8300-Ultra (4nm)" },
      camera: { "Setup": "64MP OIS + 8MP Ultra Wide + 2MP" },
      battery: { "Capacity": "5000 mAh", "Charging": "67W Turbo" },
      connectivity: { "5G": "Yes" },
      design: { "Finish": "Vegan Leather / Dual Curved" }
    },
    tags: ["gaming", "bestseller", "5g"],
    emiAvailable: true,
    minEmiPerMonth: 1899,
    releaseDate: "2024-01-11",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "67W Charger", "Cable", "Case"],
    freeGiftBundle: ["Free Smartwatch", "Tempered Glass & Cover"]
  },
  {
    id: "phone-poco-m6-pro",
    slug: "poco-m6-pro-5g",
    brand: "Poco",
    name: "Poco M6 Pro 5G",
    subtitle: "Snapdragon 4 Gen 2 • Glass Back • 50MP AI • 5000mAh Battery",
    category: "phone",
    images: [{ src: "/products/poco-m6-pro/power-black.svg", alt: "Poco M6 Pro Power Black", color: "Power Black" }],
    variants: [
      { ram: 4, storage: 128, color: "Power Black", colorHex: "#1f1f1f", mrp: 15999, price: 10490, inStock: true },
      { ram: 6, storage: 128, color: "Forest Green", colorHex: "#395b45", mrp: 16999, price: 11990, inStock: true }
    ],
    highlights: ["Dual-glass design at entry-level price", "Qualcomm Snapdragon 4 Gen 2 5G processor", "Smooth 90Hz adaptive refresh display"],
    specs: {
      display: { "Size": "6.79\" 90Hz FHD+ Gorilla Glass 3" },
      performance: { "Chip": "Snapdragon 4 Gen 2 (4nm)" },
      camera: { "Setup": "50MP AI + 2MP Depth" },
      battery: { "Capacity": "5000 mAh", "Charging": "18W Type-C" },
      connectivity: { "5G": "Yes" },
      design: { "Back": "Premium Glass" }
    },
    tags: ["budget", "5g", "bestseller"],
    emiAvailable: true,
    minEmiPerMonth: 949,
    releaseDate: "2023-08-05",
    warranty: "1 Year Warranty",
    boxContents: ["Phone", "22.5W Charger", "Cable"],
    freeGiftBundle: ["Free Earbuds", "Tempered Glass & Cover"]
  }
];

// Add _meta to each item
const stamped = seedProducts.map((p) => ({
  ...p,
  _meta: {
    verified: false,
    lastUpdated: "2026-11-09",
    source: "The Mobile Lounge Kakod Seed Catalog",
  },
}));

const outPath = path.resolve(__dirname, "../src/data/products.json");
fs.writeFileSync(outPath, JSON.stringify(stamped, null, 2), "utf-8");
console.log(`Generated ${stamped.length} products to ${outPath}`);
