"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import paymentStore from '@/stores/paymentStore'; 

export default function Payments() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const requestData = {
      orderId: paymentStore.orderId,
      orderName: paymentStore.orderName,
      customerName: paymentStore.customerName,
      customerEmail: paymentStore.customerEmail,
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        router.push(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
      console.log('Payment successfully processed:', json);
    }
    confirm();
  }, [searchParams]);

  
  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${paymentStore.orderId}`}</p>
        <p>{`주문상품: ${paymentStore.orderName}`}</p>
        <p>{`주문자: ${paymentStore.customerName}`}</p>
        <p>{`주문자 e-mail: ${paymentStore.customerEmail}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
      </div>
    </div>
  );
}
