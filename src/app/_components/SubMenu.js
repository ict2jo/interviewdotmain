"use client"

import Link from "next/link";



export default function Layout() {
  return (
    <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
      <li className="whitespace-nowrap">
        <Link href="/job/news" className="block px-4 py-2 hover:bg-primary-100">
          뉴스
        </Link>
      </li>
      <li className="whitespace-nowrap">
        <Link
          href="/job/events"
          className="block px-4 py-2 hover:bg-primary-100"
        >
          이벤트
        </Link>
      </li>
      <li className="whitespace-nowrap">
        <Link
          href="/job/recruitment/list"
          className="block px-4 py-2 hover:bg-primary-100"
        >
          채용정보
        </Link>
      </li>
    </ul>
  );
}
