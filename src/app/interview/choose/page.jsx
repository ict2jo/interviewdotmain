"use client";
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './choose.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import questionStore from '@/stores/questionStore';
import { useRouter } from "next/navigation";

const Choose = observer(() => {
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8080/interview/choose')
            .then(response => response.json())
            .then(data => questionStore.setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleClick = (question) => {
        questionStore.toggleQuestion(question);
    };

    const go_next_page = () => {
        if (confirm(`선택하신 문항은 총 ${questionStore.selectedCount}개 입니다. \n맞으면 확인 틀리면 취소를 눌러주세요.`)) {
            if (questionStore.selectedCount > 0) {
                router.push(`/interview/start`);  // start 페이지로 이동
            } else {
                alert("선택하신 문항이 없습니다. 최소 1개 이상 선택해 주세요.");
            }
        } else {
            return;
        }
    };

    return (
        <div className="container">
            <div className="white_box">
                <h1 className="title">질문 리스트</h1>
                <span>최대 10개의 질문을 선택 하실 수 있습니다.</span>
                <div className="count">{questionStore.selectedCount} / 10</div>
                <div className="scroll_box">
                    <div className="questions">
                        {questionStore.questions.map((question) => (
                            <div
                                key={question.id}
                                className={`question_box ${questionStore.selectedQuestions.includes(question) ? 'selected' : ''}`}
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
});

export default Choose;
