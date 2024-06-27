"use client";

import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import { ResetPwProvider, useResetPw } from "../_lib/hooks/ResetPwContext";


function PageContent() {
  const { checkPw, isMatched, validPw, handleReset, dispatch } = useResetPw();
  return (
    <>
      <Form width="w-1/3">
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
      </Form>
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
