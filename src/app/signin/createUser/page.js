"use client";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import Terms from "@/app/_components/Terms";
import {
  CreateUserProvider,
  useCreateUser,
} from "@/app/_lib/hooks/CreateUserContext";


function PageContent() {

  const {
    dispatch,
    name,
    email,
    birth,
    id,
    pw,
    checkPw,
    isMatched,
    phone1,
    phone2,
    phone3,
    showTerms,
    isChecked,
    displayDate,
    isCustomDomain,
    handleFieldChange,
    handleIdValidation,
    validPw,
    handleDateChange,
    handleSubmit,
    handleOptionChange,
    handleNumberChange,
  } = useCreateUser();

  return (
    <>
      <Form width="w-2/4">
        <p className="font-semibold">환영합니다.</p>
        <p className="font-semibold border-b-2 border-primary-950 pb-5 mb-8">
          당신의 취업을 진심으로 응원해요.
        </p>
        <div className="flex flex-col items-center justify-center gap-5">
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
              onClick={() => handleIdValidation(id)}
            >
              중복확인
            </button>
            <p className="text-[11px] px-5 pt-2">
              5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용
            </p>
          </div>
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
          <div className="w-full">
            <div className="w-full flex justify-between gap-2">
              <input
                className="w-full h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs cursor-pointer"
                type="number"
                name={phone1}
                onChange={handleNumberChange("phone1")}
              />
              <span>_</span>
              <Input
                type="number"
                name={phone2}
                onChange={handleNumberChange("phone2")}
              />
              <span>_</span>
              <Input
                type="number"
                name={phone3}
                onChange={handleNumberChange("phone3")}
              />
            </div>
            <p className="text-[11px] px-5 pt-2">전화번호를 입력해주세요.</p>
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
          <div className="flex gap-2 border-b-2 border-gray-500 w-full mt-5 relative">
            <input
              type="checkbox"
              className="absolute bottom-3"
              onChange={(e) => dispatch({ type: "isChecked", payload: e.target.checked })}
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
          <button
            className="bg-primary-500 rounded-3xl px-[3rem] py-3 text-white"
            type="submit"
            onClick={handleSubmit}
          >
            회원가입
          </button>
        </div>
      </Form>
    </>
  );
}

export default function CreateUser() {
  return (
    <CreateUserProvider>
      <PageContent />
    </CreateUserProvider>
  );
}
