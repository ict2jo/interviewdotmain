"use client"

import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import './select.css'
import Header from "@/app/_components/Header";

export default function Select() {
    // 유형 하나만 선택 가능, 아무곳이나 눌러도 체크 가능
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);

    const handleCheckboxChange = (index) => {
        setSelectedCheckbox(index);
    };

    const CustomCheckbox = ({ index }) => {
        const isChecked = selectedCheckbox === index;

        return (
            <div className="custom_checkbox">
                <Checkbox checked={isChecked} />
            </div>
        );
    };


    

    return(
        <div className="container">
            <h1>면접 유형을 선택하세요.</h1>
            <p>총 10개 질문을 연습할 수 있습니다.</p>

        <div className="checkbox_container">
            <div className={`selectBox ${selectedCheckbox === 1 ? 'checkedBox' : ''}`} onClick={() => handleCheckboxChange(1)}>
                <table className="select_table">
                <colgroup>
                    <col style={{width: "50%"}} />
                </colgroup>
                    <tbody>
                        <tr><th><CustomCheckbox index={1} /></th></tr>
                        <tr><th colspan="2">맞춤형</th></tr>
                        <tr><td style={{paddingBottom: "25px"}} colspan="2">원하는 질문을 선택하여 <br /> 진행합니다.</td></tr>
                        <tr style={{borderTop: "1px solid gray"}}>
                            <td style={{borderRight: "1px solid gray"}}>답변방식 <br /> 말하기/타이핑</td><td>답변시간 <br /> 3분</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className={`selectBox ${selectedCheckbox === 2 ? 'checkedBox' : ''}`} onClick={() => handleCheckboxChange(2)}>
                <table className="select_table">
                    <tbody>
                        <tr><th><CustomCheckbox index={2} /></th></tr>
                        <tr><th colspan="2">실전형</th></tr>
                        <tr><td style={{paddingBottom: "25px"}} colspan="2">빈출 질문을 랜덤으로 <br /> 진행합니다.</td></tr>
                        <tr style={{borderTop: "1px solid gray"}}>
                            <td style={{borderRight: "1px solid gray"}}>답변방식 <br /> 말하기</td><td>답변시간 <br /> 1분</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Button variant="outlined">뒤로가기</Button>
        <Button variant="contained">확인</Button>
        </div>
    )
}