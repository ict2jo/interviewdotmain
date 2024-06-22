"use client"

import { Typography } from "@mui/material";



export default function MySubmenu({handleMenuClick}) {
  return (
    <ul className="absolute right-20 top-16 mt-0 bg-white border border-gray-300 shadow-lg">
      <li className="whitespace-nowrap">
        <Typography className="block px-4 py-2 hover:bg-primary-100"
        onClick={() => handleMenuClick("profile")}>
          내 정보 수정
        </Typography>
      </li>
      <li className="whitespace-nowrap">
        <Typography
          onClick={() => handleMenuClick("schedule")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          캘린더
        </Typography>
      </li>
      <li className="whitespace-nowrap">
        <Typography
          onClick={() => handleMenuClick("intoduction")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          자기소개서 이력서
        </Typography>
      </li>
      <li className="whitespace-nowrap">
        <Typography
          onClick={() => handleMenuClick("inquiry")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          1:1문의
        </Typography>
      </li>
    </ul>
  );
}
