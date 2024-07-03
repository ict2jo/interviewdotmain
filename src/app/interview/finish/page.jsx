"use client"

import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './finish.css';
import { Button } from "@mui/material";
import userStore from "@/stores/UserStore";

const Finish = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchAssistantResponses = async () => {
            setLoading(true);

            try {
                const storedResults = JSON.parse(localStorage.getItem('interviewResults')) || [];
                setResults(storedResults);

                // 모든 면접 결과에 대해 API 호출 및 응답 받기
                const allResponses = await Promise.all(storedResults.map(async (result, index) => {
                    const { question, text } = result;

                    // 질문 의도 분석
                    const intentionResponse = await fetch('/api/generate2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ question, type: 'Intention' }),
                    });

                    const intentionData = await intentionResponse.json();
                    if (!intentionResponse.ok) {
                        throw new Error(intentionData.error || `Request failed with status ${intentionResponse.status}`);
                    }

                    // 답변 피드백
                    const feedbackResponse = await fetch('/api/generate2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text, question, type: 'feedback' }),
                    });

                    const feedbackData = await feedbackResponse.json();
                    if (!feedbackResponse.ok) {
                        throw new Error(feedbackData.error || `Request failed with status ${feedbackResponse.status}`);
                    }

                    // 맞춤법 교정
                    const campusResponse = await fetch('/api/generate2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text, type: 'campus' }),
                    });

                    const campuskData = await campusResponse.json();
                    if (!campusResponse.ok) {
                        throw new Error(campuskData.error || `Request failed with status ${campusResponse.status}`);
                    }

                    return { index, intention: intentionData.answer, feedback: feedbackData.answer, campus: campuskData.answer };
                }));

                // API 응답을 상태로 설정
                const newResponses = {};
                allResponses.forEach(response => {
                    newResponses[response.index] = {
                        intention: response.intention,
                        feedback: response.feedback,
                        campus: response.campus,
                    };
                });

                setResponses(newResponses);
            } catch (error) {
                console.error('Error:', error);
                alert(error.message);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchAssistantResponses();

    }, []);


    const handleQuit = () => {
        try {
            if(confirm("정말로 나가시겠습니까? \n 저장이 필요한 경우 저장 후 나가시길 바랍니다.")) {
                localStorage.removeItem('interviewResults');
                console.log("삭제완료");
                window.close();
            }
        } catch (error) {
            console.log(error);
        }
    };



    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (saved) return;

            const requestBody = {
                id: userStore.id,
                results: results.map((result,index) => ({
                    question: result.question,
                    text: result.text,
                    q_idx: result.q_idx,
                    pose_results: result.pose_results.toString(),
                    sentiment: result.sentiment.toString(),
                    video_uuid:result.uuid_filename,
                    intention: responses[index] ? responses[index].intention : '',
                    feedback: responses[index] ? responses[index].feedback : '',
                    campus: responses[index] ? responses[index].campus : ''
                }))
            };

            const response = await fetch('http://localhost:8080/interview/finish', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                console.log("DB에 저장 완료.");
                alert("면접 기록이 저장되었습니다.")
            } else {
                console.error('에러발생;;;;;');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="finish_container">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="finish_container">
            <ul className="results_list">
                <h1 style={{ textAlign: "center" }}>면접 결과</h1>
                {results.map((result, index_result) => (
                    <li key={index_result} className="result_item">
                        <div className='result_content'>
                            <div className='left_content'>
                                <h3>질문 {index_result + 1}</h3>
                                <span>질문</span> <p>{result.question}</p>
                                <span>나의 답변</span> <p>{result.text}</p>
                                <span>나의 답변 교정</span> <p dangerouslySetInnerHTML={{ __html: responses[index_result] && responses[index_result].campus }} />
                            </div>
                            <div className='right_content'>
                                <h3>AI 분석 레포트</h3>
                                <span>포즈 결과</span> <p>{result.pose_results}</p>
                                <span>감정 분석</span> <p>{result.sentiment}</p>
                                <span>질문 의도 분석</span> <p dangerouslySetInnerHTML={{ __html: responses[index_result] && responses[index_result].intention }} />
                                <span>답변 피드백</span> <p dangerouslySetInnerHTML={{ __html: responses[index_result] && responses[index_result].feedback }} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="buttons_container">
                <Button onClick={handleQuit} variant="outlined" className="quit_button">나가기</Button>
                <Button onClick={handleSave} variant="contained" className="save_button">저장하기</Button>
            </div>
        </div>
    );
};

export default Finish;
