"use client"

import './interview_start.css'
export default function Interview_start(params) {

    const openPopup = () => {
        window.open('/interview/interview_select', 'interview', 'width=1000,height=800');
    };
    
    return (
        <>       
        <div className="interview_start">
            <button onClick={openPopup}>
                면접 연습 시작하기
            </button>
        </div>
        </>

    );
}
