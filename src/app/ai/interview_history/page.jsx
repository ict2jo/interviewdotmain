'use client';

import './interview_history.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Checkbox} from "@mui/material";
import Header from "@/app/_components/Header";


export default function Interview_history(){
    return(
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
                                    <TableCell>면접 내용</TableCell>
                                    <TableCell>면접 날짜</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
                                <TableRow className="history_info">
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>질문질문질문</TableCell>
                                    <TableCell>내용내용내용</TableCell>
                                    <TableCell>2024-06-12</TableCell>
                                </TableRow>
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