"use client";


import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import Footer from '@/app/_components/Footer';
import './inquirydetail.css';
import userStore from "@/stores/UserStore";

const Inquirydetail= observer(({i_idx}) => {
  const menuStore = useContext(MenuContext);
  const [loading, setLoading] = useState(true);
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
    id: userStore.id,
    i_idx : i_idx
  });
  
  const API_URL = `/mypage/inquirydetail?i_idx=${i_idx}`;
  
  const fetchData = () => {
      axios.get(API_URL).then((data)=>{
        setIvo(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        alert("데이터를 가져오는 데 실패했습니다.");
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(ivo)
  }, [i_idx]); // id가 변경될 때마다 데이터를 다시 가져옵니다.

  const deleteInquiry = async () => {
    try {
      await axios.post(`/mypage/inquirydelete?i_idx=${ivo.i_idx}`);
      alert("문의가 삭제되었습니다.");
      menuStore.setSelectedMenu('inquiry');
    } catch (error) {
      alert("문의 삭제에 실패했습니다.");
      console.error("문의 삭제 중 오류가 발생했습니다:", error);
    }
  };

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }
    return (
      <div className=''>
        <FormControl className="inquirydetailcontainer">
        <h1>1:1문의 내역</h1>
        <div className='inquirydetailbox'>
          <div className='inquirytitlebox'>
          <div className='bluebox'></div>
          <Typography variant="h6" sx={{lineHeight: 2, marginLeft: 2}} gutterBottom>
            {ivo.i_subject}
          </Typography>
          </div>
          <div className='inquirytextbox'>
          <div className='bluebox'></div>
          <Typography variant="body1" sx={{lineHeight: 2, marginTop:2,marginLeft: 2,whiteSpace: 'pre-line' }} gutterBottom>
            {ivo.i_content}
          </Typography>
          </div>
          <div className='inquirybut'>
          <Button variant='contained' onClick={() => {handleMenuClick(`inquiryedit/${ivo.i_idx}`);}}>수정하기</Button>
          <Button variant='outlined' onClick={deleteInquiry}>삭제하기</Button>
          <Button variant='outlined' onClick={() => {handleMenuClick("inquiry");}}>목록으로</Button>
          </div>
        </div>
        </FormControl>
        <Footer />
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
});

export default Inquirydetail;
