import React, { useEffect } from 'react';

export function SuccessPage() {
  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");

    // TODO: 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId,
      amount,
      paymentKey,
    };

    async function confirm() {
      try {
        const response = await fetch("/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const json = await response.json();
          // TODO: 결제 실패 처리 로직 구현
          console.error("결제 실패:", json);
          // 예시로 실패 페이지로 리다이렉션
          window.location.href = `/fail?message=${json.message}&code=${json.code}`;
          return;
        }

        // TODO: 결제 성공 처리 로직 구현
        const json = await response.json();
        console.log("결제 성공:", json);
        // 예시로 성공 페이지에 정보 출력
        renderSuccessPage(orderId, amount, paymentKey);
      } catch (error) {
        console.error("결제 확인 중 오류 발생:", error);
        // 예시로 실패 페이지로 리다이렉션
        window.location.href = '/fail';
      }
    }

    confirm();
  }, []);

  // 성공 페이지에 정보를 렌더링하는 함수 예시
  function renderSuccessPage(orderId, amount, paymentKey) {
    const formattedAmount = Number(amount).toLocaleString() + "원";
    const successElement = (
      <div className="result wrapper">
        <div className="box_section">
          <h2 style={{ padding: "20px 0px 10px 0px" }}>
            <img
              width="35px"
              src="https://static.toss.im/3d-emojis/u1F389_apng.png"
            />
            결제 성공
          </h2>
          <p>{`주문번호: ${orderId}`}</p>
          <p>{`결제 금액: ${formattedAmount}`}</p>
          <p>{`paymentKey: ${paymentKey}`}</p>
        </div>
      </div>
    );

    // 예시로 성공 페이지에 직접 삽입
    const successContainer = document.getElementById('success-container');
    successContainer.innerHTML = '';
    successContainer.appendChild(successElement);
  }

  return (
    <div id="success-container"></div>
  );
}
