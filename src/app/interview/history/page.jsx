"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import userStore from "@/stores/UserStore";
import "./history.css";
import { useRouter } from "next/navigation";
import {Button} from "@mui/material";

export default function InterviewHistory() {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

    useEffect(() => {
        if (userStore.id) {
            getHistory();
        }
    }, [userStore.id]);

    const getHistory = () => {
        fetch(`http://localhost:8080/interview/history?id=${userStore.id}`)
            .then(response => response.json())
            .then(data => {
                const groupedData = groupByDate(data);
                setHistory(groupedData);
            })
            .catch(error => console.error('기록 못가져옴:', error));
    };

    const groupByDate = (data) => {
        const grouped = data.reduce((group, record) => {
            const date = record.interview_date;
            if (!group[date]) {
                group[date] = {
                    interview_date: date,
                    questions: []
                };
            }
            group[date].questions.push(record);
            return group;
        }, {});

        return Object.values(grouped);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSelectQuestion = (entry) => {
        if (entry.questions.length > 0) {
            const selectedQuestions = entry.questions.map(question => ({
                q_idx: question.q_idx,
                question: question.question
            }));
            const selectedQuestionsString = encodeURIComponent(JSON.stringify(selectedQuestions));
            const q_idx = entry.questions.map(question => question.q_idx);

            router.push(`/interview/start?q_idx=${q_idx}&selectedQuestions=${selectedQuestionsString}`);
        } else {
            console.error("질문이 없습니다.");
        }
    };

    const filteredHistory = history.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlebefore = () => {
        localStorage.removeItem("rand");
        router.push('/interview/select')
    }

    return (
        <div className="history_container">
            <div className="history_white_box">
                <div className="title">
                    <h1>과거 면접기록</h1>
                    <span>클릭 시 해당 질문에 대한 면접이 시작됩니다.</span><br/>
                </div>
                <br/>
                <div className="history_title">
                    <TableContainer component={Paper} className="history_table_container">
                        <Table>
                            <TableHead>
                                <TableRow className="history_title">
                                    <TableCell>면접 질문</TableCell>
                                    <TableCell>면접 날짜</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            면접 기록이 없습니다.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredHistory.map((entry, index) => (
                                        <TableRow
                                            key={index}
                                            className="history_info"
                                            style={{cursor: 'pointer'}}
                                            onClick={() => handleSelectQuestion(entry)}
                                        >
                                            <TableCell>
                                                {entry.questions.map((question, i) => (
                                                    <React.Fragment key={i}>
                                                        {question.question}<br/>
                                                    </React.Fragment>
                                                ))}
                                            </TableCell>
                                            <TableCell>{entry.interview_date}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button onClick={handlebefore} variant="contained" className="history_before_button">이전</Button>
                {history.length > 0 && (
                    <Stack spacing={2} className="paging_number">
                        <Pagination
                            count={Math.ceil(history.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            size="large"
                        />
                    </Stack>
                )}
                <div className="history_list"></div>
            </div>
        </div>
    );
}
