"use client";
import React, {useEffect, useState} from 'react';
import './finish.css'
import {Button} from "@mui/material";

export default function Finish(){
    return(
        <div class="container">
            <div class="white_box">
                <h1>면접 연습이 종료되었습니다.</h1>
                <Button variant="outlined" className="re_button">다시하기</Button>
                <Button variant="contained" className="check_button">피드백 확인하기</Button>
            </div>
        </div>
    )
}