"use client"

import { useState } from 'react';
import './starthome.css'

export default function Starthome() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(index);
    };
    
    return (
        <>      
        <div className='guide_container'>
            <h1>이용권</h1>

            <ul className="nav">
                {['인터뷰닷 이용권', '내 이용현황', '결제내역'].map((item, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => handleClick(index)}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

            <div className='tickets-container'>
                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "yellow"}}>3일 이용권</div>
                    <div className='ticket-inner'>
                        <p>₩ 7,900</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button>구매</button>
                    </div>
                </div>

                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightblue"}}>7일 이용권</div>
                    <div className='ticket-inner'>
                        <p>₩ 13,900</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button>구매</button>
                    </div>
                </div>

                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightpink"}}>30일 이용권</div>
                    <div className='ticket-inner'>
                        <p>₩ 39,000</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button>구매</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
