"use client"

import userStore from '@/stores/UserStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./payDetail.css";

export default function PayDetail() {
    const [payments, setPayments] = useState([]);
    const [cancelReasons, setCancelReasons] = useState({});
    const [loading, setLoading] = useState(true);
    const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
    const encodedKey = btoa(secretKey + ':');
    const params = useParams();
    const id = params.id;

    console.log("결제취소창"+userStore.id);

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
    
    // 결제취소
    const handleCancel = async (t_idx) => {
        try {
            console.log("취소시작 "+userStore.id);

            // payments 배열에서 t_idx에 해당하는 결제 항목을 찾기
            const payment = payments.find(payment => payment.t_idx === t_idx);
            if (!payment) {
                console.error(`결제 항목을 찾을 수 없습니다: ${t_idx}`);
                return;
            }

            const cancelReason = cancelReasons[t_idx] || "기타 사유";

            const response = await axios.post(
                `http://localhost:8080/payments/cancel`,
                {
                    t_idx: payment.t_idx,
                    paymentKey: payment.paymentKey,
                    cancelReason: cancelReason,
                    id: userStore.id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${encodedKey}`
                    },
                }
            );

            if (response.status === 200) {
                alert("결제가 취소되었습니다.");
                fetchData(); // 데이터 갱신
            } else {
                alert("결제 취소에 실패하였습니다.");
                console.error('Failed to confirm payment:', response.statusText);
            }
        } catch (error) {
            console.error('결제 취소 중 오류가 발생하였습니다.', error);
        }
    };

    const handleReasonChange = (e, t_idx) => {
        setCancelReasons({
            ...cancelReasons,
            [t_idx]: e.target.value,
        });
    };

    useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
        <div className='detail'>
            <h1>결제내역</h1>
            <div className='detail_t'>
                <table>
                    <tbody>
                        <tr>
                            <th>상태</th>
                            <th>결제상품</th>
                            <th>결제금액</th>
                            <th>결제일자</th>
                            <th>결제취소사유</th>
                            <th>결제취소</th>
                            </tr>

                        {loading ? (
                            <tr>
                                <td colSpan="6">로딩중...</td>
                            </tr>
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan="6">이용권 구매 이력이 없습니다.</td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr key={index}>
                                    <td>{payment.payStatus}</td>
                                    <td>{payment.orderName}</td>
                                    <td>{payment.amount.toLocaleString()}</td>
                                    <td>{payment.approvedAt}</td>
                                    <td>
                                        <select onChange={(e) => handleReasonChange(e, payment.t_idx)} value={cancelReasons[payment.t_idx] || ""}>
                                            <option value="">취소 사유 선택</option>
                                            <option value="고객 변심">단순 변심</option>
                                            <option value="주문 실수">주문 실수</option>
                                            <option value="이중 결제">이중 결제</option>
                                            <option value="기타 사유">기타 사유</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleCancel(payment.t_idx)}>취소</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}