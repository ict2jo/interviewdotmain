"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import paymentStore from '@/stores/paymentStore';

export default function Payments() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('useEffect 실행됨');
      
      // 요청 데이터 설정
      const requestData = {
        orderId: paymentStore.orderId,
        orderName: paymentStore.orderName,
        customerName: paymentStore.customerName,
        customerEmail: paymentStore.customerEmail,
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      // 요청 데이터 로그 출력
      console.log('요청 데이터:', requestData);

      // 결제 확인 함수 정의
      async function confirm() {
        try {
          const response = await fetch("/api/payment/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic dGVzdF9za182YkpYbWdvMjhld2dubE55Yk5HTVZMQW5HS1d4Og=="
            },
            body: JSON.stringify(requestData),
          });

          // 응답을 JSON 형식으로 변환
          const json = await response.json();

          // 응답이 실패한 경우
          if (!response.ok) {
            console.log('API 요청 실패:', json);
            router.push(`/fail?message=${json.message}&code=${json.code}`);
            return;
          }

          // 결제 성공 로그 출력
          console.log('Payment successfully processed:', json);
        } catch (error) {
          // 예외 처리 로그 출력
          console.error('API 요청 중 오류 발생:', error);
        }
      }

      // 결제 확인 함수 호출
      confirm();
    }
  }, [searchParams, router]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${paymentStore.orderId}`}</p>
        <p>{`주문상품: ${paymentStore.orderName}`}</p>
        <p>{`주문자: ${paymentStore.customerName}`}</p>
        <p>{`주문자 e-mail: ${paymentStore.customerEmail}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
      </div>
    </div>
  );
}
