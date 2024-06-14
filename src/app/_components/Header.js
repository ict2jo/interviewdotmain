"use client"

import Logo from "./Logo";
import Navigation from "./Navigation";
import SideNavigation from "./SideNavigation";
import AuthContext from "../_lib/hooks/AuthContext";
function Header() {
  return (
    <AuthContext>
      <header className="w-full bg-white px-8 py-5">
        <div className="flex justify-between items-center max-w-9xl mx-auto">
          <Logo />
          <Navigation />
          <SideNavigation />
        </div>
      </header>
    </AuthContext>
  );
}

export default Header;
