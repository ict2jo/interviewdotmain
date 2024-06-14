import { Box } from "@mui/material";
import '../recruitmentlist.css';
export default function Center({acbgCondText, recrutSeText, workRgnText, searchQuery, handleSearchChange, totalItems, ongoingYn, handleOngoingYnChange}){
    return(
        <div>
            <Box className="selectedValues">
                <p className="selectedValuescjild">학력 조건: {acbgCondText}</p>
                <p className="selectedValuescjild">고용 유형: {recrutSeText}</p>
                <p className="selectedValuescjild">근무지: {workRgnText}</p>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="검색어 입력"
                />
            </Box>
            <div className="tatalcheck">
            <h2 className="totalItems">검색결과 {totalItems} 개</h2>
            <input type="checkbox"  className="ingselect" id="ongoingYn" name="ongoingYn" value="Y" checked={ongoingYn === "Y"} onChange={handleOngoingYnChange} />
            <label htmlFor="ongoingYn">채용중인 공고만 보기</label>
            </div>
        </div> 
    )
}