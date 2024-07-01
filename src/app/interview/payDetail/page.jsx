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
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
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
            
            // t_idx 값 기준으로 내림차순 정렬
            data.sort((a, b) => b.t_idx - a.t_idx);
            
            setPayments(data);
            setLoading(false);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
            setLoading(false);
        }
        
    };
    
    // 결제취소
    const handleCancel = async () => {
        try {
            console.log("취소시작 " + userStore.id);

            // 결제취소 사유 확인
            const cancelReason = cancelReasons[selectedPayment.t_idx];
            if (!cancelReason) {
                alert("결제 취소 사유를 선택해 주세요.");
                return;
            }

            const response = await axios.post(
                `http://localhost:8080/payments/cancel`,
                {
                    t_idx: selectedPayment.t_idx,
                    paymentKey: selectedPayment.paymentKey,
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
                fetchData();
                setShowModal(false);
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

    const openModal = (payment) => {
        setSelectedPayment(payment);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedPayment(null);
        setShowModal(false);
    };

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <>
            <div className='detail'>
                <h1>결제내역</h1>
                <div className='detail_t'>
                    <table>
                        <tbody>
                        <tr>
                            <th rowSpan="2">상태</th>
                            <th rowSpan="2">결제상품</th>
                            <th rowSpan="2">결제금액</th>
                            <th rowSpan="2">결제수단</th>
                            <th>결제일자</th>
                            <th rowSpan="2">결제취소사유</th>
                        </tr>
                        <tr>
                            <th>취소일자</th>
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
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td rowSpan="2">{payment.payStatus}</td>
                                            <td rowSpan="2">{payment.orderName}</td>
                                            <td rowSpan="2">{payment.amount.toLocaleString()}</td>
                                            <td rowSpan="2">{payment.provider}</td>
                                            <td>{payment.approvedAt}</td>
                                            <td rowSpan="2">
                                                {payment.payStatus !== "취소완료" ? (
                                                    <button onClick={() => openModal(payment)}>
                                                        취소
                                                    </button>
                                                ) : (
                                                    <span>{payment.cancelReason}</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >{payment.canceledAt ? payment.canceledAt : <span style={{color: 'white'}}>없음</span>}</td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>결제 취소</h2>
                        <select onChange={(e) => handleReasonChange(e, selectedPayment.t_idx)} value={cancelReasons[selectedPayment.t_idx] || ""}>
                            <option value="">취소 사유 선택</option>
                            <option value="고객 변심">단순 변심</option>
                            <option value="주문 실수">주문 실수</option>
                            <option value="이중 결제">이중 결제</option>
                            <option value="기타 사유">기타 사유</option>
                        </select>
                        <div>
                            <button onClick={closeModal}>뒤로가기</button>
                            <button onClick={handleCancel}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}