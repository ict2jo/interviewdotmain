"use client";

import { useContext, useRef, useState } from "react";
import SubMenu from "./SubMenu";
import { MenuContext } from "@/stores/StoreContext";
import { Typography } from "@mui/material";
import Resume_submenu from "./Resume_submenu";
import { observer } from "mobx-react-lite";
import AI_submenu from "./AI_submenu";
import userStore from "@/stores/UserStore";
import ReviewSubmenu from "./reviewSub";
import Pay_submenu from "./pay_submenu";
import AuthStore from "@/stores/AuthStore";
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

  const id = userStore.id;

  const openPopup = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());

      if (!AuthStore.token) {
        alert("로그인 후 이용해 주시길 바랍니다.");
        return handleMenuClick("login");
      }

      const response = await fetch(`http://localhost:8080/interview/checkpay?id=${id}`);
      const data = await response.json();
      console.log(data);

      if (data) {
        if (confirm("면접 연습을 시작하시겠습니까?")) {
          await fetch(`http://localhost:8080/interview/minuspay?id=${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
          });
          const width = 1650;
          const height = 950;
          const left = (window.innerWidth - width) / 2 + window.screenX;
          const top = (window.innerHeight - height) / 2 + window.screenY;
          localStorage.removeItem('interviewResults');
          localStorage.removeItem('rand');
          window.open('/interview/select', 'interview', `width=${width},height=${height},left=${left},top=${top}`);
        } else {
          return;
        }
      } else {
        alert("이용권이 없습니다. 이용권 구매 페이지로 이동됩니다.");
        return handleMenuClick("payments");
      }
    } catch (error) {
      alert("카메라 또는 마이크 장치를 확인할 수 없습니다. 오류: " + error.message);
    }
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
              onClick={openPopup}
            >
            AI면접
            </Typography>
            {activeMenu === "ai" && (
              <AI_submenu handleMenuClick={handleMenuClick} />
            )}
            </div>
        </li>

        <li className="relative whitespace-nowrap cursor-pointer">
          <div
            onMouseEnter={() => handleMouseEnter("airesult")}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Typography
              className="block"
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

        <li className="relative whitespace-nowrap">
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
        <li className="relative whitespace-nowrap">
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
