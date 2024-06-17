"use client";

import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 ">
      <span className="text-xl font-semibold text-primary-950 whitespace-nowrap">
        인터뷰닷
      </span>
    </Link>
  );
}

export default Logo;
