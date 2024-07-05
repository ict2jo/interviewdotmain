"use client"

import { Typography } from "@mui/material";

export default function ReviewSubmenu({handleMenuClick}) {
    return (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
            <li className="whitespace-nowrap">
                <Typography className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("ReviewList")}>
                    면접후기 게시판
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("SuccessList")}
                >
                    합격자 게시판
                </Typography>
            </li>
        </ul>
    );
}
