import React, { useContext, useEffect, useState } from 'react';
import './resume.css';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';
import axios from 'axios';
import Local2 from './local/page';
import Worklist2 from './worklist/page';
import Schoollist2 from './school/page';
import Experience2 from './experience/page';

export default function Resume() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [location, setLocation] = useState('');
    const [job, setJob] = useState('');
    const [classInfo, setClassInfo] = useState('');
    const [career, setCareer] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');
    const [uvo, setUvo] = useState({
        u_idx: userStore.u_idx,
        id: userStore.id,
        name: userStore.name,
        phonenumber: userStore.phonenumber,
        email: userStore.email,
        p_job: userStore.p_job,
        p_class: userStore.p_class,
        p_career: userStore.p_career,
        p_location: userStore.p_location,
        addr: userStore.addr
    });

    const handleWorklistChange = (selectedJob) => {
        setJob(selectedJob);
    };

    const handleSchoollistChange = (selectedClass) => {
        setClassInfo(selectedClass);
    };

    const handleCareerlistChange = (selectedCareer) => {
        setCareer(selectedCareer);
    };

    const handleLocationlistChange = (selectedLocation) => {
        setLocation(selectedLocation);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const selfProfileResponse = await axios.get(`/mypage/selfprofile?id=${userStore.id}`);
                
                if (selfProfileResponse.data.length === 0) {
                    await axios.post(`/mypage/selfprofileinsert?u_idx=${userStore.u_idx}`);
                } else {
                    const selfProfileData = selfProfileResponse.data[0];
                    userStore.setAddr(selfProfileData.addr);
                    userStore.setP_job(selfProfileData.p_job);
                    userStore.setP_class(selfProfileData.p_class);
                    userStore.setP_career(selfProfileData.p_career);
                    userStore.setP_location(selfProfileData.p_location);
                    setDefaultValues(selfProfileData);
                }
                setLoading(false);
            } catch (error) {
                alert("데이터를 가져오는 중 오류가 발생했습니다.");
                setLoading(false);
            }
        }
        
        fetchData();
    }, [userStore]);

    const setDefaultValues = (selfProfileData) => {
        setLocation(selfProfileData.p_location);
        setJob(selfProfileData.p_job);
        setClassInfo(selfProfileData.p_class);
        setCareer(selfProfileData.p_career);
        setSelfIntroduction(selfProfileData.field);
    };

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };



    const handleSaveChanges = async () => {
        try {
            // 서버에 수정된 데이터 저장 로직
            const response = await axios.post(
                'http://localhost:8080/introduce/update',
                {
                    u_idx: userStore.u_idx,
                    p_location: location,
                    p_job: job,
                    p_class: classInfo,
                    p_career: career,
                    selfIntroduction: selfIntroduction
                });
            // 저장 후 수정 모드 종료
            setEditMode(false);
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

    return (
        <>
            <div className='resume_con'>
                <h1>이력서 관리</h1>

                <div className='resume_card'>
                    <table className='resume_t'>
                        <tbody>
                            <tr><th colSpan="2">이력서제목</th></tr>
                            <tr><td>근무지 {location}</td><td>업종 {job}</td></tr>
                            <tr><td>학력 {classInfo}</td><td>경력 {career}</td></tr>
                        </tbody>
                    </table>
                    <Button variant="outlined" onClick={() => handleMenuClick("intoduction")} className="edit_button">수정하기</Button>
                </div>
                <Button variant="contained" onClick={() => handleMenuClick("resume_insert")} className="write_button">작성하기</Button>
            </div>
        </>
    );
}
