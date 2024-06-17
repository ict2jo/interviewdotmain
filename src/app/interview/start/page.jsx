"use client";

import React, { useState, useEffect } from 'react';
import './start.css';
import { Button, Grid } from "@mui/material";
import Image from 'next/image';
import sample_image from "@/../public/sample.png";
import { usePagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "@/app/_components/ChevronIcon";
import {useRouter} from "next/navigation";

export default function Start() {
    const [time, setTime] = useState(90);
    const router = useRouter();
    const { activePage, range, setPage, onNext } = usePagination({
        total: 6,
        showControls: true,
        siblings: 1,
        boundaries: 1,
    });

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

    return (
        <div className="container">
            <div className="white_box">
                <div className="timer">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
                <div className="question">
                    <p>선택한 질문이 얼마나 길게 나올지 모르겠으니 일단 최대한 길게</p>
                </div>
                <Grid container spacing={0} className="content">
                    <Grid item xs={6} className="my_camera">
                        <Image
                            src={sample_image}
                            width={500}
                            height={100}
                            alt="Sample_Image"
                            className="test_img"
                        />
                    </Grid>
                    <Grid item xs={5} className="answer_form">
                        음성 답변 실시간 출력
                    </Grid>
                </Grid>
                <div className="button_container">
                    <Button variant="outlined" className="re_button">재답변</Button>
                    <Button variant="contained" className="check_button">확인</Button>
                </div>
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
}
