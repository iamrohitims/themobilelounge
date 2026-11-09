import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Mobile Lounge - Kakod",
    short_name: "Mobile Lounge",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#ff1e42",
    icons: [
      {
        src: "/brand/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
