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

export default function Worklist({ uvo, handleWorklistChange }) {
    const [p_job, setP_job] = React.useState([]);

    // 페이지 로드 시 uvo.p_job 값을 기본 선택 값으로 설정
    React.useEffect(() => {
        setP_job(uvo.p_job ? uvo.p_job.split(',') : []); // 초기 값 설정을 수정
    }, [uvo.p_job]);

    const handleChange = (event) => {
        const { value } = event.target;

        // 여러 개의 선택 항목을 배열로 설정하고, 값을 쉼표로 구분된 문자열로 변환하여 부모 컴포넌트에 전달
        setP_job(value);
        handleWorklistChange(value.join(','));
    };

    return (
        <FormControl sx={{ m: 0, width: 683.5 }}>
            <InputLabel id="demo-multiple-name-label">업종을 선택하세요</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={p_job}
                onChange={handleChange}
                input={<OutlinedInput label="p_job" />}
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
