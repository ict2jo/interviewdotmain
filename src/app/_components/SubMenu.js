"use client"

import { Typography } from "@mui/material";



export default function Layout({handleMenuClick}) {
  return (
    <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
      <li className="whitespace-nowrap">
        <Typography className="block px-4 py-2 hover:bg-primary-100"
        onClick={() => handleMenuClick("news")}>
          뉴스
        </Typography>
      </li>
      <li className="whitespace-nowrap">
        <Typography
          onClick={() => handleMenuClick("event")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          이벤트
        </Typography>
      </li>
      <li className="whitespace-nowrap">
        <Typography
          onClick={() => handleMenuClick("recruitment")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          채용정보
        </Typography>
      </li>
    </ul>
  );
}
