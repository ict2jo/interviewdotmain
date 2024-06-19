"use client"

import React, { useState, useEffect, useRef } from 'react';
import './start.css';
import { Button, Grid } from "@mui/material";
import { usePagination, PaginationItemType } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Webcam from 'react-webcam';

const Start = () => {
    const [time, setTime] = useState(90);
    const router = useRouter();
    const { activePage, range, setPage, onNext } = usePagination({
        total: 6,
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
                if (prevTime === 0) {
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
        if (activePage === 6) {
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

    return (
        <div className="container">
            <div className="white_box">
                <div className="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
                <div className="question">
                    <p>선택한 질문이 얼마나 길게 나올지 모르겠으니 일단 최대한 길게</p>
                </div>
                <Grid container spacing={0} className="content">
                    <Grid item xs={6} className="my_camera">
                        <Webcam
                            audio={true}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam_preview"
                        />
                        <div className="button_container">
                            {!isRecording ? (
                                <Button variant="outlined" onClick={startRecording}>녹화 시작</Button>
                            ) : (
                                <Button variant="contained" onClick={stopRecording}>녹화 중지</Button>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={5} className="answer_form">
                        음성 답변 실시간 출력
                    </Grid>
                </Grid>
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
