"use client"
import * as React from 'react';
import './career.css';
import { Button, Input, Typography } from '@mui/material';


export default function Career() {
    return(
        <div>
            <h2 className='mymaintext'>자기소개서제목</h2> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <h2 className='myname1'>편조이</h2>
                <p>&nbsp;</p>
                <p>1997년 (만27세)</p>
                </div>
                <div className='myname'>
                <div className='myinfotitle'>
                    <p>휴대폰</p>
                    <p>주소</p>
                    <p>학력</p>
                    <p>경력</p>
                </div>
                <div className='myinfodetail'>
                    <p>010-6800-4220</p>
                    <p>서울특별시 강서구 화곡동</p>
                    <p>대학교(4년제)</p>
                    <p>신입</p>
                </div>
                <div className='myinfotitle'>
                    <p>email</p>
                </div>
                <div className='myinfodetail'>
                    <p>naver@naver.com</p>
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
                    <p>서울</p>
                    <p>백엔드 개발자</p>
                </div>
                </div>
            </div>
            <p className='mymaintext'>자기소개서</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <div className='myinfotitle'>
                </div>
                <div className='myinfodetail'>
                </div>
                </div>
            </div>
                <div className='mybut'>
                <Button variant="outlined">뒤로가기</Button>
                <Button variant="contained">수정하기</Button>
                </div>
        </div>
    )
}