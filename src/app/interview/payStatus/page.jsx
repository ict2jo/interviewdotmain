import './payStatus.css'

export default function PayStatus() {
    return(
        <>
        <div className='tickets-container'>
                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "yellow"}}>3일 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 7,900</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(7900)}>구매</button>
                    </div>
                </div>

                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightblue"}}>7일 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 13,900</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(13900)}>구매</button>
                    </div>
                </div>

                <div className='ticket'>
                    <div className='ticket-op' style={{backgroundColor: "lightpink"}}>30일 이용권</div>
                    <div className='ticket-inner'>
                        <p style={{fontSize: "25px", fontWeight:"bold"}}>₩ 39,000</p>
                        <p>무제한 면접 연습 + 분석</p>
                        <button onClick={() => handlePurchaseClick(39000)}>구매</button>
                    </div>
                </div>
            </div>    
        </>
    )
}