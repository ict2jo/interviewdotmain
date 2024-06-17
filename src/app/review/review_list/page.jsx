// Review_List.js

"use client"

import { Pagination } from "@mui/material";
import "./review_list.css";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/Header";

export default function Review_List() {
    const router = useRouter();


    const handlereivew = () => {
        router.push("./review_list_detail")
    };
    const handlereivewa = () => {
        router.push("./review_list_detail")
    };
    const handlereivewb = () => {
        router.push("./review_list_detail")
    };
    const handlereivewc = () => {
        router.push("./review_list_detail")
    };

    return (
        <>
        <Header/>
        <div className="review_container">
            <h1>면접 후기</h1>
            <div className="review_list">
                <div className="review_box_1" onClick={handlereivew}>
                        <h1>면접 후기</h1>
                        <h2>SANSUNG</h2>
                        <h3>제목입니다아다아다앙</h3>
                        <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                    <div className="review_box_1sub" >
                    </div>
                </div>
                <div className="review_box_2" onClick={handlereivewa}>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                    <div className="review_box_2sub " >
                    </div>
                </div>
                <div className="review_box_3" onClick={handlereivewb}>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                    <div className="review_box_3sub " >
                    </div>
                </div>
                <div className="review_box_4" onClick={handlereivewc}>
                    <h1>면접 후기</h1>
                    <h2>SANSUNG</h2>
                    <h3>제목입니다아다아다앙</h3>
                    <h2>내용~~~~~~~~~~내용~~~~~~~~~~내용</h2>
                    <div className="review_box_4sub " >
                    </div>
                </div>
            </div>
                <div>
                    <Pagination className="paging" count={10} variant="outlined" shape="rounded" />
                </div>
                
        </div>
        </>
    )
}
