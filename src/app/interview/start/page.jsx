"use client"
import React, { useState, useEffect, useRef } from 'react';
import './start.css';
import { useRouter } from 'next/navigation';
import questionStore from '@/stores/questionStore';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import Webcam from 'react-webcam';

const Start = () => {
    const router = useRouter();
    const [parsedQuestions, setParsedQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(60);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [resultsReceived, setResultsReceived] = useState(false);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    useEffect(() => {
        const questions = questionStore.selectedQuestions;
        setParsedQuestions(questions);
    }, []);

    useEffect(() => {
        if (parsedQuestions.length > 0) {
            const query = new URLSearchParams({
                q_idx: parsedQuestions[currentQuestionIndex]?.q_idx,
                selectedQuestions: JSON.stringify(parsedQuestions),
            }).toString();
            router.replace(`/interview/start?${query}`);
            console.log('parsedQuestions:', parsedQuestions);
            console.log('queryquery', query);
        }
    }, [parsedQuestions, currentQuestionIndex, router]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const q_idx = urlParams.get('q_idx');
        const selectedQuestionsString = urlParams.get('selectedQuestions');

        if (q_idx && selectedQuestionsString) {
            const selectedQuestions = JSON.parse(decodeURIComponent(selectedQuestionsString));
            setParsedQuestions(selectedQuestions);

            const currentIndex = selectedQuestions.findIndex(question => question.q_idx === q_idx);
            if (currentIndex !== -1) {
                setCurrentQuestionIndex(currentIndex);
            }
        } else {
            console.error('질문 데이터를 가져오지 못했습니다.');
        }
    }, []);

    const startRecording = async () => {
        const stream = webcamRef.current.video.srcObject;
        if (stream) {
            const recorder = new MediaRecorder(stream);
            let chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                setRecordedChunks((prev) => [...prev, { question: parsedQuestions[currentQuestionIndex], blob }]);
                setIsRecording(false);

                // 비디오 업로드, 결과 기다리지 않음
                uploadVideo(blob, parsedQuestions[currentQuestionIndex]);

                if (currentQuestionIndex >= parsedQuestions.length - 1) {
                    setLoading(true); // 마지막 질문 후 로딩 표시
                    await waitForAllResults();
                } else {
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setTime(60);
                    setIsStartButtonVisible(true); // 다음 질문으로 넘어갈 때 시작 버튼 다시 보이게 설정
                }
            };

            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } else {
            console.error('Stream is not available.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const handleRecordButtonClick = async () => {
        setIsStartButtonVisible(false); // 시작 버튼 숨기기
        setIsNextButtonDisabled(false); // 녹화 시작 시 다음 질문 버튼 활성화
        await startRecording();
    };

    const handleNextQuestionClick = () => {
        stopRecording();
    };

    const uploadVideo = async (blob, questionData) => {
        try {
            const formData = new FormData();
            formData.append('file', blob, `recorded-video-${Date.now()}.webm`);
            formData.append('q_idx', questionData.q_idx);
            formData.append('question', questionData.question);

            const response = await fetch('http://192.168.0.22:8010/video/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('비디오 업로드 실패');
            }

            const result = await response.json();
            console.log('서버로부터 받은 결과:', result);

            const storedResults = JSON.parse(localStorage.getItem('interviewResults')) || [];
            storedResults.push(result);
            localStorage.setItem('interviewResults', JSON.stringify(storedResults));

        } catch (error) {
            console.log(error);
        }
    };

    const waitForAllResults = async () => {
        const checkResults = async () => {
            const storedResults = JSON.parse(localStorage.getItem('interviewResults')) || [];
            return storedResults.length >= 3;
        };

        const intervalId = setInterval(async () => {
            const allResultsReceived = await checkResults();
            if (allResultsReceived) {
                clearInterval(intervalId);
                setResultsReceived(true);
                setLoading(false);
                router.push('/interview/finish');
            }
        }, 1000); // 1초마다 체크
    };

    useEffect(() => {
        let timer;
        if (time > 0 && isRecording) {
            timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0 && isRecording) {
            clearTimeout(timer);
            stopRecording();
        }
        return () => clearTimeout(timer);
    }, [time, isRecording]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="start_container">
            <div className="start_white_box">
                {loading ? (
                    <div className="loading_spinner">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
                        <div className="question">
                            <p>
                                {parsedQuestions.length > 0
                                    ? `${parsedQuestions[currentQuestionIndex]?.question || '질문을 받아오지 못했습니다.'}`
                                    : '질문을 받아오지 못했습니다.'}
                            </p>
                        </div>
                        <div className="my_camera">
                            <Webcam width={'900vh'} audio={true} ref={webcamRef} screenshotFormat="image/jpeg" />
                        </div>
                        {isStartButtonVisible && (
                            <Button onClick={handleRecordButtonClick} variant="outlined" className="record_button">
                                시작
                            </Button>
                        )}
                        <Button onClick={handleNextQuestionClick} variant="outlined" className="next_button" disabled={isStartButtonVisible}>
                            다음질문
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Start;
