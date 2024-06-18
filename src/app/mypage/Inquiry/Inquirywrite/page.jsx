import { useContext, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, TextField } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';

const Inquirywrite = observer(() => {
  const menuStore = useContext(MenuContext);
  const API_URL = '/mypage/inquirywrite';
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
  });

  async function write() {
    try {
      const response = await axios.post(API_URL, ivo);
      console.log('작성 완료:', response.data);
      menuStore.setSelectedMenu('inquiry');
    } catch (error) {
      alert("작성 실패");
      console.error(error); // 에러 출력
    }
  }

  function changeIvo(e) {
    setIvo({
      ...ivo,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <FormControl>
        <TextField type='text' label="Subject" name='i_subject' value={ivo.i_subject} onChange={changeIvo}></TextField>
        <TextField type='text' label="Content" name='i_content' value={ivo.i_content} onChange={changeIvo}></TextField>
        <Button variant='contained' onClick={write}>작성완료</Button>
      </FormControl>
    </>
  );
});

export default Inquirywrite;
