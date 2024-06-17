"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 350,
    },
},
};

const worklist = [
'사업관리',
'경영.회계.사무',
'금융.보험',
'교육.자연.사회과학',
'법률.경찰.소방.교도.국방',
'보건.의료',
'사회복지.종교',
'문화.예술.디자인.방송',
'운전.운송',
'영업판매',
];
export default function Worklist() {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        typeof value === 'string' ? value.split(',') : value,
        );
    };
return(
    <FormControl sx={{ m: 0, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">업종을 선택하세요</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="업종을 선택하세요" />}
                    MenuProps={MenuProps}
                    >
                    {worklist.map((worklist) => (
                        <MenuItem
                        key={worklist}
                        value={worklist}
                        >
                        {worklist}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
)
}