"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 import
import "./review_list_write.css"
import {
    Button,
    Container,
    Snackbar
} from "@mui/material";
import { useRouter } from "next/navigation"
import axios from "axios";
import userStore from "@/stores/UserStore";
import menuStore from "@/stores/MenuStore";
import Clipboard from "quill/modules/clipboard";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Review_List_Write() {
    const [r_title, setTitle] = useState('');
    const [r_company, setCompany] = useState('');
    const [r_content, setContent] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const router = useRouter();

    const name = userStore.name;


    /* useEffect(() => {


    }, [name]); */

    // 리뷰 작성 API 호출 함수
    const handleSubmitReview = async () => {
        try {
            console.log("id" + userStore.id);
            const response = await axios.post("http://localhost:8080/review/reviewwrite", {
                u_idx: userStore.u_idx,
                r_id: userStore.id, // URL 파라미터로 받은 작성자 정보 사용
                r_title: r_title,
                r_company: r_company,
                r_content: r_content,
                
            });
            console.log("리뷰 작성 완료:", response.data);
            setTitle(response.data);
            setContent(response.data);
            setCompany(response.data);

            
            // 작성 완료 후 스낵바 열기
            setSnackbarMessage('리뷰가 성공적으로 작성되었습니다.');
            setSnackbarOpen(true);

            menuStore.setSelectedMenu("review/reviewList");
            /* if (response.status === 200) {
                alert("리뷰작성 성공@@@@");
                const response2 = await axios.get("/review/reviewlist");
                setReviewList(response2.data);
            } */

            // 작성 완료 후 홈페이지로 이동
            //router.push("/review/reviewList");
        } catch (error) {
            console.error("리뷰 작성 중 에러 발생:", error);
            // 실패 시 스낵바 열기
            setSnackbarMessage('리뷰 작성 중 오류가 발생했습니다.');
            setSnackbarOpen(true);
            setTitle('');
            setContent('');
            setCompany('');
        }
    };

    const handleContentChange = (content) => {
        setContent(content);
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        console.log('입력 : ', r_content);
    }, [r_content])

    return (
        <>
            <Container>
                <div className="list_container">
                    <h1>면접 후기 작성</h1>
                    <div className="review_lists">
                        <div className="review_areas">
                            <div className="review_boxs">
                                <h2>면접 후기</h2>
                                작성자 : <input type="text" value={name} disabled /><br />
                                제목   : <input type="text" value={r_title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="review_sub">
                                회사명 : <input type="text" value={r_company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="review_content" style={{ height: '500px' }}>
                        <ReactQuill
                            value={r_content}
                            onChange={handleContentChange}
                            modules={{
                                toolbar: [
                                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                    [{size: []}],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                                     {'indent': '-1'}, {'indent': '+1'}],['clean']
                                    /* ['link', 'image', 'video'], */
                                  ], 
                            }}
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