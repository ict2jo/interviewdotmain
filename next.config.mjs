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
        source: "/mypage/inquiry",
        destination: "http://localhost:8080/mypage/inquiry",
      },
      {
        source: "/mypage/inquirywrite",
        destination: "http://localhost:8080/mypage/inquirywrite",
      },
      {
        source: "/mypage/selfprofile",
        destination: "http://localhost:8080/mypage/selfprofile",
      },
      {
        source: "/mypage/editprofile",
        destination: "http://localhost:8080/mypage/editprofile",
      },
    ];
  },
};

export default nextConfig;
