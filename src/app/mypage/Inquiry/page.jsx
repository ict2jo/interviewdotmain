"use client";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Button, Table, TableHead } from '@mui/material';
import './inquiry.css';
import { MenuContext } from '@/stores/StoreContext';

export default function Inquiry() {
  const menuStore = useContext(MenuContext);
  const [page, setPage] = useState(1); // Current page state
  const [rowsPerPage] = useState(5); // Rows per page (fixed)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/mypage/inquiry");
      menuStore.setInquiryList(response.data);
      localStorage.setItem('inquiryList', JSON.stringify(response.data)); // Update local storage
      console.log("Data loaded successfully:", response.data);
    } catch (error) {
      alert("Failed to load data.");
      console.error(error);
    }
  };

  // Calculate the index dynamically based on current page and rows per page
  const calculateIndex = (pageIndex, rowIndex) => {
    return (pageIndex - 1) * rowsPerPage + rowIndex + 1;
  };

  // Pagination logic
  const rows = menuStore.inquiryList || []; // Inquiry list
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
  const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
  const pageCount = Math.ceil(rows.length / rowsPerPage); // Total pages

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle menu click
  const handleMenuClick = async (menu) => {
    menuStore.setSelectedMenu(menu);
  };

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
              <TableCell sx={{ width: '100px' }}>{row.i_subject}</TableCell>
              <TableCell sx={{ width: '100px' }}>{row.i_content}</TableCell>
              <TableCell sx={{ width: '100px' }}>{row.u_idx}</TableCell>
            </TableRow>
          ))}
          {/* Empty rows */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        {/* Pagination */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} align="center"  sx={{ border: 0 }}>
              <Pagination
                count={pageCount} // Total pages
                page={page} // Current page index (1-based)
                color="primary"
                onChange={handleChangePage} // Page change handler
                size="large" // Pagination size
                className='pagination'
              />
              {/* Write button */}
              <Button variant='contained' onClick={() => handleMenuClick("inquirywrite")}>Write</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
