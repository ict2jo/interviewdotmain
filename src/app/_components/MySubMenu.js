"use client"


export default function MySubmenu({handleMenuClick}) {
  return (
    <ul className="absolute right-20 top-16 mt-0 bg-white border border-gray-300 shadow-lg">
      <li className="whitespace-nowrap">
        <div className="block px-4 py-2 hover:bg-primary-100"
        onClick={() => handleMenuClick("profile")}>
          내 정보 수정
        </div>
      </li>
      <li className="whitespace-nowrap">
        <div
          onClick={() => handleMenuClick("schedule")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          캘린더
        </div>
      </li>
      <li className="whitespace-nowrap">
        <div
          onClick={() => handleMenuClick("resume")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          이력서
        </div>
      </li>
      <li className="whitespace-nowrap">
        <div
          onClick={() => handleMenuClick("inquiry")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          1:1문의
        </div>
      </li>
      <li className="whitespace-nowrap">
        <div
          onClick={() => handleMenuClick("myrecruitment")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          내 채용공고 보기
        </div>
      </li>
      <li className="whitespace-nowrap">
        <div
          onClick={() => handleMenuClick("payDetail")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          결제내역
        </div>
      </li>
    </ul>
  );
}
