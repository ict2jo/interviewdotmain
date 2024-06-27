'use client'
import React, { useState } from "react";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import axios from "axios";
import { URL } from "@/app/api/boot/route";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

export default function Page() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  async function handleGetCode(e) {
    e.preventDefault();
    try {
      const res = await axios.get(`${URL}findPw`, {
        params: { id, email, name },
      });

      console.log("서버에서 받은 데이터:", res.data);

    } catch (err) {
      console.error("비밀번호 찾기 요청 오류:", err);
    }
  }

  function handleFindPwSubmit(e) {
    e.preventDefault();

    console.log("비밀번호 찾기 버튼 클릭됨");

  }

  return (
    <>
      <Header />
      <div className="my-12">
        <Form width="w-1/3">
          <p className="text-sm text-gray-800">
            회원님의 등록된 정보로 비밀번호를 찾을 수 있습니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 my-5">
            <Input
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="relative w-full">
              <Input
                placeholder="이메일주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="smGray" onClick={handleGetCode}>
                인증번호
              </Button>
            </div>
            <Input
              placeholder="인증번호"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <div className="my-5">
              <Button type="mdBlue" onClick={handleFindPwSubmit}>
                비밀번호찾기
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}
