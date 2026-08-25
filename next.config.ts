import type { NextConfig } from "next";

// The backend serves uploaded images (avatars, later catalogue uploads) as
// absolute URLs on its own origin, and `next/image` refuses unconfigured hosts.
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const api = new URL(apiUrl);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: api.protocol === "https:" ? "https" : "http",
        hostname: api.hostname,
        // Omit port for the default ports, otherwise Next needs it exactly.
        ...(api.port && api.port !== "80" && api.port !== "443"
          ? { port: api.port }
          : {}),
      },
    ],
    // The dev backend lives on localhost/private IPs; without this the image
    // optimizer's SSRF guard rejects every uploaded avatar in development.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
