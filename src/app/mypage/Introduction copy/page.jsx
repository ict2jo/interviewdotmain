import React, { useContext, useEffect, useState } from 'react';
import './introduction.css';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';
import axios from 'axios';

export default function Introduction() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const selfProfileResponse = await axios.get(`/mypage/selfprofile?id=${userStore.id}`);
                console.log("User data in second then block:", selfProfileResponse.data); // userData가 잘 전달되는지 확인
    
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
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
                setLoading(false);
            }
        }
    
        fetchData();
    }, [userStore]);

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };


    if (loading) {
        return <CircularProgress />;
    }


    return (
        <>
            <div className='profile_con'>
                <h2 className='mymaintext'>이력서</h2> 
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

                <div>
                    <p>이력서제목</p>
                    <Button variant="contained"onClick={() => handleMenuClick("intoduction")}>수정하기</Button>
                </div>

            </div>
        </>
    );
}
