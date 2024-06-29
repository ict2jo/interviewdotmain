"use client"

import userStore from '@/stores/UserStore';
import './payStatus.css'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PayStatus() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;

    console.log("222idddd"+userStore.id);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/payments/userPay?id=${userStore.id}`);
            const data = await response.json();
            setPayments(data);
            setLoading(false);


        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
            setLoading(false);
        }
        
    };
    
    useEffect(() => {
        fetchData();
    },[]);

    

    return(
        <>
        <div className='pay_container'>
            <h1>나의 이용권 현황</h1>
            <div className='payStatus'>
                {loading ? ( // 데이터 로딩 중일 때
                    <p>로딩중...</p>
                ) : payments.length === 0 ? ( // 결제 내역이 없을 때
                    <p>구매 이력이 없습니다.</p>
                ) : (
                    payments.map((payment, index) => (
                        <div className='payStatus_t' key={index}>
                            <div className={`${getBackgroundClass(payment.orderName)}`}>{payment.orderName}</div>
                            <div className='payStatus_inner'>
                                <p style={{ fontSize: "25px", fontWeight: "bold" }}>₩ {payment.amount.toLocaleString()}</p>
                                <p>{payment.amount/1000}회 면접 연습 + 분석</p>
                                <button>{payment.payStatus}</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>

    )

    function getBackgroundClass(orderName) {
        switch (orderName) {
            case '1회 이용권':
                return 'yellow-background';
            case '10회 이용권':
                return 'blue-background';
            case '내맘대로 이용권':
                return 'pink-background';
            default:
                return '';
        }
    }
}