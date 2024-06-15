"use client"

import './interview_guide.css'
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Pagination, Stack } from '@mui/material';
import Header from '@/app/_components/Header';

export default function Interview_guide() {
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

    return (
        <>
        <div className='guide_container'>
            <h1>면접 준비하기</h1>

            <ul className="nav">
                {['빈출질문', '직무질문', '역량질문', '성공사례'].map((item, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => handleClick(index)}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

        <div className='question_box'>
            <div className="question">
                <span>Q. 조직 내 본인과 맞지않는 사람이 있을 때 어떻게 대처하시겠습니까?</span>
                {isExpanded ? (
                    <KeyboardArrowUpIcon onClick={handleToggle} style={{ cursor: 'pointer' }} />
                ) : (
                    <KeyboardArrowDownIcon onClick={handleToggle} style={{ cursor: 'pointer' }} />
                )}
            </div>
            
            <div className="question_button">
                <button>+</button>
            </div>
        </div>

            <div className={`additional_content ${isExpanded ? 'expanded' : ''}`} ref={contentRef}>
                <span>AI 추천 답변</span>
                <div className="answer">
                    <span>나이스나이스나이스나이스나이스용~</span>
                </div>
            </div>

            <Stack spacing={2} className="paging_number">
                    <Pagination count={10} size="large" />
            </Stack>
            
        </div>
        </>
    );
}
