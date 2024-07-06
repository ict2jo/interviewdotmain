import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';

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

const experience = [
  '신입',
  '경력',
  '신입+경력',
  '외국인 전형',
];

export default function Experience2({ uvo, handleCareerlistChange }) {
  const [p_career, setP_career] = React.useState([]);
  React.useEffect(() => {
    if (uvo.p_career) {
      setP_career(uvo.p_career.split(','));
    } else {
      setP_career([]);
    }
  }, [uvo.p_class]);

  const handleChange = (event) => {
    const { value } = event.target;
    setP_career(value);
    handleCareerlistChange(value.join(',').replace(/^,/, '')); 
  };

  return (
    <FormControl sx={{ m: 0, width: 450 }}>
      <InputLabel id="experience-label">경력을 선택하세요</InputLabel>
      <Select
        labelId="experience-label"
        id="experience-select"
        value={p_career}
        multiple
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
