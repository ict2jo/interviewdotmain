"use client"

import { Button, Pagination } from "@mui/material"
import "./interview_review.css"
import Header from "../_components/Header"

export default function Interview_Review() {
    return (
        <>
        <Header />
        <div className="review_container">
            <h1>면접 후기</h1>
            <div className="review_list">
                <div className="review_box_1">
                    <div className="review_box_1sub "></div>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                </div>
                <div className="review_box_2">
                    <div className="review_box_2sub "></div>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                </div>
                <div className="review_box_3">
                    <div className="review_box_3sub "></div>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                </div>
                <div className="review_box_4">
                    <div className="review_box_4sub "></div>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                </div>
            </div>
                <div>
                    <Pagination className="paging" count={10} variant="outlined" shape="rounded" />
                </div>
                
        </div>
        </>
    )
}