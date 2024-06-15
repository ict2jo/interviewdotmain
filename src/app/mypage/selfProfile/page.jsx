"use client"
import Header from '@/app/_components/Header';
import * as React from 'react';
import './selfprofile.css';
import { Button, Input, Typography } from '@mui/material';
import Worklist from './worklist/page';
import Schoollist from './school/page';
import Local from './local/page';
import Experience from './experience/page';


export default function Selfprofile() {
    return(
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
                <div className='inputs'>
                <Input fullWidth="true" placeholder="이름을 입력하세요"/>
                <Input fullWidth="true" placeholder="번호를 입력하세요"/>
                <Input fullWidth="true" placeholder="이메일을 입력하세요"/>
                </div>
                </div>
                <hr />
                <Typography className='bluetext'>관심분야</Typography>
                <div className='mypagebottum'>
                <p className='mysmallfont'>업종</p>
                <Worklist />
                <p className='mysmallfont'>학력</p>
                <Schoollist />
                <p className='mysmallfont'>경력</p>
                <Experience />
                <p className='mysmallfont'>지역</p>
                <Local />
                <div className='mybut'>
                <Button variant="outlined">뒤로가기</Button>
                <Button variant="contained">수정완료</Button>
                </div>
                </div>
            </div>
        </div>
    )
}