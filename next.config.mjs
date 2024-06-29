/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/recruitment/:path*",
        destination: "http://apis.data.go.kr/1051000/recruitment/:path*",
      },
      {
        source: "/mypage/:path*",
        destination: "http://localhost:8080/mypage/:path*",
      },
      {
          source : "/interview/:path*",
          destination : "http://localhost:8080/interview/:path*"
      },
      {
        source : "/interview/start",
        destination : "http://127.0.0.1:8010/video/"
      },
      {
          source : "/review/reviewlist",
          destination : "http://localhost:8080/review/reviewlist"
      },
      {
        source : "/success/successlist",
        destination : "http://localhost:8080/success/successlist"
      }
    ];
  },
};
export default nextConfig;
