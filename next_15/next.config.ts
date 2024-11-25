import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Recommended: this will reduce output Docker image size by 80%+

  cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 0, // disable default in-memory caching

  // images: {
  //   // Optional: use a different optimization service
  //   // loader: 'custom',
  //   // loaderFile: './image-loader.ts',
  //   // We're defaulting to optimizing images with
  //   // Sharp, which is built-into `next start`
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "images.unsplash.com",
  //       port: "",
  //       pathname: "/**",
  //       search: "",
  //     },
  //   ],
  // },

  // Nginx will do gzip compression. We disable
  // compression here so we can prevent buffering
  // streaming responses
  // compress: false,

  // Optional: override the default (1 year) `stale-while-revalidate`
  // header time for static pages
  // swrDelta: 3600 // seconds

  // experimental: {
  //   // ppr: "incremental",
  // },
};

export default nextConfig;
