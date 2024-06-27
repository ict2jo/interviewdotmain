'use client'
import Button from "@/app/_components/Button";
import Footer from "@/app/_components/Footer";
import Form from "@/app/_components/Form";
import Header from "@/app/_components/Header";
import Input from "@/app/_components/Input";
import axios from "axios";
import { useState } from "react";

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
      </Form> : (<p>회원님의 아이디는 {id} 입니다. </p>)}
    </>
  );
}

