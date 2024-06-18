"use client"

import { Typography } from "@mui/material";

export default function Resume_submenu({handleMenuClick}) {
    return (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
            <li className="whitespace-nowrap">
                <Typography className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("career")}>
                    이력서
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("verification")}
                >
                    이력서 검증
                </Typography>
            </li>
        </ul>
    );
}
