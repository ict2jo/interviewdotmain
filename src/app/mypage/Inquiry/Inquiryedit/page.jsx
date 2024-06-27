"use client";

import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CircularProgress, FormControl, TextField } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';

const Inquiryedit = observer(({ }) => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const API_URL = `/mypage/inquiryedit`;
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const id = searchParams.get('id');
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
    i_idx: id // id를 초기값으로 설정합니다.
  });
  const fetchData = () => {
    axios.get(`/mypage/inquirydetail?i_idx=${id}`).then((data)=>{
      console.log(data.data)
      setIvo(data.data[0]);
      //setLoading(false);
    })
    .catch((error) => {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      //setLoading(false);
    });
};
  // if (loading) {
  //   return <CircularProgress />;
  // }
useEffect(() => {
  fetchData();
  console.log(ivo)
}, [id]); // id가 변경될 때마다 데이터를 다시 가져옵니다.

  async function edit() {
    try {
      const response = await axios.post(API_URL, ivo);
      console.log('수정 완료:', response.data);
      router.push(`/Inquirydetail/i_idx=${ivo.i_idx}?id=${ivo.i_idx}`);
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
    <Header />
      <FormControl>
        <TextField type='text' label="Subject" name='i_subject' value={ivo.i_subject} onChange={changeIvo}></TextField>
        <TextField type='text' label="Content" name='i_content' value={ivo.i_content} onChange={changeIvo}></TextField>
        <Button variant='contained' onClick={edit}>수정완료</Button>
        <Button variant='outlined' onClick={() => {handleMenuClick("inquiry"); router.push("/");}}>목록으로</Button>
      </FormControl>
    <Footer />
    </>

  );
});

export default Inquiryedit;
