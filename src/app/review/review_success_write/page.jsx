"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic'; // Next.js에서 동적으로 컴포넌트를 불러오기 위해 필요

import Header from "../../_components/Header";
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 import
import "./review_success_write.css"; // 추가적인 컴포넌트 CSS 파일
import { Button, Rating } from '@mui/material';
import Link from 'next/link';

// Quill 에디터를 동적으로 import하여 서버 사이드 렌더링 문제를 피합니다
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Review_Success_Write() {
    const [content, setContent] = useState('');

    // Quill 에디터의 내용이 변경될 때 호출되는 콜백 함수
    const handleContentChange = (value) => {
        setContent(value);
    };

    return (
        <>
            <Header />
            <div className="write_container">
                <h1>합격자 후기 작성</h1>
                <div className="write_list">
                    <div className="write_area">
                        <div className="write_box">
                            <h2>합격자 후기</h2>
                            작성자 : 편조이<br/>
                            제목   : <input type="text" />
                        </div>
                        <div className="write_sub">
                            회사 명 : <input type="text" />
                            난이도 <Rating name="half-rating" defaultValue={3} precision={2.0} />
                        </div>
                    </div>
                </div>
                <div className="write_content" style={{ height: '400px' }}>
                    <ReactQuill
                        value={content}
                        onChange={handleContentChange}
                        placeholder="내용을 입력해주세요..."
                        theme="snow" // snow 테마 사용 (기본값)
                    />
                </div>
                <div>
               <Button className="write_btn2" variant="contained"><Link href={"./review_success"}>작성 완료</Link></Button>
                </div>
            </div>
        </>
    );
}