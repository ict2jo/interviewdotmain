"use client"

import './interview_feedback.css'
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Pagination, Stack } from '@mui/material';
import Header from '@/app/_components/Header';

export default function Interview_feedback() {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

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

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return(
        <>
        <div className='feedback_container'>
        <h1>AI 피드백</h1>
            <div className="question">
                <span>Q. 조직 내 본인과 맞지않는 사람이 있을 때 어떻게 대처하시겠습니까?</span>
                {isExpanded ? (
                    <KeyboardArrowUpIcon onClick={handleToggle} style={{ cursor: 'pointer' }} />
                ) : (
                    <KeyboardArrowDownIcon onClick={handleToggle} style={{ cursor: 'pointer' }} />
                )}
            </div>


            <div className={`additional_content ${isExpanded ? 'expanded' : ''}`} ref={contentRef}>
                <div className="video">
                    <p>영상화면</p>
                </div>

                <div className="content">
                    <div className='answer'>
                        <h1>답변</h1>
                        <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                    </div>

                    <div className='feedback'>
                        <h1>피드백</h1>
                        <div className='feedback2'>
                            <h1>질문의도</h1>
                            <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                            <br />
                            <h1>답변예시</h1>
                            <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                            <br />
                            <h1>표정/자세</h1>
                            <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}