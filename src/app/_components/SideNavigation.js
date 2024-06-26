"use client"
import NoSsr from '@mui/material/NoSsr';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MySubmenu from "./MySubMenu";
import { Typography } from "@mui/material";
import menuStore from "@/stores/MenuStore";
import authStore from "@/stores/AuthStore";
import { observer } from "mobx-react-lite";
import userStore from "@/stores/UserStore";


const SideNavigation = observer(() => {

  const submenuTimeoutRef = useRef(null);
  const router = useRouter();
  const userName = userStore.name;

  const [isSubmenuVisible, setSubmenuVisible] = useState(false);

  const handleMouseEnter = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setSubmenuVisible(true);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setSubmenuVisible(false);
    }, 400); // 200ms 후에 서브메뉴를 숨김
  };

  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu)
  }

  function handleLogout() {
    console.log("logout");
    authStore.logout();

    router.push("/");
  };

  useEffect(() => {
    userStore.loadUserFromServer();
  }, []);
  return (
    <NoSsr>
      <nav className="z-10 text-xl">
        <ul className="flex gap-3 items-center text-sm">
          {userStore.name && (
            <>

              <Typography
                onClick={() => handleMenuClick("profile")}
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* <img
                className="h-8 rounded-full"
                src={userImg}
                alt={userImg}
                referrerPolicy="no-referrer"
              /> */}

                <span>{userStore.name}</span>
              </Typography>

              {isSubmenuVisible && <MySubmenu handleMenuClick={handleMenuClick} />}
              <li>
                <button className="hover:bg-primary-100 transition-colors" onClick={handleLogout}>로그아웃</button>
              </li>
            </>
          )} {!userStore.name && (
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
    </NoSsr>
  );
})
export default SideNavigation;