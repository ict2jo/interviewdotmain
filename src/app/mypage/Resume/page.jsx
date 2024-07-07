import React, { useContext, useEffect, useState } from 'react';
import './resume.css';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';
import axios from 'axios';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PlaceIcon from '@mui/icons-material/Place';
import BuildIcon from '@mui/icons-material/Build';

export default function Resume() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState([]);

    

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/introduce/re_select?u_idx=${userStore.u_idx}`
            );
            const data = response.data;
            
            setResume(data);
            setLoading(false);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    const handleMenuClick = (menu, resumeIdx) => {
        const selectedResumeData = resume.find(item => item.resume_idx === resumeIdx);
        if (selectedResumeData) {
            menuStore.setSelectedMenu(menu);
            menuStore.setSelectedResumeData(selectedResumeData);
            console.log("보내기 : ", selectedResumeData);
        } else {
            console.error(`Resume with resume_idx ${resumeIdx} not found.`);
        }
    };


    const handleMenuClick2 = (menu) => {
        menuStore.setSelectedMenu(menu);
    };
    

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <div className='resume_con'>
                <h1>이력서 관리</h1>
                {resume.map((item) => (
                    <div className='resume_card' key={item.resume_idx}>
                        <table className='resume_t'>
                            <tbody>
                                <tr><th colSpan="2">{item.title}</th></tr>
                                <tr><td><PlaceIcon /> {item.location}</td><td><BuildIcon /> {item.job}</td></tr>
                                <tr><td><SchoolIcon /> {item.classInfo}</td><td><BusinessCenterIcon /> {item.career}</td></tr>
                            </tbody>
                        </table>
                        <Button
                            variant="outlined"
                            onClick={() => handleMenuClick("intoduction", item.resume_idx, item)}
                            className="edit_button"
                        >
                            수정하기
                        </Button>
                    </div>
                ))}
                <Button variant="contained" onClick={() => handleMenuClick2("resume_insert")} className="write_button">작성하기</Button>
            </div>
        </>
    );
}
