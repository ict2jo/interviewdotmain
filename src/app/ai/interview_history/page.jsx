'use client';

import './interview_history.css';
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
import { Checkbox } from "@mui/material";
import userStore from "@/stores/UserStore";
import Link from "next/link";

export default function InterviewHistory() {
    const [history, setHistory] = useState([]);

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

    return (
        <>
            <div className="container">
                <div className="white_box">
                    <div className="title">
                        <h1>면접기록</h1>
                    </div>
                    <div className="history_title">
                        <TableContainer component={Paper} className="history_table_container">
                            <Table>
                                <TableHead>
                                    <TableRow className="history_title">
                                        <TableCell></TableCell>
                                        <TableCell>면접 질문</TableCell>
                                        <TableCell>면접 날짜</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((entry, index) => (
                                        <Link key={index} href={`/historydetail/${entry.questions[0].r_idx}`} passHref>
                                            <TableRow
                                                className="history_info"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <TableCell>
                                                    {entry.questions[0].question} 외 {entry.questions.length - 1}건
                                                </TableCell>
                                                <TableCell><Checkbox /></TableCell>
                                                <TableCell>{entry.interview_date}</TableCell>
                                            </TableRow>
                                        </Link>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Stack spacing={2} className="paging_number">
                        <Pagination count={10} size="large" />
                    </Stack>
                    <div className="history_list">
                    </div>
                </div>
            </div>
        </>
    )
}
