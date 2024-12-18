import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Применяется ко всем маршрутам
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com data:;
              connect-src 'self' http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com ws://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com wss://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com;
              object-src 'none';
            `.replace(/\s{2,}/g, " ").trim(), // Убираем лишние пробелы
          },
        ],
      },
    ];
  },
};

export default nextConfig;
