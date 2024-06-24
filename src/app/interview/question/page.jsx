"use client"
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './question.css';
import questionStore from '@/stores/questionStore';
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/system';

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '50%',
    },
}));

const Question = observer(() => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const { currentPage, itemsPerPage, questions } = questionStore;

    useEffect(() => {
        fetch(`http://localhost:8080/interview/choose?category=${category}`)
            .then(response => response.json())
            .then(data => questionStore.setQuestions(data))
            .catch(error => console.error('질문을 가져오지 못했습니다.:', error));
    }, [category]);

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

    const handlePageChange = (event, page) => {
        questionStore.setPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, questions.length);
    const paginatedQuestions = questions.slice(startIndex, endIndex);

    return (
        <div className="container">
            <div className="white_box">
                <div className="title">
                    <h1>질문 리스트</h1>
                    <span>최대 10개의 질문을 선택 하실 수 있습니다.</span>
                </div>
                <div className="count">{questionStore.selectedCount} / 10</div>
                <div className="questions">
                    {paginatedQuestions.map((question, index) => (
                        <div
                            key={question.id}
                            className={`question_box ${questionStore.selectedQuestions.includes(question) ? 'selected' : ''}`}
                            onClick={() => handleClick(question)}
                        >
                            <span className="question_number">{startIndex + index + 1}</span>
                            {question.question}
                        </div>
                    ))}
                </div>
                <div className="pagination_container">
                    <Pagination
                        count={Math.ceil(questions.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        siblingCount={4}
                        boundaryCount={0} // 처음과 마지막 페이지로 바로 가는 버튼 표시 안함
                        renderItem={(item) => <StyledPaginationItem {...item} />}
                    />
                </div>
            </div>
        </div>
    );
});

export default Question;
