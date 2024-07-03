import { useContext, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, TextField } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import './inquirywrite.css';
import Footer from '@/app/_components/Footer';
import userStore from '@/stores/UserStore';

const Inquirywrite = observer(() => {
  const menuStore = useContext(MenuContext);
  const API_URL = '/mypage/inquirywrite';
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
    id: userStore.id
  });
  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  async function write() {
    try {
      const response = await axios.post(API_URL, ivo);
      console.log('작성 완료:', response.data);
      menuStore.setSelectedMenu('inquiry');
      alert("문의 등록되었습니다. 등록하신 메일로 영업일 1~3일내 답변을 남겨드리겠습니다.");
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
    <div className=''>
    <FormControl className="inquirydetailcontainer">
    <h1 className='inqwrite'>1:1문의 작성</h1>
    <div className='inquirydetailbox'>
      <p className='inqwrite'>제목</p>
      <div className='inquirytitlebox'>
      <div className='bluebox'></div>
      <input className="inqwritefield" type='text' label="Subject" name='i_subject' value={ivo.i_subject} onChange={changeIvo}></input>
        </div>
          <p className='inqwrite'>내용</p>
          <div className='inquirytextbox'>
          <div className='bluebox'></div>
        <textarea className="inqwritefield2" type='text' label="Content" name='i_content' value={ivo.i_content} onChange={changeIvo}></textarea>
        </div>
          <div className='inquirybut'>
          <Button variant='contained' onClick={write}>작성완료</Button>
          <Button variant='outlined' onClick={() => {handleMenuClick("inquiry");}}>목록으로</Button>
          </div>
        </div>
        </FormControl>
        <Footer />
      </div>
  );
});

export default Inquirywrite;
