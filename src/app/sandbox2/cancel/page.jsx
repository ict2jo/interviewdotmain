import React from 'react';

const CancelResult = ({ isSuccess, responseJson }) => {
    return (
        <section>
            {isSuccess ? (
                <>
                    <h1>취소 성공</h1>
                    <p>결과 데이터: {JSON.stringify(responseJson)}</p>
                    <p>orderName: {responseJson.orderName}</p>
                    <p>method: {responseJson.method}</p>
                    <p>cancels: {responseJson.cancels[0].cancelReason}</p>
                </>
            ) : (
                <>
                    <h1>취소 실패</h1>
                    <p>에러메시지: {responseJson.message}</p>
                    <span>에러코드: {responseJson.code}</span>
                </>
            )}
        </section>
    );
};

export default CancelResult;
