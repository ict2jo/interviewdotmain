"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import SubMenu from "./SubMenu";
import Interview_result_submenu from "./interview_result_submenu";

export default function Navigation() {
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const submenuTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setSubmenuVisible(true);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setSubmenuVisible(false);
    }, 200); // 200ms 후에 서브메뉴를 숨김
  };
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li className="whitespace-nowrap">
          <Link
            href="/interview/interview_start"
            className="hover:bg-primary-100 transition-colors"
          >
            AI면접
          </Link>
        </li>

        <li
            className="relative whitespace-nowrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            면접 결과 관리
          {isSubmenuVisible && <Interview_result_submenu />}
        </li>
        <li className="whitespace-nowrap">
          <Link
            href="/introduction"
            className="hover:bg-primary-100 transition-colors"
          >
            자기소개서
          </Link>
        </li>
        <li
          className="relative whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hover:bg-primary-100 transition-colors">
            <Link href="/job/news" className="block">
              취업정보
            </Link>

            {isSubmenuVisible && <SubMenu />}
          </div>
        </li>
        <li className="whitespace-nowrap">
          <Link
            href="/community"
            className="hover:bg-primary-100 transition-colors"
          >
            면접후기
          </Link>
        </li>
      </ul>
    </nav>
  );
}
