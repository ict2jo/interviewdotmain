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

            // t_idx 값 기준으로 내림차순 정렬
            data.sort((a, b) => b.t_idx - a.t_idx);
            
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

    function getBackgroundClass(orderName, payStatus) {
        if (payStatus === "취소완료" || payStatus === "취소중") {
            return "transparent-black"; // 스타일 클래스 이름
        }
    
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

    // 각 줄을 3개의 아이템으로 채우기
    const rows = [];
    for (let i = 0; i < payments.length; i += 3) {
        rows.push(payments.slice(i, i + 3));
    }



    return (
    <div className='pay_container'>
        <h1>나의 이용권 현황</h1>
        <div className='payStatus'>
            {loading ? (
                <p>로딩중...</p>
            ) : payments.length === 0 ? (
                <p>이용권 구매 이력이 없습니다.</p>
            ) : (
                rows.map((row, rowIndex) => (
                    <div className='payStatus_row' key={rowIndex}>
                        {Array.from({ length: 3 }).map((_, index) => {
                            const payment = row[index];
                            return payment ? (
                                <div className='payStatus_t' key={index}>
                                    <div className={`${getBackgroundClass(payment.orderName, payment.payStatus)}`}>{payment.orderName}</div>
                                    <div className='payStatus_inner'>
                                        <p style={{ fontSize: "25px", fontWeight: "bold" }}>₩ {payment.amount.toLocaleString()}</p>
                                        <p>{payment.amount / 1000}회 면접 연습 + 분석</p>
                                        <p style={{ margin: "0px" }}>
                                            {payment.payStatus === "취소완료" || payment.remainCount === 0 ? <br /> : `${payment.remainCount}회 사용가능`}
                                        </p>
                                        <button disabled>
                                            {payment.payStatus === "취소중" || payment.payStatus === "취소완료"
                                                ? "사용불가"
                                                : payment.remainCount === 0
                                                ? "사용완료"
                                                : payment.statusCount >= payment.remainCount
                                                ? "사용중"
                                                : ""}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='payStatus_t empty' key={index}></div>
                            );
                        })}
                    </div>
                ))
            )}
        </div>
    </div>
);

}