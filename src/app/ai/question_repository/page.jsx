"use client";

import './question_repository.css'
import * as React from "react";
import Stack from '@mui/material/Stack';
import {Button, Checkbox} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from "@/app/_components/Header";

export default function QuestionRepository() {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (isExpanded) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else {
            contentRef.current.style.maxHeight = '0';
        }
    }, [isExpanded]);

    return (
        <>
        <Header/>
    <div className="container">
        <div className="white_box">
            <div className="title">
                <h1>질문 저장소</h1>
            </div>
            <div className="question">
                <Checkbox size="large" sx={{padding:0}}/>
                <span>질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문???</span>
                {isExpanded ? (
                    <KeyboardArrowUpIcon onClick={handleToggle} style={{cursor: 'pointer'}}/>
                ) : (
                    <KeyboardArrowDownIcon onClick={handleToggle} style={{cursor: 'pointer'}}/>
                )}
            </div>
            <div className={`additional_content ${isExpanded ? 'expanded' : ''}`} ref={contentRef}>
                <span>답변  </span>
                <div className="answer">
                    <span>답변답변답변답변이에옹~</span>
                </div>
                <span>피드백  </span>
                <div className="ai_feedback">
                    <span>AI가해주는 피드백 이에옹에옹이에옹</span>
                </div>
            </div>
            <Button variant="outlined" className="select_all">전체선택</Button>
            <Button variant="contained" className="remove_button">선택삭제</Button>
            <Stack spacing={2} className="paging_number">
                <Pagination count={10} size="large"/>
            </Stack>
            <div>
            </div>
        </div>
    </div>
</>
)
    ;
}
