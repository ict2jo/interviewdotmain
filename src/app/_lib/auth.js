import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from "next-auth/providers/naver";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(
  {
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
      }),
      NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      authorize({ auth }) {
        return !!auth?.user;
      },

      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token }) {

        session.accessToken = token.accessToken;
        return session;
      },
    },

  });

