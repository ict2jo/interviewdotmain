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
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

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
        };

        
        fetchData();

    }, [resumeIdx, userStore]);



    const handleWorklistChange = (selectedJob) => {
        setJob(selectedJob);
        setUvo({ ...uvo, job: selectedJob });
    };

    const handleSchoollistChange = (selectedClass) => {
        setClassInfo(selectedClass);
        setUvo({ ...uvo, classInfo: selectedClass });
    };

    const handleCareerlistChange = (selectedCareer) => {
        setCareer(selectedCareer);
        setUvo({ ...uvo, career: selectedCareer });
    };

    const handleLocationlistChange = (selectedLocation) => {
        setLocation(selectedLocation);
        setUvo({ ...uvo, location: selectedLocation });
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

    // 제목 수정 
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // 자기소개서 수정 
    const handleSelfIntroductionChange = (event) => {
        setSelfIntroduction(event.target.value);
    };

    // 이력서 수정 서버
    const handleSaveChanges = async (menu) => {
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
                alert('이력서가 성공적으로 저장되었습니다.');
                menuStore.setSelectedMenu(menu);
            } else {
                throw new Error(response.data.error || `Request failed with status ${response.status}`);
            }
        } catch (error) {
            alert("이력서 수정 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    // 자기소개서 피드백 받기
    const handleFeedbackClick = () => {
        menuStore.setSelectedResumeData({
            content: selfIntroduction,
            resume_idx: resumeIdx,
        });
        handleMenuClick("verification");
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
                            <tr><td><PersonRoundedIcon /> &nbsp; {userStore.name}</td><td><CakeRoundedIcon /> &nbsp; {userStore.birth}</td></tr>
                            <tr><td><EmailRoundedIcon/> &nbsp; {userStore.email}</td><td><PhoneAndroidRoundedIcon /> &nbsp; {userStore.phonenumber}</td></tr>
                            <tr><td colSpan="2"><HomeRoundedIcon /> &nbsp; {userStore.addr}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className='profile'>
                <h3>희망 근무조건</h3>
                    <table className='profile_t'>
                        <tbody>
                                <tr><th>근무지</th><td><Local2 location={location} handleLocationlistChange={handleLocationlistChange} /></td></tr>
                                <tr><th>업종</th><td><Worklist2 job={job}  handleWorklistChange={handleWorklistChange} /></td></tr>
                                <tr><th>학력</th><td><Schoollist2 classInfo={classInfo} handleSchoollistChange={handleSchoollistChange} /></td></tr>
                                <tr><th>경력</th><td><Experience3 career={career} handleCareerlistChange={handleCareerlistChange} /></td></tr>
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
                    <Button variant="contained" onClick={() => handleSaveChanges("resume")}>저장하기</Button>
                    <Button variant="contained" onClick={handleFeedbackClick }>자기소개서 피드백 받기</Button>

                </div>
            </div>
        </>
    );
}