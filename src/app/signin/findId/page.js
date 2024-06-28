'use client'
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import axios from "axios";
import { useState } from "react";
import { URL } from "@/app/api/boot/route";

export default function FindIdContent() {
  const [id, setId] = useState('');
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birth, setBirth] = useState("")
  const [verified, setVerified] = useState(false)

  async function handleFindIdSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}findUserId`, {
        name: name,
        email: email,
        birth: birth
      });

      if (res.status === 200) {
        setId(res.data);
        setVerified(true)
        rounter.push("/signin/login")
      }
    } catch (err) {
      console.error("아이디 찾기 오류:", err);
    }
  }

  return (
    <>
      {!verified ? <Form width="w-1/3">
        <p className="text-sm text-gray-800">
          회원의 등록된 정보로 아이디를 찾을 수 있습니다.
        </p>
        <div className="flex flex-col items-center justify-center gap-5 my-5">
          <Input placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <Input placeholder="이메일주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="생년월일 6자리"
            value={birth}
            onChange={(e) => setBirth(e.target.value)} />
          <div className="my-5">
            <Button type="mdBlue" onClick={handleFindIdSubmit}>아이디찾기</Button>
          </div>
        </div>
      </Form> : (<div className="h-[85vh] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        <p className="text-center">회원님의 아이디는 <span className="text-primary-600 font-extrabold">{id}</span> 입니다.</p>
      </div>)}
    </>
  );
}

