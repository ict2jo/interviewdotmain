"use client"

import userStore from '@/stores/UserStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import "./payDetail.css";

export default function PayDetail() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;

    console.log("idddd"+userStore.id);

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
                                <td colSpan="5">로딩중...</td>
                            </tr>
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan="5">이용권 구매 이력이 없습니다.</td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr key={index}>
                                    <td>{payment.payStatus}</td>
                                    <td>{payment.orderName}</td>
                                    <td>{payment.amount.toLocaleString()}</td>
                                    <td>{payment.approvedAt}</td>
                                    <td></td>
                                    <button>취소버튼</button>
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