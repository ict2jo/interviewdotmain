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
      width: 250,
    },
  },
};

const schoollist = [
  '학력무관',
  '중졸이하',
  '고졸',
  '대졸(2~3년)',
  '대졸(4년)',
  '석사',
  '박사',
];

export default function Schoollist2({ handleSchoollistChange }) {
  const [classInfo, setClassInfo] = React.useState([]);



  const handleChange = (event) => {
    const { value } = event.target;
    setClassInfo(value);
    handleSchoollistChange(value.join(',').replace(/^,/, '')); 
  };

  return (
    <FormControl sx={{ m: 0, width: 450 }}>
      <InputLabel id="demo-multiple-name-label">학력을 선택하세요</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={classInfo}
        onChange={handleChange}
        input={<OutlinedInput label="classInfo" />}
        MenuProps={MenuProps}
      >
        {schoollist.map((k) => (
          <MenuItem key={k} value={k}>
            {k}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
