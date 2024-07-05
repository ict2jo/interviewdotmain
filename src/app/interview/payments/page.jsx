"use client"

import { useState } from 'react';
import './payments.css'
import userStore from '@/stores/UserStore';

export default function Payments() {
    const [count, setCount] = useState(1);
    const basePrice = 0;

    const handlePurchaseClick = (price) => {
        const purchaseUrl = `toss/?price=${price}`;
        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2 + window.screenX;
        const top = (window.innerHeight - height) / 2 + window.screenY;
        window.open(purchaseUrl, 'popupWindow', `width=${width},height=${height},top=${top},left=${left}`);
    };

    const handleCountChange = (event) => {
        const value = event.target.value;
        // 입력 값이 빈 문자열인 경우 1으로 설정
        if (value === '') {
            setCount('1');
        } else {
            // 입력 값이 숫자인지 확인하고 숫자로 변환
            const numericValue = parseInt(value, 10);
            // 숫자인 경우에만 상태 업데이트
            if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 100) {
                setCount(numericValue);
            }
        }
    };

    return (
        <>      
        <div className='pay_container'>
            <h1>인터뷰닷 이용권</h1>
            <div className='tickets-container'>
                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "yellow"}}>1회 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 1,000</p>
                        <p>1회 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(1000)}>구매</button>
                    </div>
                </div>
                
                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightblue"}}>10회 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 10,000</p>
                        <p>10회 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(10000)}>구매</button>
                    </div>
                </div>
                
                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightpink"}}>내맘대로 이용권 <br /></div>
                    <div className='ticket-inner'>
                        <div className='ticket-input'>
                            <input type="number" value={count} onChange={handleCountChange} min="1" max="100" />
                            <p>회</p>
                        </div>
                        <p style={{fontSize: "25px", fontWeight:"bold", marginTop:"20px"}}>₩ {(basePrice + (count * 1000)).toLocaleString()}</p>
                        <p>{count}회 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(basePrice + (count * 1000))}>구매</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
