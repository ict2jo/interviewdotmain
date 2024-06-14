"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SideNavigation() {
  const { data: session, status } = useSession();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-3 items-center text-sm">
        {session?.user && (
          <>
            <Link
              href="/mypage"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>{session.user.name}</span>
            </Link>
            <li>
              <button className="hover:bg-primary-100 transition-colors" onClick={() => {
                console.log('click');
                signOut()
              }}>로그아웃</button>
            </li>
          </>
        )} {!session?.user && (
          <>
            <li>
              <Link
                href="/signin/login"
                className="hover:bg-primary-100 transition-colors whitespace-nowrap"
              >
                로그인
              </Link>
            </li>
            <li>
              <Link
                href="/signin/createUser"
                className="hover:bg-primary-100 transition-colors whitespace-nowrap"
              >
                회원가입
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
