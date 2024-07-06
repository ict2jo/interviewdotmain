import React, { useContext, useEffect, useState } from 'react';
import './introduction.css';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';
import axios from 'axios';
import Local2 from './local/page';
import Worklist2 from './worklist/page';
import Schoollist2 from './school/page';
import Experience2 from './experience/page';

export default function Resume_insert() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);
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
                'http://localhost:8080/introduce/insert',
                {
                    u_idx: userStore.u_idx,
                    location: location,
                    job: job,
                    class: classInfo,
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

    return (
        <>
            <div className='profile_con'>
                <h2 className='mymaintext'>이력서 작성</h2>
                <p><input type="text"  style={{border:"1px solid blue"}}/></p>
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
                                <tr><th>근무지</th><td><Local2 uvo={uvo} handleLocationlistChange={handleLocationlistChange} /></td></tr>
                                <tr><th>업종</th><td><Worklist2 uvo={uvo} handleWorklistChange={handleWorklistChange} /></td></tr>
                                <tr><th>학력</th><td><Schoollist2 uvo={uvo} handleSchoollistChange={handleSchoollistChange} /></td></tr>
                                <tr><th>경력</th><td><Experience2 uvo={uvo} handleCareerlistChange={handleCareerlistChange} /></td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='profile'>
                <h3>자기소개서</h3>
                    <table className='profile_t'>
                        <tbody>
                            <tr><td><textarea value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} rows={10} /></td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='mybut'>
                    <Button variant="outlined" onClick={() => handleMenuClick("resume")}>뒤로가기</Button>
                    <Button variant="contained" onClick={handleSaveChanges}>저장하기</Button>
                    <Button variant="contained" onClick={() => handleMenuClick("verification")}>자기소개서 피드백 받기</Button>
                </div>
            </div>
        </>
    );
}
