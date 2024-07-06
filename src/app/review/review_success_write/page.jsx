"use client"

import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 import
import "./review_success_write.css"; // 추가적인 컴포넌트 CSS 파일
import {
    Button,
    Container,
    Snackbar
} from '@mui/material';
import axios from 'axios';
import userStore from '@/stores/UserStore';
import menuStore from '@/stores/MenuStore';
import dynamic from 'next/dynamic'; // Next.js에서 동적으로 컴포넌트를 불러오기 위해 필요

// Quill 에디터를 동적으로 import하여 서버 사이드 렌더링 문제를 피합니다
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Review_Success_Write() {
    const [s_title, setTitle] = useState('');
    const [s_company, setCompany] = useState('');
    const [s_content, setContent] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const name = userStore.name;

     /* useEffect(() => {

     }, [name]); */

    const typingTimeoutRef = useRef(null); // 타이핑 디바운스를 위한 타이머 참조
    
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
            menuStore.setSelectedMenu("review/successList");
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

    /* // Quill 에디터의 내용이 변경될 때 호출되는 콜백 함수
    const handleContentChange = (value) => {
        const plainText = stripHtml(value);
        setContent(plainText);
    }; */

    // Quill Editor의 변경 이벤트를 처리하는 핸들러 (Debounce 적용)
    const handleContentChange = (content, delta, source, editor) => {
        // 이전에 설정된 타이머가 있으면 클리어
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // 새로운 타이머 설정
        typingTimeoutRef.current = setTimeout(() => {
            const deltaOps = editor.getContents().ops; // Quill Editor의 Delta 객체를 가져옵니다.
            const plainText = deltaOps.reduce((text, op) => {
                if (typeof op.insert === 'string') {
                    text += op.insert.trim(); // 텍스트만 추출하고 앞뒤 공백 제거
                }
                return text;
            }, '');
            setContent(plainText);
        }, 1000); // 500ms 타이머 설정 (원하는 시간으로 변경 가능)
    };

    

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


     useEffect(() => {
        console.log('입력 : ', s_content);
    }, [s_content]) 

    return (
        <>
            <Container>
                <div className="write_container">
                    <h1>합격 후기 작성</h1>
                    <div className="write_list">
                        <div className="write_area">
                            <div className="write_box" >
                                <h2>면접 후기</h2>
                                작성자 : <input type="text" value={name} disabled /><br />
                                제목   : <input type="text" value={s_title} onChange={(e) => setTitle(e.target.value)} /><br />
                                회사명 : <input type="text" value={s_company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                           
                        </div>
                    </div>
                    <div className="write_content" style={{ height: '500px' }}>
                    <ReactQuill 
                            value={s_content}
                            onChange={handleContentChange}
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ size: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['clean']
                                ],
                            }}
                            formats={[
                                'header', 'font', 'size',
                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                'list', 'bullet', 'indent',
                                'link', 'image', 'video'
                            ]}
                            placeholder="내용을 입력해주세요..."
                            style={{
                                width: '100%',
                                height: '90%',
                                padding: '10px',
                                fontSize: '16px',
                                fontFamily: 'Nanum Gothic, sans-serif'
                            }}
                            theme="snow"
                        />
                    </div>
                    <div>
                        <Button className="write_btn1" variant="contained" sx={{marginBottom:'80px'}} onClick={() => window.history.back()}>목록</Button>
                        <Button className="write_btn1" variant="contained" sx={{marginBottom:'80px'}} onClick={handleSubmitReview}>작성 완료</Button>
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