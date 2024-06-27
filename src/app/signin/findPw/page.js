'use client'
import React from "react";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

import { ResetPwProvider, useResetPw } from "@/app/_lib/hooks/ResetPwContext";

function PageContent() {
  const { id, name, email, authCode, verified, handleFindPwSubmit, handleGetCode, handleFieldChange, checkPw, isMatched, validPw, handleReset, dispatch } = useResetPw()

  return (
    <>
      <Header />
      <div className="my-12">
        {!verified ? <Form width="w-1/3">
          <p className="text-sm text-gray-800">
            회원님의 등록된 정보로 비밀번호를 찾을 수 있습니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 my-5">
            <Input
              placeholder="아이디"
              value={id}
              onChange={handleFieldChange("id")}
            />
            <Input
              placeholder="이름"
              value={name}
              onChange={handleFieldChange("name")}
            />
            <div className="relative w-full">
              <Input
                placeholder="이메일주소"
                value={email}
                onChange={handleFieldChange("email")}
              />
              <Button type="smGray" onClick={handleGetCode}>
                인증번호
              </Button>
            </div>
            <Input
              placeholder="인증번호"
              value={authCode}
              onChange={handleFieldChange("authCode")}
            />
            <div className="my-5">
              <Button type="mdBlue" onClick={handleFindPwSubmit}>
                비밀번호찾기
              </Button>
            </div>
          </div>
        </Form> : (<Form width="w-1/3">
          <p className="text-sm text-gray-800">비밀번호를 변경해주세요.</p>
          <div className="w-full">
            <Input
              // autocomplete="new-password"
              name="pw"
              type="password"
              placeholder="비밀번호"
              onChange={(e) =>
                dispatch({ type: "validatePw", payload: e.target.value })
              }
            // value={pw}
            />
            {!validPw ? (
              <p className="text-[11px] px-5 pt-2">
                8-16자, 영문 대·소문자, 숫자, 특수문자 2종류 이상 사용
              </p>
            ) : (
              <p className="text-[11px] px-5 pt-2 text-green-600">
                사용가능한 비밀번호입니다.
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              autocomplete="new-password"
              name="checkPw"
              type="password"
              placeholder="비밀번호 확인"
              value={checkPw}
              onChange={(e) =>
                dispatch({ type: "checkPw", payload: e.target.value })
              }
            />
            {isMatched ? (
              <p className="text-[11px] px-5 pt-2 text-green-600">
                비밀번호가 일치합니다.
              </p>
            ) : (
              <p className="text-[11px] px-5 pt-2"> 비밀번호를 확인해주세요. </p>
            )}
          </div>
          <div className="my-5">
            <button
              className="bg-primary-500 rounded-3xl px-[3rem] py-3 text-white"
              type="submit"
              onClick={handleReset}
            >
              비밀번호변경
            </button>
          </div>
        </Form>)}
      </div>
      <Footer />
    </>
  );
}
export default function Page() {
  return (
    <ResetPwProvider>
      <PageContent />
    </ResetPwProvider>
  );
}
