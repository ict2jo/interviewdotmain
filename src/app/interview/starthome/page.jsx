"use client"

import './starthome.css'
export default function Starthome(params) {

    const openPopup = () => {
        window.open('/interview/select', 'interview', 'width=1000,height=800');
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
