"use client";
import React, { useEffect, useState, useContext } from 'react';
import './selfprofile.css';
import { Button, FormControl, Input, Typography, CircularProgress } from '@mui/material';
import Worklist from './worklist/page';
import Schoollist from './school/page';
import Local from './local/page';
import Experience from './experience/page';
import axios from 'axios';
import { MenuContext } from '@/stores/StoreContext';
import authStore from '@/stores/AuthStore';

export default function Selfprofile() {
    const user = authStore.getUser();
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);
    const [uvo, setUvo] = useState({
        u_idx: user.u_idx,
        id: user.id,
        name: user.name,
        phonenumber: user.phonenumber,
        email: user.email,
        p_job: '',
        p_class: '',
        p_career: '',
        p_location: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/mypage/selfprofile?u_idx=${user.u_idx}`);
                menuStore.setUvoList(response.data);
                console.log("user.u_idx",user.u_idx);
                console.log("response.datat",response.data);
                menuStore.setUvoList(response.data);
                console.log("uvolist",menuStore.uvolist);
                setLoading(false);
            } catch (error) {
                alert("데이터를 가져오는 데 실패했습니다.");
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
                setLoading(false);
            }
        }
        fetchData();
    }, [menuStore, user.u_idx]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUvo({ ...uvo, [name]: value });
    };

    async function editok() {
        try {
            await axios.post('/mypage/editprofile', uvo);
            console.log('작성 완료:', uvo);
        } catch (error) {
            alert("작성 실패");
            console.error("작성 실패:", error);
        }
    };

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
                <h2 className='mymaintext'>내 정보</h2>
                <Typography className='bluetext'>로그인 정보</Typography>
                <div className='mypagetop'>
                    <div className='userimg'></div>
                    <div className='profile'>
                        <p>이름:</p>
                        <p>휴대폰 번호:</p>
                        <p>이메일: </p>
                    </div>
                    {menuStore.uvolist.map((item) => (
                        <div key={item.u_idx} className='inputs'>
                            <FormControl fullWidth>
                                <Input name='name' placeholder={item.name} onChange={handleInputChange} />
                                <Input name='phonenumber' placeholder={item.phonenumber} onChange={handleInputChange} />
                                <Input name='email' placeholder={item.email} onChange={handleInputChange} />
                            </FormControl>
                        </div>
                    ))}
                </div>
                <hr />
                <Typography className='bluetext'>관심분야</Typography>
                {menuStore.uvolist && menuStore.uvolist.map((item) => (
                    <div key={item.u_idx} className='mypagebottum'>
                        <p className='mysmallfont'>업종</p>
                        <Worklist uvo={item} handleWorklistChange={handleWorklistChange} />
                        
                        <p className='mysmallfont'>학력</p>
                        <Schoollist uvo={item} handleSchoollistChange={handleSchoollistChange} />
                        
                        <p className='mysmallfont'>경력</p>
                        <Experience uvo={item} handleCareerlistChange={handleCareerlistChange} />
                        
                        <p className='mysmallfont'>지역</p>
                        <Local uvo={item} handleLocationlistChange={handleLocationlistChange} />
                        
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
