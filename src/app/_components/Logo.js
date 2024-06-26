"use client";

import { MenuContext } from "@/stores/StoreContext";
import Link from "next/link";
import { useContext } from "react";

function Logo() {
  const menuStore = useContext(MenuContext);
  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  return (
    <Link href="/" className="flex items-center gap-4 z-10 ">
      <span className="text-xl font-semibold text-primary-950 whitespace-nowrap">
        인터뷰닷
      </span>
    </Link>
  );
}

export default Logo;
