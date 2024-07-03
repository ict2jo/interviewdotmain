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

const schoollist = [
  '학력무관',
  '중졸이하',
  '고졸',
  '대졸(2~3년)',
  '대졸(4년)',
  '석사',
  '박사',
];

export default function Schoollist({ uvo, handleSchoollistChange }) {
  const [p_class, setP_class] = React.useState([]);

  React.useEffect(() => {
    if (uvo.p_class) {
      setP_class(uvo.p_class.split(','));
    } else {
      setP_class([]);
    }
  }, [uvo.p_class]);

  const handleChange = (event) => {
    const { value } = event.target;
    setP_class(value);
    handleSchoollistChange(value.join(',').replace(/^,/, '')); 
  };

  return (
    <FormControl sx={{ m: 0, width: 683.5 }}>
      <InputLabel id="demo-multiple-name-label">학력을 선택하세요</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={p_class}
        onChange={handleChange}
        input={<OutlinedInput label="p_class" />}
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
