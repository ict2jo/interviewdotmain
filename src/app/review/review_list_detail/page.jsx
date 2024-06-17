"use client"

import Header from "@/app/_components/Header"
import { Button, Pagination, Rating } from "@mui/material"
import "./review_list_detail.css"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Review_List_Detail() {
    const router = useRouter();

    const handlewrite = () => {
        router.push("./review_list_write")
    };
    const handlelist = () => {
        router.push("./review_list")
    };

    return (
        <>
            <Header />
            <div className="list_container">
                <h1>면접 후기</h1>
                <div className="review_list">
                    <div className="review_row">
                        <div className="review_box">
                            <h1>면접 후기1</h1>
                            <h2>제목 : 첫 면접 후기</h2>
                            <h3>작성자 : 편조이</h3>
                            <h4>작성날짜 : 2024-05-06</h4>
                        </div>
                        <div className="list_sub">
                            <h1>회사 : LG</h1>
                            <Rating name="half-rating" defaultValue={3} precision={2.0} />
                            <p>회사 정보 : 정보석입니다.</p>
                        </div>
                    </div>
                </div>
                <div className="list_content">
                    <p>내용: 첫 면접후기 입니다....<br />
                        내용: 첫 면접후기 입니다....<br />
                        내용: 첫 면접후기 입니다....<br />
                        내용: 첫 면접후기 입니다....<br />
                        내용: 첫 면접후기 입니다....<br />
                    </p>
                </div>
                <div>
                <Button className="write_btn1" variant="contained" onClick={handlelist}>목록</Button>    
                <Button className="write_btn1" variant="contained" onClick={handlewrite}>작성 하기</Button>
                </div>
            </div>

        </>
    )
}