"use client";
import React, { useEffect, useState } from 'react';
import './choose.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Header from "@/app/_components/Header";

export default function Interview() {
    // useState 선언
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);

    // 질문박스 클릭 시 실행되는 함수
    const handleClick = (question) => {
        if (selectedQuestions.includes(question)) {
            const newSelectedQuestions = selectedQuestions.filter((selectedQuestion) => selectedQuestion !== question);
            setSelectedQuestions(newSelectedQuestions);
        } else {
            if (selectedQuestions.length >= 10) {
                alert("10개 이상 선택할 수 없습니다.");
                return;
            }

            const newSelectedQuestions = [...selectedQuestions, question];
            setSelectedQuestions(newSelectedQuestions);
        }
    };

    useEffect(() => {
        setSelectedCount(selectedQuestions.length);
    }, [selectedQuestions]);

    const go_next_page = () => {
        if (confirm(`선택하신 문항은 총 ${selectedCount}개 입니다. \n맞으면 확인 틀리면 취소를 눌러주세요.`)) {
            if (selectedCount > 0) {
                location.href = "start";
            } else {
                alert("선택하신 문항이 없습니다. 최소 1개 이상 선택해 주세요.");
            }
        } else {
            return;
        }
    };

    // 질문 리스트를 서버에서 받아오는 useEffect
    useEffect(() => {
        fetch('http://localhost:8080/interview/choose')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    return (
        <div className="container">
            <div className="white_box">
                <h1 className="title">질문 리스트</h1>
                <span>최대 10개의 질문을 선택 하실 수 있습니다.</span>
                <div className="count">{selectedCount} / 10</div>
                <div className="scroll_box">
                    <div className="questions">
                        {questions.map((question) => (
                            <div
                                key={question.id}  // 고유한 key prop 추가
                                className={`question_box ${selectedQuestions.includes(question) ? 'selected' : ''}`}
                                onClick={() => handleClick(question)}
                            >
                                {question.question}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ArrowRightIcon onClick={go_next_page} className="go_next_page"/>
        </div>
    );
}
