"use client";

import { useContext, useRef, useState } from "react";
import SubMenu from "./SubMenu";
import Interview_result_submenu from "./interview_result_submenu";
import { MenuContext } from "@/stores/StoreContext";
import { Typography } from "@mui/material";
import Resume_submenu from "./Resume_submenu";
import { observer } from "mobx-react-lite";
import AI_submenu from "./AI_submenu";
import userStore from "@/stores/UserStore";
const Navigation = observer(() => {
  const [activeMenu, setActiveMenu] = useState(null);
  const submenuTimeoutRef = useRef(null);
  const menuStore = useContext(MenuContext);

  const handleMouseEnter = (menu) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    menuStore.setSelectedMenu(menu);
  };


  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li className="relative whitespace-nowrap">
          <div
              onMouseEnter={() => handleMouseEnter("ai")}
              onMouseLeave={() => handleMouseLeave()}
            >
            <Typography
              className="block"
            >
            AI면접
            </Typography>
            {activeMenu === "ai" && (
              <AI_submenu handleMenuClick={handleMenuClick} />
            )}
            </div>
        </li>

        <li className="relative whitespace-nowrap">
          <div
            onMouseEnter={() => handleMouseEnter("airesult")}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Typography
              className="block"
            >
              면접 결과 관리
            </Typography>
            {activeMenu === "airesult" && (
              <Interview_result_submenu handleMenuClick={handleMenuClick} />
            )}
          </div>
        </li>

        <li className="relative whitespace-nowrap">
          <div
            onMouseEnter={() => handleMouseEnter("self")}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Typography
              className="hover:bg-primary-100 transition-colors"
              onClick={() => handleMenuClick("self")}
            >
              자기소개서
            </Typography>
            {activeMenu === "self" && (
              <Resume_submenu handleMenuClick={handleMenuClick} />
            )}
          </div>
        </li>

        <li className="relative whitespace-nowrap cursor-pointer">
          <div>
            <Typography
              className="block hover:bg-primary-100 transition-colors"
              onClick={() => handleMenuClick("recruitment")}
            >
              채용공고
            </Typography>

          </div>
        </li>

        <li className="relative whitespace-nowrap">
          <div
            onMouseEnter={() => handleMouseEnter("jobTest")}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Typography
              className="block hover:bg-primary-100 transition-colors"
              onClick={userStore.name? () => handleMenuClick("jobTest") : () => handleMenuClick("login")}
            >
              직업검사
            </Typography>
            {activeMenu === "jobTest" && <SubMenu handleMenuClick={handleMenuClick} />}
          </div>
        </li>

        <li className="whitespace-nowrap">
          <Typography
            className="hover:bg-primary-100 transition-colors"
            onClick={() => handleMenuClick("review")}
            onMouseEnter={() => handleMouseEnter("review")}
            onMouseLeave={() => handleMouseLeave()}
          >
            면접후기
          </Typography>
        </li>
      </ul>
    </nav>
  );
})

export default Navigation;
