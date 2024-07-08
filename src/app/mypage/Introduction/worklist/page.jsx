"use client";

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect } from 'react';

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
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

export default function Worklist2({ job, handleWorklistChange }) {
    const [selectedJob, setSelectedJob] = React.useState([]);

    useEffect(() => {
        if (job) {
            setSelectedJob(job.split(','));
        }
    }, [job]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedJob(value);
        handleWorklistChange(value.join(','));
    };

    return (
        <FormControl sx={{ m: 0, width: 450 }}>
            <InputLabel id="demo-multiple-name-label">업종을 선택하세요</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedJob}
                onChange={handleChange}
                input={<OutlinedInput label="job" />}
                MenuProps={MenuProps}
            >
                {worklist.map((work) => (
                    <MenuItem key={work} value={work}>
                        {work}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
