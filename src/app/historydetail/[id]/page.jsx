'use client';

import { useEffect, useState } from 'react';
import {useParams, useRouter} from 'next/navigation';
import userStore from "@/stores/UserStore";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import "./historydetail.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import menuStore from "@/stores/MenuStore";


export default function Historydetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(true);


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: '100%',
    }));

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
        router.push("/");
    };

    useEffect(() => {
        if (id) {
            fetchDetail();
        }
    }, [id]);

    const fetchDetail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/interview/historydetail?r_idx=${id}&id=${userStore.id}`);
            const data = await response.json();
            setDetail(data);
            setLoading(false);
        } catch (error) {
            console.error('기록 상세 못가져옴:', error);
            setLoading(false);
        }
    };


    return (
        <div className="history_container">
            <Header handleMenuClick = {handleMenuClick}/>
            <h1>면접 상세 정보</h1>
            {loading ? (
                <p>로딩중...</p>
            ) : detail.length > 0 ? (
                detail.map((item, history_value) => (
                    <div className="history_box" key={history_value}>
                        <Box sx={{flexGrow: 1}}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={10}>
                                    <Item>질문: {item.question}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>감정: {item.sentiment}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>감정: {item.sentiment}</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>답변: {item.text}</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>AI답변 들어갈곳</Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Item>동영상 가지고 와볼까</Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                ))
            ) : (
                <p>ERROR</p>
            )}
            <Footer/>
        </div>
    );
}
