"use client"

import { useState } from 'react';
import './payments.css'
import CheckoutPage from '@/app/sandbox/checkout/page';


export default function Payments() {
    const [activeIndex, setActiveIndex] = useState(null);


    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const handlePurchaseClick = (price) => {
        const purchaseUrl = `toss/?price=${price}`;
        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2 + window.screenX;
        const top = (window.innerHeight - height) / 2 + window.screenY;
        window.open(purchaseUrl, 'popupWindow', `width=${width},height=${height},top=${top},left=${left}`);
    };

    return (
        <>      
        <div className='guide_container'>
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
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 7,900</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(7900)}>구매</button>
                    </div>
                </div>

                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightblue"}}>7일 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 13,900</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(13900)}>구매</button>
                    </div>
                </div>

                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightpink"}}>30일 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 39,000</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(39000)}>구매</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
}
