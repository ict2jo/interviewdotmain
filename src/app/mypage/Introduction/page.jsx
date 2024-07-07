import React, { useContext, useEffect, useState } from 'react';
import './introduction.css';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';
import axios from 'axios';
import Local2 from './local/page';
import Worklist2 from './worklist/page';
import Schoollist2 from './school/page';
import Experience3 from './experience/page';

export default function Introduction() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('');
    const [job, setJob] = useState('');
    const [classInfo, setClassInfo] = useState('');
    const [career, setCareer] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');
    const [title, setTitle] = useState('');
    const [resumeIdx, setResumeIdx] = useState('');
    const [uvo, setUvo] = useState({
        u_idx: userStore.u_idx,
        id: userStore.id,
        name: userStore.name,
        phonenumber: userStore.phonenumber,
        email: userStore.email,
        job: userStore.job,
        classInfo: userStore.classInfo,
        career: userStore.career,
        location: userStore.location,
        addr: userStore.addr
    });

    useEffect(() => {
        const fetchData = async () => {
            await userStore.loadUserFromServer();
            setUvo({
                u_idx: userStore.u_idx,
                id: userStore.id,
                name: userStore.name,
                phonenumber: userStore.phonenumber,
                email: userStore.email,
                job: userStore.job,
                classInfo: userStore.classInfo,
                career: userStore.career,
                location: userStore.location,
                addr: userStore.addr
            });
            setLoading(false);
        };
        fetchData();
    }, []);


    const handleWorklistChange = (selectedJob) => {
        setUvo({ job: selectedJob });
    };

    const handleSchoollistChange = (selectedClass) => {
        setUvo({ classInfo: selectedClass });
    };

    const handleCareerlistChange = (selectedCareer) => {
        setUvo({ career: selectedCareer });
    };

    const handleLocationlistChange = (selectedLocation) => {
        setUvo({ location: selectedLocation });
    };


    // MenuContext에서 selectedResumeData 가져오기
    useEffect(() => {
        const selectedResumeData = menuStore.selectedResumeData;

        if (selectedResumeData) {
            setLocation(selectedResumeData.location);
            setJob(selectedResumeData.job);
            setClassInfo(selectedResumeData.classInfo);
            setCareer(selectedResumeData.career);
            setSelfIntroduction(selectedResumeData.content);
            setTitle(selectedResumeData.title);
            setResumeIdx(selectedResumeData.resume_idx);
        }

        setLoading(false);
    }, [menuStore.selectedResumeData]);




    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };

    // 제목 수정 처리
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // 자기소개서 수정 처리
    const handleSelfIntroductionChange = (event) => {
        setSelfIntroduction(event.target.value);
    };

    // 서버에 수정된 데이터 저장 로직
    const handleSaveChanges = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/introduce/re_update',
                {
                    u_idx: userStore.u_idx,
                    resume_idx: resumeIdx,
                    location: location,
                    job: job,
                    classInfo: classInfo,
                    career: career,
                    content: selfIntroduction,
                    title: title
                });

            if (response.status === 200) {
                alert('자기소개서가 성공적으로 저장되었습니다.');
            } else {
                throw new Error(response.data.error || `Request failed with status ${response.status}`);
            }
        } catch (error) {
            alert("데이터 수정 중 오류가 발생했습니다.");
            console.error("데이터 수정 중 오류가 발생했습니다:", error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    const handleFeedbackClick = () => {
        menuStore.setSelectedResumeData({
            content: selfIntroduction,
            resume_idx: resumeIdx
        });
        handleMenuClick("verification"); // 예시로, 다른 메뉴를 설정합니다.
    };

    return (
        <>
            <div className='profile_con'>
                <h2 className='mymaintext'>이력서 수정</h2>
                <p><input type="text" value={title} onChange={handleTitleChange} /></p>

                <div className='profile'>
                    <h3>인적사항</h3>
                    <table className='profile_t'>
                        <tbody>
                            <tr><td>ㅇ {userStore.name}</td><td>ㅇ {userStore.birth}</td></tr>
                            <tr><td>ㅇ {userStore.email}</td><td>ㅇ {userStore.phonenumber}</td></tr>
                            <tr><td colSpan="2">ㅇ {userStore.addr}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='profile'>
                <h3>희망 근무조건</h3>
                    <table className='profile_t'>
                        <tbody>
                                <tr><th>근무지</th><td><Local2 handleLocationlistChange={handleLocationlistChange} /></td></tr>
                                <tr><th>업종</th><td><Worklist2 handleWorklistChange={handleWorklistChange} /></td></tr>
                                <tr><th>학력</th><td><Schoollist2 handleSchoollistChange={handleSchoollistChange} /></td></tr>
                                <tr><th>경력</th><td><Experience3 handleCareerlistChange={handleCareerlistChange} /></td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='profile'>
                <h3>자기소개서</h3>
                    <table className='profile_t'>
                        <tbody>
                            <tr><td><textarea value={selfIntroduction} onChange={handleSelfIntroductionChange} rows={10} /></td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='mybut'>
                    <Button variant="outlined" onClick={() => handleMenuClick("resume")}>뒤로가기</Button>
                    <Button variant="contained" onClick={handleSaveChanges}>저장하기</Button>
                    <Button variant="contained" onClick={handleFeedbackClick }>자기소개서 피드백 받기</Button>

                </div>
            </div>
        </>
    );
}