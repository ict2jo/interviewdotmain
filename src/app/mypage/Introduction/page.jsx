"use client"
import * as React from 'react';
import './introduction.css';
import { useContext, useEffect} from 'react';
import { Button } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import axios from 'axios';

export default function Introduction() {
    const menuStore = useContext(MenuContext);
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

    return(
        <div>
            {menuStore.uvolist && menuStore.uvolist.map((k) => (
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
                    <p>학력</p>
                    <p>경력</p>
                </div>
                <div className='myinfodetail'>
                    <p>{k.phonenumber}</p>
                    <p>{k.addr}</p>
                    <p>{k.p_job}</p>
                    <p>{k.p_career}</p>
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
                </div>
                <div className='myinfodetail'>
                    <p>{k.p_location}</p>
                    <p>{k.p_job}</p>
                </div>
                </div>
            </div>
            <p className='mymaintext'>자기소개서</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <div className='myinfodetail'>
                <p>{k.Field}</p>
                </div>
                </div>
            </div>
                <div className='mybut'>
                <Button variant="outlined">뒤로가기</Button>
                <Button variant="contained">수정하기</Button>
                </div>
                </>
            ))}
        </div>
    )
}