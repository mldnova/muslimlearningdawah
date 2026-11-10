import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    // The suggest page became "Book an Event" (with suggesting as a tab)
    return [{ source: "/suggest-event", destination: "/book-event", permanent: true }];
  },
  images: {
    // Photos uploaded from /admin are stored in Vercel Blob
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
  experimental: {
    serverActions: {
      // Admin image uploads (resized in the browser first, so usually well under this)
      bodySizeLimit: "5mb",
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
