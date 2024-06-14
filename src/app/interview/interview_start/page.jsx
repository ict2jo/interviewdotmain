"use client"

import Header from '@/app/_components/Header';
import './interview_start.css'
export default function Interview_start(params) {

    const openPopup = () => {
        window.open('/interview/interview_select', 'interview', 'width=1000,height=800');
    };
    
    return (
        <>       
        <Header />
        <div className="interview_start">
            <button onClick={openPopup}>
                면접 연습 시작하기
            </button>
        </div>
        </>

    );
}
