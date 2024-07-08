"use client";
import React, { useEffect, useState } from 'react';
import './selfprofile.css';
import { Button, Input, Typography, CircularProgress } from '@mui/material';
import Worklist from './worklist/page';
import Schoollist from './school/page';
import Local from './local/page';
import Experience from './experience/page';
import axios from 'axios';
import userStore from '@/stores/UserStore';

export default function Selfprofile() {
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // 로딩 상태를 true로 설정

            try {
                await userStore.loadUserFromServer();
                const response = await axios.get(`/mypage/selfprofile?id=${userStore.id}`);
                setUvo(response.data[0]);  // 응답 데이터를 uvo 상태로 설정
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setLoading(false);  // 로딩 상태를 false로 설정
            }
        };

        fetchData();
    }, [userStore.id]);

    useEffect(() => {
        console.log("uvo:", uvo[0]);
    }, [uvo]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUvo({ ...uvo, [name]: value });
    };

    async function editok() {
        try {
            await axios.post('/mypage/editprofile', uvo);
            alert('프로필 수정 완료');
            location.reload();
        } catch (error) {
            alert("수정 실패");
            console.error("수정 실패:", error);
        }
    }

    const handleWorklistChange = (selectedJob) => {
        setUvo({ ...uvo, p_job: selectedJob });
    };

    const handleSchoollistChange = (selectedClass) => {
        setUvo({ ...uvo, p_class: selectedClass });
    };

    const handleCareerlistChange = (selectedCareer) => {
        setUvo({ ...uvo, p_career: selectedCareer });
    };

    const handleLocationlistChange = (selectedLocation) => {
        setUvo({ ...uvo, p_location: selectedLocation });
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <div className='profilebox'>
                <h2 className='myselfmaintext'>내 정보</h2>
                <Typography className='bluetext'>로그인 정보</Typography>
                <div className='mypagetop'>
                    <div className='profile'>
                        <p>이름:</p>
                        <p>휴대폰 번호:</p>
                        <p>이메일: </p>
                        <p>주소: </p>
                    </div>
                    <div className='profoleinputs'>
                        <Input name='name' placeholder="이름을 입력하세요" value={uvo.name} onChange={handleInputChange} sx={{ width: 550 }} />
                        <Input name='phonenumber' placeholder="전화번호를 입력하세요" value={uvo.phonenumber} onChange={handleInputChange} sx={{ width: 550 }} />
                        <Input name='email' placeholder="이메일을 입력하세요" value={uvo.email} onChange={handleInputChange} sx={{ width: 550 }} />
                        <Input name='addr' placeholder="주소를 입력하세요" value={uvo.addr} onChange={handleInputChange} sx={{ width: 550 }} />
                    </div>
                </div>
                <hr />
                <Typography className='bluetext'>관심분야</Typography>
                <div className='mypagebottum'>
                    <p className='mysmallfont'>지역</p>
                    <Local uvo={uvo} handleLocationlistChange={handleLocationlistChange} />
                    <p className='mysmallfont'>업종</p>
                    <Worklist uvo={uvo} handleWorklistChange={handleWorklistChange} />
                    <p className='mysmallfont'>학력</p>
                    <Schoollist uvo={uvo} handleSchoollistChange={handleSchoollistChange} />
                    <p className='mysmallfont'>경력</p>
                    <Experience uvo={uvo} handleCareerlistChange={handleCareerlistChange} />
                    <div className='mybut'>
                        <Button variant="outlined" onClick={() => { handleMenuClick("main"); }}>뒤로가기</Button>
                        <Button variant="contained" onClick={editok}>수정완료</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
