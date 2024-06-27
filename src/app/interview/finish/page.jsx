"use client"

import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './finish.css';
import {Button} from "@mui/material";



const Finish = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const storedResults = JSON.parse(localStorage.getItem('interviewResults')) || [];
                setResults(storedResults);
                setLoading(false);
            } catch (error) {
                console.error('결과를 못받아왔어용');
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return (
            <div className="finish_container">
                <CircularProgress />
            </div>
        );
    }

    const handleQuit = () => {
        try {
            localStorage.removeItem('interviewResults');
            console.log("삭제완료")
            window.close();
        } catch (error){
            console.log(error)
        }
    }
    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/interview/finish', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(results)
            });

            if (response.ok) {
                console.log("DB에 저장 완료.")
            } else {
                console.error('에러발생;;;;;')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="finish_container">
            <h1>면접 결과 안내</h1>
            <ul>
                {results.map((result, index_result) => (
                    <li key={index_result}>
                        <p>질문 :  {result.question}</p>
                        <p>텍스트: {result.text}</p>
                        <p>포즈 결과: {result.pose_results}</p>
                        <p>감정 분석: {result.sentiment}</p>
                    </li>
                ))}
            </ul>
            <div>
                <Button onClick={handleQuit} variant="outlined" className="quit_button">나가기</Button>
                <Button onClick={handleSave} variant="contained" className="save_button">저장하기</Button>
            </div>
        </div>
    );
};

export default Finish;
