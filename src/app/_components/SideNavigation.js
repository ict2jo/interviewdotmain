"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef , useState } from "react";
import authStore from "@/stores/AuthStore";
import MySubmenu from "./MySubMenu";
import { Typography } from "@mui/material";
import menuStore from "@/stores/MenuStore";

export default function SideNavigation() {
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  // const { data: session, status } = useSession();
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const submenuTimeoutRef = useRef(null);
  const handleMouseEnter = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setSubmenuVisible(true);
  };

  useEffect(() => {
    const user = authStore.getUser();
    if (user) {
      setUserName(user.name)
      setUserImg(user.u_img)
      console.log(user);
    }
  }, []);

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setSubmenuVisible(false);
    }, 400); // 200ms 후에 서브메뉴를 숨김
  };

  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu)
  }
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-3 items-center text-sm">
        {userName && (
          <>
            <Typography
              onClick={() => handleMenuClick("profile")}
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="h-8 rounded-full"
                // src={session.user.image}
                // alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              {/* <span>{session.user.name}</span> */}
              <span>{userName}</span>
            </Typography>
            {isSubmenuVisible && <MySubmenu handleMenuClick={handleMenuClick} />}
            <li>
              <button className="hover:bg-primary-100 transition-colors" onClick={() => {
                signOut()
              }}>로그아웃</button>
            </li>
          </>
        )} {!userName && (
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
