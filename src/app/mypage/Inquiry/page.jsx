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

export default function Inquiry() {
  const menuStore = useContext(MenuContext);
  const user = authStore.getUser();
  const [page, setPage] = useState(1); // Current page state
  const [rowsPerPage] = useState(5); // Rows per page (fixed)
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/mypage/inquiry?u_idx=${user.u_idx}`);
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

  // Pagination logic
  const rows = menuStore.inquiryList || []; // Initialize as empty array if inquiryList is undefined
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
  const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
  const pageCount = Math.ceil(rows.length / rowsPerPage); // Total pages

  const router = useRouter();

  // Handle page change
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
    <TableContainer sx={{ width: 600 }} className='tablewrap'>
      <Table sx={{ minWidth: 500 }}>
        <TableHead sx={{ borderBottom: '3px solid blue' }}>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>User Index</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map displayed rows and render */}
          {displayedRows.map((row, index) => (
            <TableRow key={row.i_idx}>
              <TableCell sx={{ width: '100px' }}>{calculateIndex(page, index)}</TableCell>
              <TableCell sx={{ width: '100px' }}><Link href={`/Inquirydetail/${row.i_idx}?id=${row.i_idx}`}>{row.i_subject}</Link></TableCell>
              <TableCell sx={{ width: '100px' }}>{row.i_content}</TableCell>
              <TableCell sx={{ width: '100px' }}>{row.u_idx}</TableCell>
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
            <TableCell colSpan={4} align="center" sx={{ border: 0 }}>
              <Pagination
                count={pageCount} // Total pages
                page={page} // Current page index (1-based)
                color="primary"
                onChange={handleChangePage} // Page change handler
                size="large" // Pagination size
                className='pagination'
              />
              <Button variant='contained' onClick={() => handleMenuClick("inquirywrite")}>Write</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
