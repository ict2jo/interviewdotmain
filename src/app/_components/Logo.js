"use client"

import { MenuContext } from "@/stores/StoreContext";
import { Typography } from "@mui/material";
import { useContext } from "react";


function Logo() {
  const menuStore = useContext(MenuContext);
  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu)
  }
  return (
    <Typography className="flex items-center gap-4 z-10"
    onClick={() => handleMenuClick("main")}>
      <span className="text-xl font-semibold text-primary-950">인터뷰닷</span>
    </Typography>
  );
}

export default Logo;
