"use client"

import {Button} from "@mui/material";
import React, {useState} from "react";
import './choose.css';
import {useRouter} from "next/navigation";

export default function Choose(){
    const router = useRouter();

    const handleClick = (category) =>{
        router.push(`question?category=${category}`);
    }

    return(
        <div className="container">
            <h1>직업군을 선택해주세요.</h1>
            <div className="button_container">
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('MM')}>경영사무</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('SM')}>영업마케팅</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('PS')}>공공서비스</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('RND')}>연구개발 </Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('ARD')}>디자인</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('ICT')}>정보통신</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('BM')}>생산관리</Button>
        </div>
        </div>
    )
}