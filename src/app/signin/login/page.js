'use client'
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import kakao from "@/../public/ikakao.png";
import naver from "@/../public/inaver.png";
import google from "@/../public/igoogle.png";
import Button from "@/app/_components/Button";
import { useEffect, useState } from "react";

import authStore from "@/stores/AuthStore";
import { useRouter } from "next/navigation";


export default function Page() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState({
    id: '',
    pw: ''
  });;
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const { isNewUser } = session.user;

      if (isNewUser) {
        router.push("/signin/createUser");
      } else {
        router.push("/");
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    authStore.loadToken();
    if (authStore.isAuthenticated) {
      router.push("/");
    }
  }, [router, authStore]);

  async function handleLogin(e) {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/login', { id: user.id, pw: user.pw });
      if (response.data.token) {
        authStore.setToken(response.data.token)
        router.push("/main");
      }
    } catch (error) {
      alert("로그인 실패")
      setUser({
        id: "",
        pw: ""
      })
    }
  }

  function changeUserLoginInfo(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Form width="w-1/3">
      <div className="flex flex-col gap-5 border-b-2 border-gray-500 pb-5">
        <h1 className="text-3xl font-bold text-center">인터뷰닷</h1>
        <Input placeholder="아이디" name="id" value={user.id} onChange={changeUserLoginInfo} />
        <Input placeholder="비밀번호" name="pw" value={user.pw} onChange={changeUserLoginInfo} />
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
        <Button type="longBlue" onClick={handleLogin}> 로그인 </Button>
        <Button type="longWhite">
          <Link href="/signin/createUser"> 회원가입 </Link>
        </Button>
      </div>
      <p className="text-xs text-center text-gray-600 bg-white pt-3">

        SNS 로그인
      </p>
      <div className="flex justify-center items-center gap-3 mt-3">
        <Image
          src={kakao}
          alt="kakao icon"
          className="w-[50px]"
          onClick={() =>
            signIn("kakao")
          }
        />
        <Image
          src={naver}
          alt="naver icon"
          className="w-[50px]"
          onClick={() =>
            signIn("naver")
          }
        />
        <Image
          src={google}
          alt="google icon"
          className="w-[50px]"
          onClick={() =>
            signIn("google")
          }
        />
      </div>
    </Form>
  );
}
