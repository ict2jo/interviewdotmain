"use client";
import React, { useEffect, useState, useRef } from 'react';
import './start.css';
import { Button, Grid } from "@mui/material";
import { usePagination, PaginationItemType } from "@nextui-org/react";
import Webcam from 'react-webcam';
import { useRouter } from "next/navigation";
import questionStore from '@/stores/questionStore';

const Start = () => {
    const router = useRouter();
    const [parsedQuestions, setParsedQuestions] = useState([]);

    useEffect(() => {
        setParsedQuestions(questionStore.selectedQuestions);
    }, []);

    const [time, setTime] = useState(90);
    const { activePage, range, setPage, onNext } = usePagination({
        total: parsedQuestions.length,
        showControls: true,
        siblings: 1,
        boundaries: 1,
    });

    // 웹캠 관련 상태
    const webcamRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime ===    0) {
                    clearInterval(timer);
                    nextPage();
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [activePage]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const handlePageChange = (page) => {
        setPage(page);
        setTime(90); // 타이머 재설정
    };

    const nextPage = () => {
        if (activePage === parsedQuestions.length) {
            router.push("/interview/finish");
        } else {
            onNext();
            setTime(90); // 타이머 재설정
        }
    };

    const startRecording = () => {
        if (webcamRef.current) {
            const stream = webcamRef.current.video.srcObject;
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                setRecordedChunks(chunks);
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'recorded-video.webm';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    useEffect(() => {
        if (parsedQuestions.length > 0) {
            const query = new URLSearchParams({
                selectedQuestions: JSON.stringify(parsedQuestions)
            }).toString();
            router.replace(`/interview/start?${query}`);
            console.log('parsedQuestions:', parsedQuestions);
        }
    }, [parsedQuestions]);


    return (
        <div className="start_container">
            <div className="start_white_box">
                <div className="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
                <div className="question">
                    <p>{parsedQuestions.length > 0 ? (parsedQuestions[activePage - 1]?.question || '질문을 받아오지 못했습니다.') : '질문을 받아오지 못했습니다.'}</p>
                </div>
                        <Webcam
                            audio={true}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam_preview"
                        />
                <div className="paging_number">
                    <ul className="flex gap-2 items-center pagination_container">
                        {range.map((page, index) => {
                            if (page === PaginationItemType.PREV || page === PaginationItemType.NEXT) {
                                return null;
                            }

                            if (page === PaginationItemType.DOTS) {
                                return (
                                    <li key={`dots-${index}`} className="w-4 h-4">
                                        ...
                                    </li>
                                );
                            }

                            return (
                                <li key={`page-${index}`} aria-label={`page ${page}`} className="w-4 h-4">
                                    <button
                                        className={`pagination_button ${activePage === page ? "active" : ""}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Start;
