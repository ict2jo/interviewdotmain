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
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('Management')}>Management</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('SalesMarketing')}>SalesMarketing</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('PublicService')}>PublicService</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('RND')}>RND</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('Design')}>Design</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('ICT')}>ICT</Button>
                <Button variant="outlined" className="choose_button" onClick={() => handleClick('ProductionManufacturing')}>ProductionManufacturing</Button>
        </div>
        </div>
    )
}