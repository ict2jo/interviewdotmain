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

const experience = [
'신입',
'경력',
'신입+경력',
'외국인 전형',
];
export default function Experience() {
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
    <FormControl sx={{ m: 0, width: 683.5 }}>
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
                    {experience.map((experience) => (
                        <MenuItem
                        key={experience}
                        value={experience}
                        >
                        {experience}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
)
}