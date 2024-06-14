"use client"
import Header from '@/app/_components/Header';
import * as React from 'react';
import './selfprofile.css';
import { Input, Typography } from '@mui/material';
import Worklist from './worklist/page';
import Schoollist from './school/page';
import Local from './local/page';
import Experience from './experience/page';


export default function Selfprofile() {
    return(
        <div>
            <Header />
            <div className='profilebox'>
                <h1>내 정보</h1> 
                <Typography className='bluetext'>로그인 정보</Typography>
                <div className='userimg'></div>
                <div className='profile'>
                <p>이름</p>
                <p>휴대폰 번호</p>
                <p>이메일</p>
                </div>
                <div className='inputs'>
                <Input fullWidth="true" placeholder="이름을 입력하세요"/>
                <Input fullWidth="true" placeholder="번호를 입력하세요"/>
                <Input fullWidth="true" placeholder="이메일을 입력하세요"/>
                </div>
                <hr />
                <Typography className='bluetext'>관심분야</Typography>
                <p>업종</p>
                <Worklist />
                <p>학력</p>
                <Schoollist />
                <p>경력</p>
                <Experience />
                <p>지역</p>
                <Local />
            </div>
        </div>
    )
}