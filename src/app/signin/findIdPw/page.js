'use client'
import Link from "next/link";
import Button from "@/app/_components/Button";
import { useState } from "react";
import FindIdContent from "../findId/page";
import FindPwContent from "../findPw/page";

export default function FindIdPw() {
  const [contentToShow, setContentToShow] = useState(null);

  const handleShowFindId = () => {
    setContentToShow('findId');
  };

  const handleShowFindPw = () => {
    setContentToShow('findPw');
  };
  return (
    <>
      <div className={`bg-white rounded-2xl px-8 py-[5rem] m-auto my-[10rem] m-auto w-[420px] h-[500px] mt-10 ${contentToShow ? 'hidden' : ''}`}>
        <h1 className="border-b border-gray-700 py-5 font-extrabold text-3xl">
          아이디 / 비밀번호 찾기
        </h1>
        <p className="my-5">가입한 아이디 또는 비밀번호를 잊으셨습니까? </p>
        <div className="flex justify-center items-center gap-4 my-10">
          <Button type="longBlue" onClick={handleShowFindId}>
            <Link href="/signin/findId">아이디찾기</Link>
          </Button>

          <Button type="longBlue" onClick={handleShowFindPw}>
            <Link href="/signin/findPw">비밀번호찾기 </Link>
          </Button>
        </div>
      </div>
      {contentToShow === 'findId' && <FindIdContent />}
      {contentToShow === 'findPw' && <FindPwContent />}
    </>
  );
}
