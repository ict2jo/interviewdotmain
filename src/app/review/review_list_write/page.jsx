"use client"

import Header from "@/app/_components/Header"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 import
import "./review_list_write.css"
import {
    Button,
    Container,
    Rating,
    Snackbar
    
    
} from "@mui/material";
import { useRouter } from "next/navigation"
import axios from "axios";

const ReactQuill = dynamic(() => import('react-quill'), {ssr:false});
export default function Review_List_Write() {
    const [r_title, setTitle] = useState('');
    const [r_company, setCompany] = useState('');
    const [r_rating, setRating] = useState(0); // 난이도를 설정할 state
    const [r_content, setContent] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const router = useRouter();

    // URL 파라미터에서 작성자 정보 가져오기
    const urlParams = new URLSearchParams(window.location.search); 
    const r_id = urlParams.get('r_id'); // URL 파라미터에서 작성자 정보 가져오기 
    // 리뷰 작성 API 호출 함수
    const handleSubmitReview = async () => {
        try {
            const response = await axios.post("http://localhost:8080/review/reviewwrite", {
                r_id: r_id, // URL 파라미터로 받은 작성자 정보 사용
                r_title: r_title,
                r_company: r_company,
                r_content: r_content
            });
            console.log("리뷰 작성 완료:", response.data);

            // 작성 완료 후 스낵바 열기
            setSnackbarMessage('리뷰가 성공적으로 작성되었습니다.');
            setSnackbarOpen(true);

            // 작성 완료 후 홈페이지로 이동
            router.push("/review/reviewList");
        } catch (error) {
            console.error("리뷰 작성 중 에러 발생:", error);
            // 실패 시 스낵바 열기
            setSnackbarMessage('리뷰 작성 중 오류가 발생했습니다.');
            setSnackbarOpen(true);
        }
    };

    const handleContentChange = (value) => {
        value = value.replace(/<p>/gi, "").replace(/<\/p>/gi, ""); 
        setContent(value);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        console.log('dddd', r_content);
    },[r_content])

    return (
        <>
            <Header />
            <Container>
                <div className="list_container">
                    <h1>면접 후기 작성</h1>
                    <div className="review_list">
                        <div className="review_area">
                            <div className="review_box">
                                <h2>면접 후기</h2>
                                작성자 : <input type="text" value={r_id} disabled /><br/>
                                제목   : <input type="text" value={r_title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="review_sub">
                                회사명 : <input type="text" value={r_company} onChange={(e) => setCompany(e.target.value)} />
                                난이도 : <Rating name="half-rating" value={r_rating} onChange={(event, newValue) => setDifficulty(newValue)} precision={0.5} />
                            </div>
                        </div>
                    </div>
                    <div className="review_content" style={{height: '500px'}}>
                        <ReactQuill
                            value={r_content}
                            onChange={handleContentChange}
                            placeholder="내용을 입력해주세요..."
                            style={{ width: '100%', height: '90%', padding: '10px', fontSize: '16px' }}
                        />
                    </div>
                    <div>
                        <Button className="write_btn1" variant="contained" onClick={() => window.history.back()}>목록</Button>      
                        <Button className="write_btn1" variant="contained" onClick={handleSubmitReview}>작성 완료</Button>
                    </div>
                </div>
            </Container>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
}