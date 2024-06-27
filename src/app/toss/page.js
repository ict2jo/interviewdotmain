"use client"
import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import paymentStore from '@/stores/paymentStore'; 

const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "hC7PlnhNyJkEPD0LzUz-r";

export default function Page() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const priceParam = urlParams.get('price');
    if (priceParam) {
      setPrice(parseInt(priceParam, 10));
    }
  }, []);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement", 
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  // 결제하기 버튼
  const handlePaymentRequest = async () => {
  const orderId = Math.random().toString(36).slice(2);
  const orderName = "인터뷰닷 이용권";
  const customerName = "김토스";
  const customerEmail = "customer123@gmail.com";

    try {
      await paymentWidget?.requestPayment({
        orderId,
        orderName,
        customerName,
        customerEmail,
        successUrl: `${window.location.origin}/api/payments`,
        failUrl: `${window.location.origin}/api/payments2`,
      });

      paymentStore.setPaymentInfo(orderId, orderName, customerName, customerEmail);
      console.log('Updated payment info:', paymentStore);
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div>
      <div id="payment-widget" />
      <div id="agreement" />

      <label htmlFor="coupon-box">
        <input
          id="coupon-box"
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 2000 : price + 2000);
          }}
        />
        <span>2,000원 쿠폰 적용</span>
      </label> <br />
      
      <button onClick={handlePaymentRequest}>결제하기</button>
    </div>
  );
}
