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

const local = [
  '서울', '인천', '대전',
  '대구', '부산', '광주', '울산',
  '경기', '강원', '충남', '충북', '경북', '경남', '전남',
  '전북', '제주', '세종', '해외',
];

export default function Local2({location, handleLocationlistChange }) {
  const [selectedLocation, setSelectedLocation] = React.useState([]);

  useEffect(() => {
    if (location) {
      setSelectedLocation(location.split(','));
    }
  }, [location]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLocation(value);
    handleLocationlistChange(value.join(',').replace(/^,/, ''));
  };

  return (
    <FormControl sx={{ m: 0, width: 450 }}>
      <InputLabel id="demo-multiple-name-label">지역을 선택하세요</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="local-select"
        multiple
        value={selectedLocation}
        onChange={handleChange}
        input={<OutlinedInput label="location" />}
        MenuProps={MenuProps}
      >
        {local.map((k) => (
          <MenuItem key={k} value={k}>
            {k}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
