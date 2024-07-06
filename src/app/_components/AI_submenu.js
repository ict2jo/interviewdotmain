"use client"

import userStore from "@/stores/UserStore";
import { Typography } from "@mui/material";
import AuthStore from "@/stores/AuthStore";

export default function AI_submenu({handleMenuClick}) {
    const id = userStore.id;

    const openPopup = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => track.stop());

            if (!AuthStore.token) {
                alert("로그인 후 이용해 주시길 바랍니다.");
                return handleMenuClick("login");
            }

            const response = await fetch(`http://localhost:8080/interview/checkpay?id=${id}`);
            const data = await response.json();
            console.log(data);

            if (data) {
                if (confirm("면접 연습을 시작하시겠습니까?")) {
                    await fetch(`http://localhost:8080/interview/minuspay?id=${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: id })
                    });
                    const width = 1650;
                    const height = 950;
                    const left = (window.innerWidth - width) / 2 + window.screenX;
                    const top = (window.innerHeight - height) / 2 + window.screenY;
                    localStorage.removeItem('interviewResults');
                    localStorage.removeItem('rand');
                    window.open('/interview/select', 'interview', `width=${width},height=${height},left=${left},top=${top}`);
                } else {
                    return;
                }
            } else {
                alert("이용권이 없습니다. 이용권 구매 페이지로 이동됩니다.");
                return handleMenuClick("payments");
            }
        } catch (error) {
            alert("카메라 또는 마이크 장치를 확인할 수 없습니다. 오류: " + error.message);
        }
    };

    return (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg">
            <li className="whitespace-nowrap">
                <Typography className="block px-4 py-2 hover:bg-primary-100"
                    onClick={openPopup}>
                    AI 면접 시작하기
                </Typography>
            </li>
            <li className="whitespace-nowrap">
                <Typography className="block px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleMenuClick("airesult_history")}>
                    면접 기록
                </Typography>
            </li>
        </ul>
    );
}
