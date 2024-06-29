"use client"
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
import { Button, Checkbox } from "@mui/material";
import userStore from "@/stores/UserStore";
import Link from "next/link";

export default function InterviewHistory() {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const itemsPerPage = 5;

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

    const handleCheckboxChange = (index) => {
        const updatedHistory = [...history];
        updatedHistory[index].isChecked = !updatedHistory[index].isChecked;
        setHistory(updatedHistory);
    };

    const handleSelectAll = () => {
        const updatedHistory = history.map(entry => ({
            ...entry,
            isChecked: !isCheckedAll
        }));
        setHistory(updatedHistory);
        setIsCheckedAll(!isCheckedAll);
    };

    const handleSelectDelete = async () => {
        const selectedIndexes = history.reduce((acc, entry, index) => {
            if (entry.isChecked) {
                acc.push(index);
            }
            return acc;
        }, []);

        const selectedIds = selectedIndexes.map(index => history[index].questions[0].r_idx);
        console.log(selectedIds); // 선택된 r_idx 배열 콘솔 출력

        if (selectedIds.length > 0) {
            try {
                const response = await fetch(`http://localhost:8080/interview/historydelete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ r_idx: selectedIds }),
                });

                if (response.ok) {
                    console.log('삭제 완료');
                    alert("정상적으로 삭제되었습니다. ");
                    getHistory();
                } else {
                    console.error('삭제 실패');
                }
            } catch (error) {
                console.error('삭제 요청 에러:', error);
            }
        } else {
            console.warn('선택된 항목이 없습니다.');
        }
    };



    const filteredHistory = history.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                                        <TableCell>
                                        </TableCell>
                                        <TableCell>면접 질문</TableCell>
                                        <TableCell>면접 날짜</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredHistory.map((entry, index) => (
                                        <TableRow
                                            key={index}
                                            className="history_info"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    checked={entry.isChecked || false}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/historydetail/${entry.questions[0].r_idx}`} passHref>
                                                    <span>
                                                        {entry.questions[0].question} 외 {entry.questions.length - 1}건
                                                    </span>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{entry.interview_date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="history_button">
                        <Button
                            variant="outlined"
                            className="select_button"
                            onClick={handleSelectAll}
                        >
                            {isCheckedAll ? '전체 해제' : '전체 선택'}
                        </Button>
                        <Button variant="outlined" className="delete_button" onClick={handleSelectDelete}>
                            선택 삭제
                        </Button>
                    </div>
                    <Stack spacing={2} className="paging_number">
                        <Pagination
                            count={Math.ceil(history.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            size="large"
                        />
                    </Stack>
                    <div className="history_list">
                    </div>
                </div>
            </div>
        </>
    )
}
