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
                source: "/mypage/:path*",
                    destination: "http://localhost:8080/mypage/:path*"
            },
            {
                source : "/interview/choose",
                destination : "http://localhost:8080/interview/choose"
            }
        ];
    }
};
export default nextConfig;
