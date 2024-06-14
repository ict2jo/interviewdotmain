'use client'
import { useEffect, useReducer, useState } from "react";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";

import Terms from "@/app/_components/Terms";
import { createUser } from "@/app/_lib/actions";


function Page() {
  const [showTerms, setShowTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Form action={createUser} width="w-2/4">
      <p className="font-semibold">환영합니다.</p>
      <p className="font-semibold border-b-2 border-primary-950 pb-5 mb-8">
        당신의 취업을 진심으로 응원해요.
      </p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Input placeholder="이름" />
        <Input placeholder="이메일" />
        <Input placeholder="생년월일" />
        <div className="relative w-full">
          <Input placeholder="아이디" />
          <button className="bg-gray-400 text-gray-700 py-2 px-2 rounded-xl w-14 h-8 text-[10px] absolute right-5 top-2 font-bold hover:opacity-90">중복확인</button>
          <p className="text-[11px] px-5 pt-2">5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용</p>
        </div>
        <div className="w-full">
          <Input placeholder="비밀번호" />
          <p className="text-[11px] px-5 pt-2">8-16자, 영문 대·소문자, 숫자, 특수문자 2종류 이상 사용</p>

        </div>
        <Input placeholder="비밀번호 재확인" />
        <Input placeholder="전화번호" />
        <div className="flex gap-2 border-b-2 border-gray-500 w-full mt-5 relative">
          <input type="checkbox" className="absolute bottom-3" onClick={() => setIsChecked(true)} />
          <p className="font-bold text-sm px-5 py-2">모든 약관 사항에 전체 동의합니다.</p>
          {showTerms ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={() => setShowTerms(false)}>
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>) :
            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={() => setShowTerms(true)}>
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>)
          }
        </div>
        {showTerms && <Terms isChecked={isChecked} />}
        <Button type="mdBlue">회원가입</Button>
      </div>
    </Form>
  );
}

export default Page;
