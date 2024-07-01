"use client";
import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import userStore from "@/stores/UserStore";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import "./historydetail.css";
import {styled} from '@mui/material/styles';
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

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    }));


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
        <>
            <Header/>
            <div className="history_container">
                <h1>면접 상세 정보</h1>
                {loading ? (
                    <p>로딩중...</p>
                ) : detail.length > 0 ? (
                    detail.map((item, index) => (
                        <div className="history_box" key={index}>
                            <Box sx={{marginBottom: 2}}>
                                <Item>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <div className="item-label">질문</div>
                                            <div className="item-content">{item.question}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="item-label">자세</div>
                                            <div className="item-content">{item.pose_results}</div>
                                            <div className="item-label">감정</div>
                                            <div className="item-content">{item.sentiment}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="item-label">답변</div>
                                            <div className="item-content">{item.text}</div>
                                            <div className="item-label">AI 답변</div>
                                            <div className="item-content">{item.campus}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="item-label">질문 의도</div>
                                            <div className="item-content">{item.intention}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="item-label">AI 피드백</div>
                                            <div className="item-content">{item.feedback}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="item-label">영상</div>
                                            <div className="item-content">
                                                <video width="100%" controls>
                                                    <source src={`http://localhost:8010/video_get/${item.video_uuid}`}
                                                            type="video/mp4"/>
                                                </video>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Item>
                            </Box>
                        </div>
                    ))
                ) : (
                    <p>ERROR</p>
                )}
            </div>
            <Footer/>
        </>

    );
}
