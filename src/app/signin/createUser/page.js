'use client'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { useSession } from 'next-auth/react';
import { useReducer } from "react";
import Link from 'next/link';
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";

import Button from '@/app/_components/Button';
import Terms from "@/app/_components/Terms";
import { createUser } from "@/app/_lib/actions";

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "birth":
      return { ...state, birth: action.payload };
    case "displayDate":
      return { ...state, displayDate: action.payload };
    case "id":
      return { ...state, id: action.payload };
    case "pw":
      return { ...state, pw: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "showTerms":
      return { ...state, showTerms: action.payload };
    case "isChecked":
      return { ...state, isChecked: action.payload };
    default:
      return state;
  }
}

function Page() {
  const { data: session, status } = useSession();
  const initialState = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    birth: "",
    id: "",
    pw: "",
    checkPw: "",
    phone: "",
    showTerms: false,
    isChecked: false,
  };

  const [{ name, email, birth, id, pw, checkPw, phone, showTerms, isChecked, displayDate }, dispatch] = useReducer(reducer, initialState);

  function validateId(id) {
    const idRegex = /^[a-z0-9_-]{5,20}$/;
    if (!idRegex.test(id)) {
      alert('5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용해주세요')
      return false;
    }
    return true
  }

  function validatePw(pw) {
    const pwRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[_-])(?=.*[^a-zA-Z0-9_-]).{8,16}$/;
    if (!pwRegex.test(pw)) {
      alert('5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용해주세요')
      return false;
    }
    return true
  }
  const handleDateChange = (date) => {
    if (date) {
      const formattedDisplayDate = moment(date).format('YYYY년 MM월 DD일');
      const formattedDate = moment(date).format('YYMMDD');
      dispatch({ type: 'displayDate', payload: formattedDisplayDate });
      dispatch({ type: 'birth', payload: formattedDate });
    }
  };

  function validateForm() {
    if (pw !== checkPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    //`회원가입 처리
    createUser({ name, email, birth, id, pw, phone });
  };


  return (
    <Form onSubmit={handleSubmit} width="w-2/4">
      <p className="font-semibold">환영합니다.</p>
      <p className="font-semibold border-b-2 border-primary-950 pb-5 mb-8">
        당신의 취업을 진심으로 응원해요.
      </p>
      <div className="flex flex-col items-center justify-center gap-5">
        {session?.user ? (
          <>
            <input
              name="name"
              defaultValue={session.user.name}
              onChange={handleFieldChange("name")}
              className="w-full h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs cursor-pointer"
            />
            <input
              name="email"
              defaultValue={session.user.email}
              onChange={handleFieldChange("email")}
              className="w-full h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs cursor-pointer"
            />
          </>
        ) : (
          <>
            <Input
              name="name"
              placeholder="이름"
              onChange={handleFieldChange("name")}
              value={name}
            />
            <div className="w-full flex gap-1 items-center">
              <Input
                name="email"
                width="w-3/6 flex-grow"
                placeholder="이메일"
                onChange={handleFieldChange("email")}
                value={email}
              />
              {!isCustomDomain && <span className="text-gray-700 px-3">@</span>}
              <select
                className="flex-grow h-12 bg-gray-200 px-2 text-gray-700 text-center rounded-xl leading-10"
                onChange={handleOptionChange}
              >
                <option value="">선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="직접작성">직접작성</option>
              </select>
            </div>
          </>
        )}

        <div className="relative w-full">
          <Input
            name="id"
            placeholder="아이디"
            onChange={handleFieldChange("id")}
            value={id}
          />
          <button
            type="button"
            class="bg-gray-400 text-gray-700 py-2 px-2 rounded-xl w-14 h-8 text-[10px] absolute right-5 top-2 font-bold hover:opacity-90"
            onClick={() => validateId(id)}
          >
            중복확인
          </button>
          <p className="text-[11px] px-5 pt-2">
            5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용
          </p>
        </div>
        <div className="w-full">
          <Input
            autocomplete="new-password"
            name="pw"
            type="password"
            placeholder="비밀번호"
            onChange={(e) =>
              dispatch({ type: "validatePw", payload: e.target.value })
            }
            value={pw}
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
        <div className="w-full h-12 px-2 custom-datepicker-wrapper">
          <span>생년월일</span>
          <ReactDatePicker
            selected={birth ? moment(birth, "YYMMDD").toDate() : null}
            onChange={handleDateChange}
            dateFormat="yyyy년 MM월 dd일"
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            placeholderText="생년월일을 선택해주세요"
            className="custom-datepicker"
            value={displayDate}
          />
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between gap-2">
            <input
              className="w-full h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs cursor-pointer"
              type="number"
              defaultValue="010"
              name={phone1}
              onChange={handleNumberChange("phone1")}
              maxLength={4}
            />
            <span>_</span>
            <Input
              type="number"
              name={phone2}
              onChange={handleNumberChange("phone2")}
              maxLength={4}
            />
            <span>_</span>
            <Input
              type="number"
              name={phone3}
              maxLength={4}
              onChange={handleNumberChange("phone3")}
            />
          </div>
          <p className="text-[11px] px-5 pt-2">전화번호를 입력해주세요.</p>
        </div>
        <div className="flex gap-2 border-b-2 border-gray-500 w-full mt-5 relative">
          <input
            type="checkbox"
            className="absolute bottom-3"
            onClick={() => dispatch({ type: "isChecked", payload: !isChecked })}
          />
          <p className="font-bold text-sm px-5 py-2">
            모든 약관 사항에 전체 동의합니다.
          </p>
          {showTerms ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
              onClick={() => dispatch({ type: "showTerms", payload: false })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
              onClick={() => dispatch({ type: "showTerms", payload: true })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </div>
        {showTerms && <Terms isChecked={isChecked} />}
        {/* <Button type="mdBlue">회원가입</Button> */}
        <Link href="/signin/optionalInfo" class="bg-primary-500 rounded-3xl px-[3rem] py-3 text-white">회원가입</Link>
      </div>
    </Form>
  );
}

export default function Page() {
  return (
    <CreateUserProvider>
      <PageContent />
    </CreateUserProvider>
  );
}
