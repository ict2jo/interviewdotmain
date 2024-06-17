/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    async rewrites(){
        return[
            {
            // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
            source: "/recruitment/:path*",
                destination: "http://apis.data.go.kr/1051000/recruitment/:path*"
            }
        ];
    }
};

export default nextConfig;
