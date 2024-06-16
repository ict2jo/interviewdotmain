"use client";
import React from 'react';
import './finish.css';
import { Button } from "@mui/material";

export default function Finish() {

    const handleRestart = () => {
        window.location.href = '/interview/choose';
    };

    const handleCheck = () => {
        const newTab = window.open('/ai/interview_history', '_blank');

        const checkClosed = setInterval(() => {
            if (newTab.closed) {
                clearInterval(checkClosed);
                window.location.href = '/interview/choose';
            }
        }, 1000);
    };

    return (
        <div className="container">
            <div className="white_box">
                <h1>면접 연습이 종료되었습니다.</h1>
                <Button onClick={handleRestart} variant="outlined" className="re_button">다시하기</Button>
                <Button onClick={handleCheck} variant="contained" className="check_button">피드백 확인하기</Button>
            </div>
        </div>
    );
}
