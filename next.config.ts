/** @type {import('next').NextConfig} */
// import redirectList from './redirects.json' with { type: "json" };

const nextConfig = {
  async redirects() {
    return [
      // ✅ Modern Proxy: Redirect www to non-www (permanent 301)
      // Edge-level redirect at the reverse proxy layer
      // Works on all hostnames: www.ParasiteHeal.com → ParasiteHeal.com
      {
        source: '/:path*',
        destination: 'https://ParasiteHeal.com/:path*',
        statusCode: 308,
        basePath: false,
        has: [
          {
            type: 'host',
            value: 'www\\.ParasiteHeal\\.com',
          },
        ],
      },
      // Include redirectList if needed
      // ...redirectList.map(([source, destination]) => {
      //   return {
      //     source: source,
      //     destination: destination,
      //     permanent: true,
      //   };
      // }),
    ];
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/darwin-x64',
      'node_modules/@esbuild/darwin-arm64',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  async headers() {
    return [
      {
        // Cache control for static HTML pages - allow browser caching for better SEO
        source: "/((?!api|_next/static|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Cache control for images - long-term caching
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: true,
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dmca.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        // Configure ImageKit as a remote image source for Next.js Image component
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/uozierqmu/", // Replace with your ImageKit ID
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "cmedia.cheapmedicineshop.com",
      },
      {
        protocol: "https",
        hostname: "www.thelancet.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
    ],
  },
};

// ✅ Correct ESM export
export default nextConfig;
