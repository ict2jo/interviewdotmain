"use client";


import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import './inquirydetail.css';

const Inquirydetail = observer(() => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
    i_idx: id // id를 초기값으로 설정합니다.
  });
  
  const API_URL = `/mypage/inquirydetail?i_idx=${id}`;
  
  const fetchData = () => {
      axios.get(API_URL).then((data)=>{
        console.log(data.data)
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
  }, [id]); // id가 변경될 때마다 데이터를 다시 가져옵니다.

  const deleteInquiry = async () => {
    try {
      await axios.post(`/mypage/inquirydelete?i_idx=${ivo.i_idx}`);
      alert("문의가 삭제되었습니다.");
      menuStore.setSelectedMenu('inquiry');
      router.push("/");
    } catch (error) {
      alert("문의 삭제에 실패했습니다.");
      console.error("문의 삭제 중 오류가 발생했습니다:", error);
    }
  };

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  
  const handleEditClick = () => {
    router.push(`/mypage/Inquiry/Inquiryedit?id=${ivo.i_idx}`);
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
          <Button variant='contained' onClick={handleEditClick}>수정하기</Button>
          <Button variant='outlined' onClick={deleteInquiry}>삭제하기</Button>
          <Button variant='outlined' onClick={() => {handleMenuClick("inquiry"); router.push("/");}}>목록으로</Button>
          </div>
        </div>
        </FormControl>
        <Footer />
      </div>
    );
  };

  return (
    <>
      <Header />
      {renderContent()}
    </>
  );
});

export default Inquirydetail;
