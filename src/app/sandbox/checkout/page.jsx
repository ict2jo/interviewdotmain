'use client';

import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { observer } from 'mobx-react-lite';
import '../style.css';
const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

const CheckoutPage = observer(() => {
    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const agreementWidgetRef = useRef(null);
    const [price, setPrice] = useState(null); // 초기값을 null로 설정
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    useEffect(() => {
        // URL에서 query parameter를 추출하여 price 상태 업데이트
        const getPriceFromUrl = () => {
            const params = new URLSearchParams(window.location.search);
            const priceParam = params.get('price');
            return priceParam ? parseInt(priceParam, 10) : null; // null로 초기화
        };

        // 페이지 로드 시 price 상태 업데이트
        setPrice(getPriceFromUrl());
    }, []);

    useEffect(() => {
        if (price !== null) {
            // Toss Payments SDK 로드 및 초기화
            const loadPayment = async () => {
                try {
                    const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS);

                    if (paymentWidgetRef.current == null) {
                        paymentWidgetRef.current = paymentWidget;
                    }

                    // 결제창 렌더링
                    const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
                        '#payment-method',
                        { value: price },
                        { variantKey: 'DEFAULT' }
                    );
                    paymentMethodsWidgetRef.current = paymentMethodsWidget;

                    // 약관 렌더링
                    agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement('#agreement', {
                        variantKey: 'DEFAULT',
                    });
                } catch (error) {
                    console.error('Failed to load payment widget:', error);
                    // TODO: 에러 처리
                }
            };

            loadPayment();
        }
    }, [price]);

    const handlePaymentRequest = async () => {
        const paymentWidget = paymentWidgetRef.current;

        try {
            // 결제 요청
            await paymentWidget?.requestPayment({
                orderId: generateRandomString(),
                orderName: '인터뷰닷 이용권',
                customerName: '김토스',
                customerEmail: 'customer123@gmail.com',
                value: price, // 실제 결제할 금액을 설정해야 합니다.
                successUrl: window.location.origin + '/sandbox/success' + window.location.search,
                failUrl: window.location.origin + '/sandbox/fail' + window.location.search,
            });
        } catch (error) {
            console.error('Payment request failed:', error);
            // TODO: 에러 처리
        }
    };

    return (
        <div className="wrapper w-100">
            <div className="max-w-540 w-100">
                <div id="payment-method" className="w-100" />
                <div id="agreement" className="w-100" />
                <div className="btn-wrapper w-100">
                    <button
                        className="btn primary w-100"
                        onClick={handlePaymentRequest} 
                        disabled={price === null || price <= 0}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CheckoutPage;
