/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    async rewrites(){
        return[
            {
            source: "/recruitment/:path*",
                destination: "http://apis.data.go.kr/1051000/recruitment/:path*"
            },
            {
                source : "/mypage/inquiry",
                destination : "http://localhost:8080/mypage/inquiry"
            }
        ];
    }
};

export default nextConfig;
