"use client"

import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Finish = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // 로컬 스토리지에서 결과 가져오기
                const storedResults = JSON.parse(localStorage.getItem('interviewResults')) || [];
                setResults(storedResults);
                setLoading(false); // 결과가 로드되었음을 설정
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return (
            <div className="finish_container">
                <CircularProgress /> {/* 로딩 표시 */}
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="finish_container">
            <h1>인터뷰 결과</h1>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <p>질문 {index + 1}</p>
                        <p>텍스트: {result.text}</p>
                        <p>포즈 결과: {result.pose_results}</p>
                        <p>감정 분석: {result.sentiment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Finish;
