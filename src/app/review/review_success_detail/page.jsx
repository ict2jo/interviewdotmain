"use client"

import { Button, Pagination, Rating } from "@mui/material"
import "./review_success_detail.css"
import Header from "../../_components/Header"
import Link from "next/link"

export default function Review_Success_Detail() {
    return(
        <>
        <div className="detail_container">
        <h1>합격자 후기</h1>
           <div className="detail_list">
               <div className="detail_row">
                   <div className="detail_box">
                       <h1>합격 후기 1</h1>
                       <h2>제목: 첫 면접 합격</h2>
                       <h3>작성자 : 편조이</h3>
                       <h4>작성 날짜 : 2024-05-01</h4>
                   </div>
                   <div className="detail_sub">
                       <h1>회사: 삼성</h1>
                       <Rating name="half-rating" defaultValue={3} precision={2.0} />
                       <p>회사 정보: 회사 정보입니다.</p>
                   </div>
               </div>
           </div>
           <div className="detail_content">
               <p>내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...<br/>
               내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...<br/>
               내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...<br/>
               내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...<br/>
               내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...<br/>
               내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...<br/>
               내용: 첫 면접에서 합격한 기쁨을 나누고 싶습니다...
               </p>
           </div>
           <div>
               <Button className="write_btn1" variant="contained"><Link href={"./review_success"}>목록</Link></Button>
               <Button className="write_btn2" variant="contained"><Link href={"./review_success_write"}>작성 하기</Link></Button>
           </div>
          
   </div>
   </>
    )
}