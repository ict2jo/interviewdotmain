"use client"

import { Typography } from "@mui/material";


export default function Submenu({handleMenuClick}) {
  return (
    <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
      <li className="whitespace-nowrap cursor-pointer">
        <Typography className="block px-4 py-2 hover:bg-primary-100"
          onClick={() => handleMenuClick("jobTest")}>
          직업검사
        </Typography>
      </li>
      <li className="whitespace-nowrap cursor-pointer">
        <Typography
          onClick={() => handleMenuClick("result")}
          className="block px-4 py-2 hover:bg-primary-100"
        >
          검사결과
        </Typography>
      </li>
    </ul>
  );
}
