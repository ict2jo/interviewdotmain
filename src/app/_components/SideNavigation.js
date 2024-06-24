"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import authStore from "@/stores/AuthStore";
import SubMenu from "./SubMenu"
import { useRouter } from "next/navigation";
import MySubmenu from "./MySubMenu";
import { Typography } from "@mui/material";
import menuStore from "@/stores/MenuStore";


export default function SideNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
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
    }
    if (session?.user) {
      setUserName(session.user.name)
      setUserImg(session.user.image)
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

  function handleLogout() {
    if (session?.user) {
      signOut();
      console.log("SNS 로그아웃");

    } else {
      console.log("logout");
      authStore.logout();
    }
    router.push("/");
  };
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
                src={userImg}
                alt={userImg}
                referrerPolicy="no-referrer"
              />
              {/* <span>{session.user.name}</span> */}
              <span>{userName}</span>
            </Typography>
            {isSubmenuVisible && <MySubmenu handleMenuClick={handleMenuClick} />}
            <li>
              <button className="hover:bg-primary-100 transition-colors" onClick={handleLogout}>로그아웃</button>
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
