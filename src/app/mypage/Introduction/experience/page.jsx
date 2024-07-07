import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
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

const experience = [
  '신입',
  '경력',
  '신입+경력',
  '외국인 전형',
];

export default function Experience2({ career, handleCareerlistChange }) {
  const [selectedCareer, setSelectedCareer] = React.useState([]);;

  useEffect(() => {
    if (career) {
      setSelectedCareer(career.split(','));
    }
  }, [career]);


  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedCareer(value);
    handleCareerlistChange(value.join(',').replace(/^,/, ''));
  };

  return (
    <FormControl sx={{ m: 0, width: 450 }}>
      <InputLabel id="experience-label">경력을 선택하세요</InputLabel>
      <Select
        labelId="experience-label"
        id="experience-select"
        value={selectedCareer}
        multiple
        onChange={handleChange}
        input={<OutlinedInput label="career" />}
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
