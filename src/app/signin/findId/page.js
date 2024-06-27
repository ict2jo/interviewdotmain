'use client'
import Button from "@/app/_components/Button";
import Footer from "@/app/_components/Footer";
import Form from "@/app/_components/Form";
import Header from "@/app/_components/Header";
import Input from "@/app/_components/Input";
import { useState } from "react";


export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  //수정해야함 
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

  return (
    <>
      <Header />
      <div className="my-12">
        <Form width="w-1/3">
          <p className="text-sm text-gray-800">
            회원의 등록된 정보로 아이디를 찾을 수 있습니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 my-5">
            <Input placeholder="이름" />
            <div className="relative w-full">
              <Input placeholder="이메일주소" />
              <Button type="smGray" onClick={handleGetCode}>인증번호</Button>
            </div>
            <Input placeholder="인증번호" />
            <div className="my-5">
              <Button type="mdBlue">아이디찾기</Button>
            </div>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}
