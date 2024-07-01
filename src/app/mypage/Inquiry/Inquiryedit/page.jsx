"use client";

import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CircularProgress, FormControl, TextField } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import './inquiryedit.css';
import userStore from "@/stores/UserStore";


const Inquiryedit = observer(({i_idx}) => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const API_URL = `/mypage/inquiryedit`;
  const [loading, setLoading] = useState(true);
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
    id: userStore.id,
    i_idx:i_idx
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`/mypage/inquirydetail?i_idx=${i_idx}`);
      console.log(response.data);
      setIvo(response.data[0]);
      setLoading(false);
    } catch (error) {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      setLoading(false);
    }
  };
  
useEffect(() => {
  fetchData();
  console.log(ivo)
}, [i_idx]); // id가 변경될 때마다 데이터를 다시 가져옵니다.

  async function edit() {
    try {
      const response = await axios.post(API_URL, ivo);
      alert('수정 완료:', response.data);
      menuStore.setSelectedMenu(`inquirydetail/${i_idx}`);
    } catch (error) {
      alert("작성 실패");
      console.error(error); // 에러 출력
    }
  }
  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  function changeIvo(e) {
    setIvo({
      ...ivo,
      [e.target.name]: e.target.value
    });
  }
  const renderContent = () => {
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <FormControl className="inquirydetailcontainer">
      <h1>1:1문의 내역</h1>
      <div className='inquirydetailbox'>
          <div className='inquirytitlebox'>
          <div className='bluebox'></div>
        <TextField
          multiline
          rows={1} // 원하는 높이로 설정할 수 있습니다.
          variant='standard'
          label="Subject"
          name='i_subject'
          value={ivo.i_subject}
          onChange={changeIvo}
          fullWidth // 가로 전체 크기로 설정합니다.
          style={{ marginBottom: '1rem', background: '#ffffff' }} // 필요한 경우 여백을 추가할 수 있습니다.
        />
        </div>
          <div className='inquirytextbox'>
          <div className='bluebox'></div>
        <TextField
          multiline
          rows={11} // 원하는 높이로 설정할 수 있습니다.
          variant='standard'
          label="Content"
          name='i_content'
          value={ivo.i_content}
          onChange={changeIvo}
          fullWidth // 가로 전체 크기로 설정합니다.
          style={{ marginBottom: '1rem' , background: '#ffffff'}} // 필요한 경우 여백을 추가할 수 있습니다.
        /></div>
          <div className='inquirybut'>
        <Button variant='contained' onClick={edit}>수정완료</Button>
        <Button variant='outlined' onClick={() => { handleMenuClick("inquiry");}}>목록으로</Button>
        </div>
        </div>
        </FormControl>
    </>

  );
}
return (
  <>
    {renderContent()}
  </>
);
});

export default Inquiryedit;
