"use client";
import React, { useEffect, useState, useContext } from 'react';
import './selfprofile.css';
import { Button, FormControl, Input, Typography } from '@mui/material';
import Worklist from './worklist/page'; // Worklist 컴포넌트 임포트
import Schoollist from './school/page';
import Local from './local/page';
import Experience from './experience/page';
import axios from 'axios'; // axios 임포트: HTTP 요청을 위해
import { MenuContext } from '@/stores/StoreContext';

export default function Selfprofile() {
    const menuStore = useContext(MenuContext);

    // 상태 초기화: 사용자 정보를 담는 uvo 상태
    const [uvo, setUvo] = useState({
        name: '',
        phonenumber: '',
        email: '',
        p_job: '',
        p_class: '',
        p_career: '',
        p_location: ''
    });

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오는 효과
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/mypage/selfprofile');
                menuStore.setUvoList(response.data);
                console.log(response.data);
            } catch (error) {
                alert("실패");
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        }
        fetchData();
    }, ['/mypage/selfprofile']);

    // 입력값 변경을 처리하고 uvo 상태를 업데이트하는 함수
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUvo({ ...uvo, [name]: value });
    };
    

    // 수정 완료 버튼 클릭 시 사용자 정보를 업데이트하는 함수
    async function editok() {
        try {
            const response = await axios.post('/mypage/editprofile', uvo);
            console.log('작성 완료:', uvo);
        } catch (error) {
            alert("작성 실패");
            console.error("작성 실패:", error);
        }
    };

    // 각 관심분야 목록 변경을 처리하는 함수들
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

    return (
        <div>
            <div className='profilebox'>
                <h2 className='mymaintext'>내 정보</h2>
                <Typography className='bluetext'>로그인 정보</Typography>
                <div className='mypagetop'>
                    <div className='userimg'></div>
                    <div className='profile'>
                        <p>이름</p>
                        <p>휴대폰 번호</p>
                        <p>이메일</p>
                    </div>
                    {/* 사용자 정보 입력 폼 */}
                    {menuStore.uvolist && menuStore.uvolist.map((uvo) => (
                        <div key={uvo.u_idx} className='inputs'>
                            <FormControl fullWidth>
                                <Input name='name' placeholder={uvo.name} onChange={handleInputChange} />
                                <Input name='phonenumber' placeholder={uvo.phonenumber} onChange={handleInputChange} />
                                <Input name='email' placeholder={uvo.email} onChange={handleInputChange}/>
                            </FormControl>
                        </div>
                    ))}
                </div>
                <hr />
                <Typography className='bluetext'>관심분야</Typography>
                {/* 관심 분야 설정 섹션 */}
                {menuStore.uvolist && menuStore.uvolist.map((uvo) => (
                    <div className='mypagebottum'>
                        <p className='mysmallfont'>업종</p>
                        <Worklist uvo={uvo} handleWorklistChange={handleWorklistChange} />
                        
                        <p className='mysmallfont'>학력</p>
                        <Schoollist uvo={uvo} handleSchoollistChange={handleSchoollistChange} />
                        
                        <p className='mysmallfont'>경력</p>
                        <Experience uvo={uvo} handleCareerlistChange={handleCareerlistChange} />
                        
                        <p className='mysmallfont'>지역</p>
                        <Local uvo={uvo} handleLocationlistChange={handleLocationlistChange} />
                        {/* 뒤로 가기 및 수정 완료 버튼 */}
                        <div className='mybut'>
                            <Button variant="outlined" onClick={() => history.go(-1)}>뒤로가기</Button>
                            <Button variant="contained" onClick={editok}>수정완료</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
