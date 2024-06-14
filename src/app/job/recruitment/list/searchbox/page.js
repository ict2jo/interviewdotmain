"use client"

import { Box, Divider, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import './searchbox.css';

export default function Searchbox({workRgnLst, handleRadioChange, recrutSe, acbgCondLst}){
    return(
        <Box className="searchmenu">
        <Grid container spacing={2}>
        <Grid item xs={3} className="itemheader">
            학력 조건
        </Grid>
        <Grid item xs={3} className="itemheader">
            고용 유형
        </Grid>
        <Grid item xs={6} className="itemheader">
            근무지
        </Grid>
        <Grid item xs={3} className="itembody">
            <div className="select1">
                <input type="radio" id="acbgCondNmLst1" name="acbgCondLst" value="R7010" checked={"acbgCondLst" === "R7010"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst1"className={acbgCondLst === "R7010" ? "active-label" : ""}>학력무관</label>
                <input type="radio" id="acbgCondNmLst2" name="acbgCondLst" value="R7020" checked={"acbgCondLst" === "R7020"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst2"className={acbgCondLst === "R7020" ? "active-label" : ""}>중졸이하</label>
                <input type="radio" id="acbgCondNmLst3" name="acbgCondLst" value="R7030" checked={"acbgCondLst" === "R7030"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst3"className={acbgCondLst === "R7030" ? "active-label" : ""}>고졸</label>
                <input type="radio" id="acbgCondNmLst4" name="acbgCondLst" value="R7040" checked={"acbgCondLst" === "R7040"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst4"className={acbgCondLst === "R7040" ? "active-label" : ""}>대졸(2~3년)</label>
                <input type="radio" id="acbgCondNmLst5" name="acbgCondLst" value="R7050" checked={"acbgCondLst" === "R7050"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst5"className={acbgCondLst === "R7050" ? "active-label" : ""}>대졸(4년)</label>
                <input type="radio" id="acbgCondNmLst6" name="acbgCondLst" value="R7060" checked={"acbgCondLst" === "R7060"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst6"className={acbgCondLst === "R7060" ? "active-label" : ""}>석사</label>
                <input type="radio" id="acbgCondNmLst7" name="acbgCondLst" value="R7070" checked={"acbgCondLst" === "R7070"} onChange={handleRadioChange} />
                <label htmlFor="acbgCondNmLst7"className={acbgCondLst === "R7070" ? "active-label" : ""}>박사</label>
            </div>
        </Grid>
        <Grid item xs={3} className="itembody">
            <div className="select1">
                <input type="radio" id="recrutSeNm1" name="recrutSe" value="R2010" checked={"recrutSe" === "R2010"} onChange={handleRadioChange} />
                <label htmlFor="recrutSeNm1"className={recrutSe === "R2010" ? "active-label" : ""}>신입</label>
                <input type="radio" id="recrutSeNm2" name="recrutSe" value="R2020" checked={"recrutSe" === "R2020"} onChange={handleRadioChange} />
                <label htmlFor="recrutSeNm2"className={recrutSe === "R2020" ? "active-label" : ""}>경력</label>
                <input type="radio" id="recrutSeNm3" name="recrutSe" value="R2030" checked={"recrutSe" === "R2030"} onChange={handleRadioChange} />
                <label htmlFor="recrutSeNm3"className={recrutSe === "R2030" ? "active-label" : ""}>신입+경력</label>
                <input type="radio" id="recrutSeNm4" name="recrutSe" value="R2040" checked={"recrutSe" === "R2040"} onChange={handleRadioChange} />
                <label htmlFor="recrutSeNm4"className={recrutSe === "R2040" ? "active-label" : ""}>외국인</label>
            </div>
            </Grid>
            <Grid item xs={6} className="itembody">
                <div className="select2">
                    <input type="radio" id="workRgnNmLst1" name="workRgnLst" value="R3010"  checked={"workRgnLst" === "R3010"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst1"className={workRgnLst === "R3010" ? "active-label" : ""}>서울</label>
                    <input type="radio" id="workRgnNmLst2" name="workRgnLst" value="R3011"  checked={"workRgnLst" === "R3011"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst2"className={workRgnLst === "R3011" ? "active-label" : ""}>인천</label>
                    <input type="radio" id="workRgnNmLst3" name="workRgnLst" value="R3012"  checked={"workRgnLst" === "R3012"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst3"className={workRgnLst === "R3012" ? "active-label" : ""}>대전</label>
                    <input type="radio" id="workRgnNmLst4" name="workRgnLst" value="R3013"  checked={"workRgnLst" === "R3013"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst4"className={workRgnLst === "R3013" ? "active-label" : ""}>대구</label>
                    <input type="radio" id="workRgnNmLst5" name="workRgnLst" value="R3014"  checked={"workRgnLst" === "R3014"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst5"className={workRgnLst === "R3014" ? "active-label" : ""}>부산</label>
                    <input type="radio" id="workRgnNmLst6" name="workRgnLst" value="R3015"  checked={"workRgnLst" === "R3015"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst6"className={workRgnLst === "R3015" ? "active-label" : ""}>광주</label>
                    <input type="radio" id="workRgnNmLst7" name="workRgnLst" value="R3016"  checked={"workRgnLst" === "R3016"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst7"className={workRgnLst === "R3016" ? "active-label" : ""}>광주</label>
                    <input type="radio" id="workRgnNmLst8" name="workRgnLst" value="R3017"  checked={"workRgnLst" === "R3017"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst8"className={workRgnLst === "R3017" ? "active-label" : ""}>경기</label>
                    <input type="radio" id="workRgnNmLst9" name="workRgnLst" value="R3018"  checked={"workRgnLst" === "R3018"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst9"className={workRgnLst === "R3018" ? "active-label" : ""}>강원</label>
                    <input type="radio" id="workRgnNmLst10" name="workRgnLst" value="R3019"  checked={"workRgnLst" === "R3019"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst10"className={workRgnLst === "R3019" ? "active-label" : ""}>충남</label>
                    <input type="radio" id="workRgnNmLst11" name="workRgnLst" value="R3020"  checked={"workRgnLst" === "R3020"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst11"className={workRgnLst === "R3020" ? "active-label" : ""}>충북</label>
                    <input type="radio" id="workRgnNmLst12" name="workRgnLst" value="R3021"  checked={"workRgnLst" === "R3021"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst12"className={workRgnLst === "R3021" ? "active-label" : ""}>경북</label>
                    <input type="radio" id="workRgnNmLst13" name="workRgnLst" value="R3022"  checked={"workRgnLst" === "R3022"} onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst13"className={workRgnLst === "R3022" ? "active-label" : ""}>경남</label>
                    <input type="radio" id="workRgnNmLst14" name="workRgnLst" value="R3023" checked={"workRgnLst" === "R3023"}  onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst14"className={workRgnLst === "R3023" ? "active-label" : ""}>전남</label>
                    <input type="radio" id="workRgnNmLst15" name="workRgnLst" value="R3024" checked={"workRgnLst" === "R3024"}  onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst15"className={workRgnLst === "R3024" ? "active-label" : ""}>전북</label>
                    <input type="radio" id="workRgnNmLst16" name="workRgnLst" value="R3025" checked={"workRgnLst" === "R3025"}  onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst16"className={workRgnLst === "R3025" ? "active-label" : ""}>제주</label>
                    <input type="radio" id="workRgnNmLst17" name="workRgnLst" value="R3026" checked={"workRgnLst" === "R3026"}  onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst17"className={workRgnLst === "R3026" ? "active-label" : ""}>세종</label>
                    <input type="radio" id="workRgnNmLst18" name="workRgnLst" value="R3030" checked={"workRgnLst" === "R3030"}  onChange={handleRadioChange} />
                    <label htmlFor="workRgnNmLst18"className={workRgnLst === "R3030" ? "active-label" : ""}>해외</label>
                </div>
            </Grid>
        </Grid>
    </Box>
    )
}