import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";

export default function Page() {
  return (
    <div>
      <Form width="w-1/3">
        <p className="text-sm text-gray-800">
          회원의 등록된 정보로 비밀번호를 찾을 수 있습니다.
        </p>
        <div className="flex flex-col items-center justify-center gap-5 my-5">
          <Input placeholder="아이디" />
          <Input placeholder="이름" />
          <Input placeholder="생년월일" />
          <div className="relative w-full">
            <Input placeholder="이메일주소" />
            <Button type="smGray">인증번호</Button>
          </div>
          <Input placeholder="인증번호" />
          <div className="my-5">
            <Button type="mdBlue">비밀번호찾기</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
