'use client'
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import kakao from "@/../public/ikakao.png";
import naver from "@/../public/inaver.png";
import google from "@/../public/igoogle.png";
import Button from "@/app/_components/Button";
import { useEffect } from "react";

export default function Page() {

  const { data: session, status } = useSession();

  useEffect(() => {
    // When the session status changes to 'authenticated'
    if (status === 'authenticated') {
      const jwtToken = session?.accessToken; // Assuming this is where the \
      localStorage.setItem('accessToken', jwtToken);
    }
  }, [session, status]);

  return (
    <Form width="w-1/3">
      <div className="flex flex-col gap-5 border-b-2 border-gray-500 pb-5">
        <h1 className="text-3xl font-bold text-center">인터뷰닷</h1>
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" />
        <div className="flex flex-col items-end">
          <Link href="/signin/findIdPw">
            <p className="border-b border-black text-sm">
              아이디/비밀번호 찾기
            </p>
          </Link>
          <Link href="/signin/adminLogin">
            <p className="border-b border-gray-700 text-gray-700 text-sm mt-2">
              관리자 로그인
            </p>
          </Link>
        </div>
        <Button type="longBlue"> 로그인 </Button>
        <Button type="longWhite">
          <Link href="/signin/createUser"> 회원가입 </Link>
        </Button>
      </div>
      <p className="text-xs text-center text-gray-600 bg-white pt-3"> SNS 로그인 </p>
      <div className="flex justify-center items-center gap-3 mt-3">
        <Image src={kakao} alt="kakao icon" className="w-[50px]" onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/signin/createUser" })} />
        <Image src={naver} alt="naver icon" className="w-[50px]" onClick={() => signIn('naver', { redirect: true, callbackUrl: "/signin/createUser" })} />
        <Image src={google} alt="google icon" className="w-[50px]" onClick={() => signIn('google', { redirect: true, callbackUrl: "/signin/createUser" })} />
      </div>
    </Form>
  );
}


// NEXTAUTH_URL = http://localhost:3000/
// NEXTAUTH_SECRET = 7b2002b23475c5ecfb4cd5f26a4b57d5

// AUTH_GOOGLE_ID = 1069194134364-dkhrilql7rj39q282uh3amf7ihrbmblh.apps.googleusercontent.com

// AUTH_GOOGLE_SECRET = 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

// # Kakao Provider API
// KAKAO_CLIENT_ID = 79e97b402dec41b958cb37d23906a6be
// KAKAO_CLIENT_SECRET = fJRhWJ69Q2q4Ba8t4VeAFVkncMUgbFvc

// NAVER_CLIENT_ID = rkhAutO0rUFmilmCzmDv
// NAVER_CLIENT_SECRET = 8fNgJFUqFm

// NEWS_CLIENT_ID = 1qFtXKv3mrSVIR2A05qv
// NEWS_CLIENT_SECRET = 83nMF8AOIO