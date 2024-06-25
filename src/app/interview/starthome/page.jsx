"use client"

import './starthome.css'

export default function Starthome(params) {
    const openPopup = () => {
        const width = 1650;
        const height = 950;
        const left = (window.innerWidth - width) / 2 + window.screenX;
        const top = (window.innerHeight - height) / 2 + window.screenY;
        window.open('/interview/select', 'interview', `width=${width},height=${height},left=${left},top=${top}`);
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
