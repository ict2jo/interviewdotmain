"use client";
import React, {useEffect, useState} from 'react';
import './choose.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Header from "@/app/_components/Header";

export default function Interview() {
    // useState 선언
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);

    // 질문박스 클릭 시 실행되는 함수
    const handleClick = (question) => {
        // 이미 선택된 항목이면 해제
        if (selectedQuestions.includes(question)) {
            const newSelectedQuestions = selectedQuestions.filter((selectedQuestion) => selectedQuestion !== question);
            setSelectedQuestions(newSelectedQuestions);
        } else {
            // 선택된 항목의 개수가 10개를 넘어가면 알림
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
        confirm(`선택하신 문항은 총 ${selectedCount}개 입니다. \n맞으면 확인 틀리면 취소를 눌러주세요.`);
    }

    return (
        <div className="Header">
        <Header/>
        <div className="container">
            <div className="white_box">
                <h1 className="title">질문 리스트</h1>
                <div className="count">{selectedCount} / 10</div>
                <div className="scroll_box">
                    <div className="questions">
                        {/* length는 추후 질문리스트 받아오면 바꿔야함*/}
                        {Array.from({length: 50}, (_, question) => (
                            <div
                                key={question}
                                className={`question_box ${selectedQuestions.includes(question) ? 'selected' : ''}`}
                                onClick={() => handleClick(question)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <ArrowRightIcon onClick={go_next_page} className="go_next_page"/>
        </div>
</div>
    );
}
