import Link from "next/link";
import Button from "../_components/Button";

export default function page() {
  return (
    <div className="m-auto w-[420px]">
      <h1 className="border-b border-gray-700 py-5 font-extrabold text-3xl">
        아이디/ 비밀번호 찾기
      </h1>
      <p className="my-5">가입한 아이디와 비밀번호를 잊으셨습니까? </p>
      <div className="flex justify-center items-center gap-4">
        <Button type="longBlue">
          <Link href="/findId">아이디찾기</Link>
        </Button>

        <Button type="longBlue">
          <Link href="/findPw">비밀번호찾기 </Link>
        </Button>
      </div>
    </div>
  );
}
