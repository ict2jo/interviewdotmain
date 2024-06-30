"use client"
import * as React from 'react';
import './introduction.css';
import { useContext, useEffect} from 'react';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';

export default function Introduction() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = React.useState(true);
    const [k, setUvo] = React.useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                await userStore.loadUserFromServer();
                setUvo({
                u_idx: userStore.u_idx,
                id: userStore.id,
                name: userStore.name,
                phonenumber: userStore.phonenumber,
                email: userStore.email,
                p_job: userStore.p_job,
                p_class: userStore.p_class,
                p_career: userStore.p_career,
                p_location: userStore.p_location,
                addr: userStore.addr,
                field: userStore.field
            });
            console.log(userStore.addr);
            setLoading(false);
            } catch (error) {
                alert("실패");
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
    return(
        <div>
            <>
            <h2 className='mymaintext'>자기소개서제목</h2> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <h2 className='myname1'>{k.name}</h2>
                <p>&nbsp;</p>
                <p>{k.birth}</p>
                </div>
                <div className='myname'>
                <div className='myinfotitle'>
                    <p>휴대폰</p>
                    <p>주소</p>
                    
                </div>
                <div className='myinfodetail'>
                    <p>{k.phonenumber}</p>
                    <p>{userStore.addr}</p>
                    
                </div>
                <div className='myinfotitle'>
                    <p>email</p>
                </div>
                <div className='myinfodetail'>
                    <p>{k.email}</p>
                </div>
                </div>
            </div>
            <p className='mymaintext'>희망 근무 조건</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <div className='myinfotitle'>
                    <p>근무지</p>
                    <p>업종</p>
                    <p>학력</p>
                    <p>경력</p>
                </div>
                <div className='myinfodetail'>
                    <p>{k.p_location}</p>
                    <p>{k.p_job}</p>
                    <p>{k.p_class}</p>
                    <p>{k.p_career}</p>
                </div>
                </div>
            </div>
            <p className='mymaintext'>자기소개서</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <div className='myinfodetail'>
                <p>{k.field}</p>
                </div>
                </div>
            </div>
                <div className='mybut'>
                <Button variant="contained"  onClick={() => handleMenuClick("verification")}>자기소개서 수정하기</Button>
                </div>
                </>
        </div>
    )
}