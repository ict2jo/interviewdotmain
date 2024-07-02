"use client"

import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import './select.css'

export default function Select() {
    // 유형 하나만 선택 가능, 아무곳이나 눌러도 체크 가능
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [category, setCategory] = useState("");

    const handleCheckboxChange = (index) => {
        setSelectedCheckbox(index);
        if (index === 2) {
            setCategory("실전형");
        } else {
            setCategory("");
        }
    };

    const CustomCheckbox = ({ index }) => {
        const isChecked = selectedCheckbox === index;

        return (
            <div className="custom_checkbox">
                <Checkbox checked={isChecked} />
            </div>
        );
    };

    const handleConfirm = () => {
        if (selectedCheckbox === 1) {
            window.location.href = '/interview/choose';
        } else if (selectedCheckbox === 2) {
            window.location.href = '/interview/choose';
            localStorage.setItem("rand", category);
        } else if (selectedCheckbox === 3){
            window.location.href = '/interview/history'
        }
    };

    const handleClose = () => {
        if(confirm("면접 연습을 종료하시겠습니까? \n 만약 종료 하시게 된다면 환불은 불가능합니다."))
        window.close();
    };

    return (
        <div className="container">
            <h1>면접 유형을 선택하세요.</h1>
            <p>총 3개 질문을 연습할 수 있습니다.</p>

            <div className="checkbox_container">
                <div className={`selectBox ${selectedCheckbox === 1 ? 'checkedBox' : ''}`}
                     onClick={() => handleCheckboxChange(1)}>
                    <table className="select_table">
                        <colgroup>
                            <col style={{width: "50%"}}/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th><CustomCheckbox index={1}/></th>
                        </tr>
                        <tr>
                            <th colSpan="2">맞춤형</th>
                        </tr>
                        <tr>
                            <td style={{paddingBottom: "25px"}} colSpan="2">원하는 질문을 선택하여 <br/> 진행합니다.</td>
                        </tr>
                        <tr style={{borderTop: "1px solid gray"}}>
                            <td style={{borderRight: "1px solid gray"}}>답변방식 <br/> 말하기</td>
                            <td>답변시간 <br/>1분</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className={`selectBox ${selectedCheckbox === 2 ? 'checkedBox' : ''}`}
                     onClick={() => handleCheckboxChange(2)}>
                    <table className="select_table">
                        <tbody>
                        <tr>
                            <th><CustomCheckbox index={2}/></th>
                        </tr>
                        <tr>
                            <th colSpan="2">실전형</th>
                        </tr>
                        <tr>
                            <td style={{paddingBottom: "25px"}} colSpan="2">빈출 질문을 랜덤으로 <br/> 진행합니다.</td>
                        </tr>
                        <tr style={{borderTop: "1px solid gray"}}>
                            <td style={{borderRight: "1px solid gray"}}>답변방식 <br/> 말하기</td>
                            <td>답변시간 <br/>1분</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className={`selectBox ${selectedCheckbox === 3 ? 'checkedBox' : ''}`}
                     onClick={() => handleCheckboxChange(3)}>
                    <table className="select_table">
                        <tbody>
                        <tr>
                            <th><CustomCheckbox index={3}/></th>
                        </tr>
                        <tr>
                            <th colSpan="2">면접 기록 불러오기</th>
                        </tr>
                        <tr>
                            <td style={{paddingBottom: "25px"}} colSpan="2">면접기록에 저장되어있는 질문을 <br/> 불러옵니다.</td>
                        </tr>
                        <tr style={{borderTop: "1px solid gray"}}>
                            <td style={{borderRight: "1px solid gray"}}>답변방식 <br/> 말하기</td>
                            <td>답변시간 <br/>1분</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Button variant="outlined" onClick={handleClose}>뒤로가기</Button>
            <Button variant="contained" onClick={handleConfirm}>확인</Button>
        </div>
    )
}
