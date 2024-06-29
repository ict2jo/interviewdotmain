"use client"

import { Typography } from "@mui/material";

export default function AI_submenu({handleMenuClick}) {
    return (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
            <li className="whitespace-nowrap">
                <Typography className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("ai")}>
                    면접 연습하기
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("payments")}
                >
                    이용권 구매
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("payStatus")}
                >
                    나의 이용현황
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("payDetail")}
                >
                    결제내역
                </Typography>
            </li>
        </ul>
    );
}
