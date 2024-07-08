"use client"; // 클라이언트 컴포넌트로 설정

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Button, CircularProgress, Table, TableHead } from '@mui/material';
import './inquiry.css';
import { MenuContext } from '@/stores/StoreContext';
import { useRouter } from 'next/navigation'; // next/router 대신 next/navigation 사용
import authStore from '@/stores/AuthStore';
import Link from 'next/link';
import userStore from "@/stores/UserStore";

export default function Inquiry() {
  const menuStore = useContext(MenuContext);
  const [page, setPage] = useState(1); // Current page state
  const [rowsPerPage] = useState(7); // Rows per page (fixed)
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/mypage/inquiry?id=${userStore.id}`);
      menuStore.setInquiryList(response.data);
      console.log("menuStore.inquiryList:", menuStore.inquiryList);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      alert("Failed to load data.");
      console.error(error);
      setLoading(false); // Handle loading state in case of error
    }
  };

  // Calculate the index dynamically based on current page and rows per page
  const calculateIndex = (pageIndex, rowIndex) => {
    return (pageIndex - 1) * rowsPerPage + rowIndex + 1;
  };
  const router = useRouter();

  const rows = menuStore.inquiryList || []; 
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
  const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
  const pageCount = Math.ceil(rows.length / rowsPerPage); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle menu click
  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  // Show loading indicator if data is still loading
  if (loading) {
    return <CircularProgress className="loading-spinner" />;
  }

  return (
    <TableContainer sx={{ width: 1000 }} className='tablewrap'>
      <h1>1:1문의</h1>
      <Table sx={{ minWidth: 600 }}>
        <TableHead sx={{ borderBottom: '3px solid blue' }}>
          <TableRow>
            <TableCell sx={{ width: '100px', textAlign:'center'}}>No</TableCell>
            <TableCell sx={{ width: '200px', textAlign:'center' }}>제목</TableCell>
            <TableCell sx={{ width: '200px', textAlign:'center' }}>내용</TableCell>
            <TableCell sx={{ width: '100px', textAlign:'center' }}>답변</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row, index) => (
            <TableRow key={row.i_idx}>
            <TableCell sx={{ width: '100px', textAlign:'center'}}>
              {calculateIndex(page, index)}
            </TableCell>
            <TableCell sx={{ width: '200px', textAlign:'center' }}
            onClick={() => handleMenuClick(`inquirydetail/${row.i_idx}`)}>
                <p className="ellipsis-cell">{row.i_subject}</p>
            </TableCell>
            <TableCell sx={{ width: '200px', textAlign:'center' }}
            onClick={() => handleMenuClick(`inquirydetail/${row.i_idx}`)}>
            <p className="ellipsis-cell">{row.i_content}</p>
            </TableCell>
            <TableCell sx={{ width: '100px', textAlign:'center' }}>
            {row.i_active === '0' ? '답변대기중' : '답변완료'}
            </TableCell>
          </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        {/* Pagination */}
        <TableFooter>
  <TableRow>
    <TableCell colSpan={4} sx={{ border: 0, textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={pageCount}
          page={page} 
          color="primary"
          onChange={handleChangePage} 
          size="large"
          className='pagination'
          style={{ marginLeft: 'auto',marginRight: 'auto' }}
        />
        <Button variant='contained' onClick={() => handleMenuClick("inquirywrite")}>Write</Button>
      </div>
    </TableCell>
  </TableRow>
</TableFooter>
      </Table>
    </TableContainer>
  );
}
