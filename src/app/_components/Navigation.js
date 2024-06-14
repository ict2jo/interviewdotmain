"use client";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import SubMenu from "./SubMenu";
import Interview_result_submenu from "./interview_result_submenu";
import { MenuContext } from "@/stores/StoreContext";
import { Typography } from "@mui/material";

export default function Navigation() {
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const submenuTimeoutRef = useRef(null);
  const menuStore = useContext(MenuContext);

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

  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu)
  }

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li className="whitespace-nowrap">
          <Typography className="hover:bg-primary-100 transition-colors"
          onClick={() => handleMenuClick("ai")} >
            AI면접
          </Typography>
        </li>

        <li className="relative whitespace-nowrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
          <div>
          <Typography  className="block"
              onClick={() => handleMenuClick("airesult")}>
            면접 결과 관리
          </Typography>
        </div>
          {isSubmenuVisible && <Interview_result_submenu handleMenuClick={handleMenuClick}/>}
        </li>
        <li className="whitespace-nowrap">
          <Typography
            className="hover:bg-primary-100 transition-colors"
            onClick={() => handleMenuClick("self")}>
            자기소개서
          </Typography>
        </li>
        <li
          className="relative whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hover:bg-primary-100 transition-colors">
            <Typography className="block"
              onClick={() => handleMenuClick("job")}>
              취업정보
            </Typography>

            {isSubmenuVisible && <SubMenu handleMenuClick={handleMenuClick}/>}
          </div>
        </li>
        <li className="whitespace-nowrap">
          <Typography
            className="hover:bg-primary-100 transition-colors"
            onClick={() => handleMenuClick("review")}>
            면접후기
          </Typography>
        </li>
      </ul>
    </nav>
  );
}
