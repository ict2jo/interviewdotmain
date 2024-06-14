"use client"

import Link from "next/link";

export default function Interview_result_submenu() {
    return (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
            <li className="whitespace-nowrap">
                <Link href="/ai/interview_history" className="block px-4 py-2 hover:bg-primary-100">
                    면접 기록
                </Link>
            </li>
            <li className="whitespace-nowrap">
                <Link
                    href="/ai/interview_feedback"
                    className="block px-4 py-2 hover:bg-primary-100"
                >
                    AI 피드백
                </Link>
            </li>
            <li className="whitespace-nowrap">
                <Link
                    href="/ai/interview_guide"
                    className="block px-4 py-2 hover:bg-primary-100"
                >
                    면접 가이드
                </Link>
            </li>
            <li className="whitespace-nowrap">
                <Link
                    href="/ai/question_repository"
                    className="block px-4 py-2 hover:bg-primary-100"
                >
                    질문 저장소
                </Link>
            </li>
        </ul>
    );
}
