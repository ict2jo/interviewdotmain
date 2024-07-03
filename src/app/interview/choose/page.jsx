"use client";
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import "./choose.css";
import questionStore from '@/stores/questionStore';

const Choose = () => {
    const router = useRouter();

    const handleClick = async (category) => {
        const randMode = localStorage.getItem('rand');

        if (randMode === '실전형') {
            try {
                const response = await fetch(`http://localhost:8080/interview/randchoose?category=${category}`);
                const data = await response.json();

                if (!Array.isArray(data) || data.length === 0) {
                    console.error('받아온 데이터가 올바르지 않습니다.');
                    return;
                }

                const selectedQuestions = data.map(question => ({
                    q_idx: question.q_idx,
                    question: question.question
                }));

                questionStore.setQuestions(selectedQuestions);

                const q_idx = selectedQuestions.length > 0 ? selectedQuestions[0].q_idx : ''; // 첫 번째 질문의 q_idx 사용

                const selectedQuestionsString = encodeURIComponent(JSON.stringify(selectedQuestions));

                router.push(`/interview/start?q_idx=${q_idx}&selectedQuestions=${selectedQuestionsString}`);

            } catch (error) {
                console.error('질문을 가져오지 못했습니다.:', error);
            }
        } else {
            router.push(`question?category=${category}`);
        }
    };

    const handlebefore = () => {
        localStorage.removeItem("rand");
        router.push('/interview/select')
    }


    return (
        <div className="choose_container">
            <div className="choose_button_container">
                <h1>직업군을 선택해주세요.</h1>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('MM')}>경영사무</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('SM')}>영업마케팅</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('PS')}>공공서비스</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('RND')}>연구개발</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('ARD')}>디자인</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('ICT')}>정보통신</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('BM')}>생산관리</Button>
                <Button onClick={handlebefore} variant="contained" className="choose_before_button">이전으로</Button>
            </div>
        </div>
    );
};

export default Choose;
