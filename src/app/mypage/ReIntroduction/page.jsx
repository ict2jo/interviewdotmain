"use client"
import React, { useContext, useEffect, useState } from 'react';
import './reIntroduction.css';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';

export default function ReIntroduction() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('');
    const [job, setJob] = useState('');
    const [classInfo, setClassInfo] = useState('');
    const [career, setCareer] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                await userStore.loadUserFromServer(); // 서버에서 사용자 데이터 로드
                setLocation(userStore.p_location);
                setJob(userStore.p_job);
                setClassInfo(userStore.p_class);
                setCareer(userStore.p_career);
                setSelfIntroduction(userStore.field);
                setLoading(false);
            } catch (error) {
                alert("데이터를 가져오는 중 오류가 발생했습니다.");
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);  

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <div className='profile_con'>
                <h2 className='mymaintext'>자기소개서제목</h2> 
                <div className='profile'>
                    <table className='styled-table'>
                        <tbody>
                            <tr><th colSpan="4" style={{backgroundColor:"blue", color: "white"}}>인적사항</th></tr>
                            <tr><th>이름</th><td>{userStore.name}</td><th>생년월일</th><td>{userStore.birth}</td></tr>
                            <tr><th>Email</th><td>{userStore.email}</td><th>휴대폰</th><td>{userStore.phonenumber}</td></tr>
                            <tr><th>주소</th><td colSpan="3">{userStore.addr}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='profile'>
                    <table className='styled-table'>
                        <tbody>
                            <tr><th colSpan="2" style={{backgroundColor:"blue", color: "white"}}>희망 근무조건</th></tr>
                            <tr><th>근무지</th><td><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></td></tr>
                            <tr><th>업종</th><td><input type="text" value={job} onChange={(e) => setJob(e.target.value)} /></td></tr>
                            <tr><th>학력</th><td><input type="text" value={classInfo} onChange={(e) => setClassInfo(e.target.value)} /></td></tr>
                            <tr><th>경력</th><td><input type="text" value={career} onChange={(e) => setCareer(e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='profile'>
                    <table className='styled-table'>
                        <tbody>
                            <tr><th style={{backgroundColor:"blue", color: "white"}}>자기소개서</th></tr>
                            <tr><td><textarea value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} rows={5} cols={50} /></td></tr>
                        </tbody>
                    </table>
                </div>
                
                <div className='mybut'>
                    <Button variant="contained" onClick={() => handleMenuClick("verification")}>자기소개서 피드백 받기</Button>
                </div>
            </div>
        </>
    );
}