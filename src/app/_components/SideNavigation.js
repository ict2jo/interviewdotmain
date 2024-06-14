"use client"

import Link from "next/link";
//import { auth } from "../_lib/auth";

export default function SideNavigation() {
  //const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <Link
          href="/login"
          className="hover:bg-primary-100 transition-colors"
        >
          Login
        </Link>
        {/* {session?.user?.image ? (
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
            <span> Guest area</span>
          </Link>
        ) : (<li>
          <Link
            href="/login"
            className="hover:bg-primary-100 transition-colors"
          >
            Login
          </Link>
        </li>)} */}
      </ul>
    </nav>
  );
}
