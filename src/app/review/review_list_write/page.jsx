"use client"

import Header from "@/app/_components/Header"
import { Button, Rating } from "@mui/material"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 import
import "./review_list_write.css"

const ReactQuill = dynamic(() => import('react-quill'), {ssr:false});
export default function Review_List_Write() {
    const[content, setContent] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
    };
    return(
        <>
            <div className="list_container">
                <h1>면접 후기 작성</h1>
                <div className="review_list">
                    <div className="review_area">
                        <div className="review_box">
                            <h2>면접 후기</h2>
                            작성자 : 편조이<br/>
                            제목   : <input type="text" />
                        </div>
                        <div className="review_sub">
                            회사명 : <input type="text" />
                            난이도 : <Rating name="half-rating" defaultValue={3} precision={2.0} />
                        </div>
                    </div>
                </div>
                <div className="review_content" style={{height: '400px'}}>
                    <ReactQuill
                        value={content}
                        onChange={handleContentChange}
                        placeholder="내용을 입력해주세요..."
                        theme="snow" // snow 테마 사용 (기본값)
                    />
                </div>
                <div>
                <Button className="write_btn1" variant="contained"><Link href={"./review_list"}>목록</Link></Button>      
                <Button className="write_btn1" variant="contained"><Link href={"./review_success"}>작성 완료</Link></Button>
                </div>
            </div>
        </>
    );
}