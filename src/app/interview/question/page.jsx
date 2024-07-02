"use client";
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './question.css';
import questionStore from '@/stores/questionStore';
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/system';
import { TextField, Button } from "@mui/material";

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '50%',
    },
}));

const Question = observer(() => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const q_idx = searchParams.get('q_idx');

    const { currentPage, itemsPerPage, questions } = questionStore;

    useEffect(() => {
        fetchQuestions();
    }, [category, q_idx]);

    const fetchQuestions = () => {
        fetch(`http://localhost:8080/interview/choose?category=${category}&q_idx=${q_idx}`)
            .then(response => response.json())
            .then(data => questionStore.setQuestions(data))
            .catch(error => console.error('질문을 가져오지 못했습니다.:', error));
    };

    const handleClick = (question) => {
        questionStore.toggleQuestion(question);
    };

    const go_next_page = () => {
        if (confirm(`선택하신 문항은 총 ${questionStore.selectedCount}개 입니다. \n맞으면 확인 틀리면 취소를 눌러주세요.`)) {
            if (questionStore.selectedQuestions.length === 3) {
                router.push(`/interview/start?category=${category}&q_idx=${q_idx}`);
            } else {
                alert("질문을 정확히 3개 선택해 주세요.");
            }
        }
    };

    const go_before_page = () => {
        questionStore.reset();
        router.push(`/interview/choose`);
    };

    const handlePageChange = (event, page) => {
        questionStore.setPage(page);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        fetch(`http://localhost:8080/interview/search?search=${search}&category=${category}`)
            .then(response => response.json())
            .then(data => questionStore.setQuestions(data))
            .catch(error => console.error('질문을 가져오지 못했습니다.:', error));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            console.log("엔터");
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, questions.length);
    const paginatedQuestions = questions.slice(startIndex, endIndex);

    return (
        <div className="q_container">
            <div className="q_white_box">
                <div className="q_title">
                    <h1>질문 리스트</h1>
                    <span>최대 3개의 질문을 선택 하실 수 있습니다.</span>
                </div>
                <div className="count">{questionStore.selectedCount} / 3 </div>
                <Button onClick={go_before_page} variant="outlined" className="question_before_button">이전</Button>
                <Button onClick={go_next_page} variant="contained" className="question_next_button">다음</Button>
                <div className="questions">
                    {paginatedQuestions.map((question, index) => (
                        <div
                            key={question.id}
                            className={`question_box ${questionStore.selectedQuestions.includes(question) ? 'selected' : ''}`}
                            onClick={() => handleClick(question)}
                        >
                            {question.question}
                        </div>
                    ))}
                </div>
                <div className="question_button_container">
                </div>
                <TextField
                    className="Search_TextField"
                    id="outlined-basic"
                    label="질문을 검색해보세요"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <div className="pagination_container">
                    <Pagination
                        count={Math.ceil(questions.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        siblingCount={4}
                        boundaryCount={0}
                        renderItem={(item) => <StyledPaginationItem {...item} />}
                    />
                </div>
            </div>
        </div>
    );
});

export default Question;
