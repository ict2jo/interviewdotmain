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
import ReviewSubmenu from "./reviewSub";
import Pay_submenu from "./pay_submenu";
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
        <li className="relative whitespace-nowrap cursor-pointer">
          <div
              onMouseEnter={() => handleMouseEnter("ai")}
              onMouseLeave={() => handleMouseLeave()}
            >
            <Typography
              className="block"
              onClick={() => handleMenuClick("ai")}
            >
            AI면접
            </Typography>
            {activeMenu === "ai" && (
              <AI_submenu handleMenuClick={handleMenuClick} />
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

        <li className="relative whitespace-nowrap cursor-pointer">
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

        <li className="relative whitespace-nowrap cursor-pointer">
        <div
            onMouseEnter={() => handleMouseEnter("review")}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Typography
              className="block"
              onClick={() => handleMenuClick("review")}
            >
              게시판
            </Typography>
            {activeMenu === "review" && <ReviewSubmenu handleMenuClick={handleMenuClick} />}
          </div>
        </li>
        
        <li className="relative whitespace-nowrap cursor-pointer">
          <div
            onMouseEnter={() => handleMouseEnter("pay")}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Typography
              className="block"
              onClick={() => handleMenuClick("pay")}
            >
              이용권
            </Typography>
            {activeMenu === "pay" && (
              <Pay_submenu handleMenuClick={handleMenuClick} />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
})

export default Navigation;
