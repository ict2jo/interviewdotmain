"use client"

import { Button, Pagination, Rating, Typography } from "@mui/material"
import "./review_success.css"
import Link from "next/link"
import Header from "@/app/_components/Header"
import { useRouter } from "next/navigation"


export default function Review_Success() {
    const router = useRouter();

    const handleSuccessList = () => {
        router.push("./review_success_detail")
    };

    return (
        <>
        <Header/>
        <div className="success_container">
            <h1>합격자 후기</h1>
                <div className="success_list">
                <div className="success_box1" onClick={handleSuccessList}>
                    <h1>합격 후기 1</h1><Rating name="half-rating" defaultValue={3} precision={2.0} />
                    <h2>회사: 삼성</h2>
                    <h3>제목: 첫 면접 합격</h3>
                    <h4>작성 날짜 : 2024-05-01</h4>
                    <p>내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...</p>
                </div>
                <div className="success_box2">
                    <h1>합격 후기 2</h1><Rating name="half-rating" defaultValue={3} precision={2.0} />
                    <h2>회사: LG</h2>
                    <h3>제목: 두 번째 면접 합격</h3>
                    <h4>작성 날짜 : 2024-05-01</h4>
                    <p>내용: 두 번째 면접에서 합격한 기쁨을 나누고 싶습니다...</p>
                </div>
                <div className="success_box3">
                    <h1>합격 후기 3</h1><Rating name="half-rating" defaultValue={3} precision={2.0} />
                    <h2>회사: 현대</h2>
                    <h3>제목: 세 번째 면접 합격</h3>
                    <h4>작성 날짜 : 2024-05-01</h4>
                    <p>내용: 세 번째 면접에서 합격한 기쁨을 나누고 싶습니다...</p>
                </div>
                <div className="success_box4">
                    <h1>합격 후기 4</h1><Rating name="half-rating" defaultValue={3} precision={2.0} />
                    <h2>회사: 네이버</h2>
                    <h3>제목: 네 번째 면접 합격</h3>
                    <h4>작성 날짜 : 2024-05-01</h4>
                    <p>내용: 네 번째 면접에서 합격한 기쁨을 나누고 싶습니다...</p>
                </div>
                <div>
                    <Pagination className="paging" count={10} variant="outlined" shape="rounded" />
                </div>
                </div>
            </div>
        </>
    )
}