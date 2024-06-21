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

export default function Experience({ uvo, handleCareerlistChange }) {
  const [p_career, setP_career] = React.useState([]);

  React.useEffect(() => {
    if (uvo.p_career) {
      setP_career(uvo.p_career.split(','));
    } else {
      setP_career([]);
    }
  }, [uvo.p_career]);

  const handleChange = (event) => {
    const { value } = event.target;
    setP_career(value);
    handleCareerlistChange(value); // 맨 앞의 쉼표 제거 후 전달
  };

  return (
    <FormControl sx={{ m: 0, width: 683.5 }}>
      <InputLabel id="demo-multiple-name-label">경력을 선택하세요</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={p_career}
        onChange={handleChange}
        input={<OutlinedInput label="p_career" />}
        MenuProps={MenuProps}
      >
        {experience.map((k) => (
          <MenuItem key={k} value={k}>
            {k}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
