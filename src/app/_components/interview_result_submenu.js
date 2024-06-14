"use client"

import { Typography } from "@mui/material";

export default function Interview_result_submenu({handleMenuClick}) {
    return (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
            <li className="whitespace-nowrap">
                <Typography className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("airesult_history")}>
                    면접 기록
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("airesult_feedback")}
                >
                    AI 피드백
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("airesult_guide")}
                >
                    면접 가이드
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography
                    className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("airesult_question")}
                >
                    질문 저장소
                </Typography>
            </li>
        </ul>
    );
}
