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
    const [uploadPromises, setUploadPromises] = useState([]);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    useEffect(() => {
        const questions = questionStore.selectedQuestions; // Assuming questionStore has the correct structure
        setParsedQuestions(questions);
    }, []);

    useEffect(() => {
        if (parsedQuestions.length > 0) {
            const query = new URLSearchParams({
                q_idx: parsedQuestions[currentQuestionIndex]?.q_idx, // Include current question index
                selectedQuestions: JSON.stringify(parsedQuestions),
            }).toString();
            router.replace(`/interview/start?${query}`);
            console.log('parsedQuestions:', parsedQuestions);
        }
    }, [parsedQuestions, currentQuestionIndex, router]);

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

                const uploadPromise = uploadVideo(blob, parsedQuestions[currentQuestionIndex]);
                setUploadPromises((prev) => [...prev, uploadPromise]);

                if (currentQuestionIndex >= parsedQuestions.length - 1) {
                    setLoading(true); // 마지막 질문 후 로딩 표시
                    await Promise.all(uploadPromises);
                    router.push('/interview/finish');
                } else {
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setTime(60);
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

        }catch (error){
            console.log(error);
        }
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
                                    ? `q_idx: ${parsedQuestions[currentQuestionIndex]?.q_idx}, ${parsedQuestions[currentQuestionIndex]?.question || '질문을 받아오지 못했습니다.'}`
                                    : '질문을 받아오지 못했습니다.'}
                            </p>
                        </div>
                        <div className="my_camera">
                            <Webcam width={'100%'} audio={true} ref={webcamRef} screenshotFormat="image/jpeg" />
                        </div>
                        {!isRecording && (
                            <Button onClick={handleRecordButtonClick} variant="outlined" className="record_button">
                                시작
                            </Button>
                        )}
                        <Button onClick={handleNextQuestionClick} variant="outlined" className="next_button">
                            다음질문
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Start;
