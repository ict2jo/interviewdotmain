"use client"

import dynamic from 'next/dynamic'; // Next.js에서 동적으로 컴포넌트를 불러오기 위해 필요
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 import
import "./review_success_write.css"; // 추가적인 컴포넌트 CSS 파일
import {
    Button,
    Container,
    Snackbar
} from '@mui/material';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import userStore from '@/stores/UserStore';

// Quill 에디터를 동적으로 import하여 서버 사이드 렌더링 문제를 피합니다
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Review_Success_Write() {
    const [s_title, setTitle] = useState('');
    const [s_company, setCompany] = useState('');
    const [s_content, setContent] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const router = useRouter();

    const name = userStore.name;

    /*  useEffect(() => {
     }, []); */

    const handleSubmitReview = async () => {
        try {
            console.log("id" + userStore.id);
            const response = await axios.post("http://localhost:8080/success/successwrite", {
                u_idx: userStore.u_idx,
                s_id: userStore.id,
                s_title: s_title,
                s_company: s_company,
                s_content: s_content
            });
            console.log("리뷰 작성 완료: ", response.data);
            setTitle(response.data);
            setContent(response.data);
            setCompany(response.data);

            // 작성 완료 후 스낵바 열기
            setSnackbarMessage('리뷰가 성공적으로 작성되었습니다.');
            setSnackbarOpen(true);

            // 작성 완료 후 홈페이지로 이동
            router.push("/review/successList");
        } catch (error) {
            console.error("리뷰 작성 중 에러 발생 : ", error);
            // 실패 시 스낵바 열기
            setSnackbarMessage('리뷰 작성 중 오류가 발생했습니다.');
            setSnackbarOpen(true);
            setTitle([]);
            setContent([]);
            setCompany([]);
        }
    };

    // Quill 에디터의 내용이 변경될 때 호출되는 콜백 함수
    const handleContentChange = (value) => {
        // 정규 표현식을 사용하여 <p>와 </p> 태그를 제거
        const sanitizedValue = value.replace(/<\/?p>/gi, "");
        setContent(sanitizedValue);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        console.log('dddd', s_content);
    }, [s_content])

    return (
        <>
            <Container>
                <div className="write_container">
                    <h1>합격 후기 작성</h1>
                    <div className="write_list">
                        <div className="write_area">
                            <div className="write_box">
                                <h2>면접 후기</h2>
                                작성자 : <input type="text" value={name} disabled /><br />
                                제목   : <input type="text" value={s_title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="write_sub">
                                회사명 : <input type="text" value={s_company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="write_content" style={{ height: '500px' }}>
                        <ReactQuill
                            value={s_content}
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