"use client"
import { useContext, useEffect, useState } from 'react'; // React import 추가
import axios from 'axios'; // axios import 추가
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination'; // Material-UI Pagination 컴포넌트 추가
import { Table, TableHead } from '@mui/material';
import './inquiry.css';
import { MenuContext } from '@/stores/StoreContext';

// 테이블을 렌더링하는 컴포넌트
export default function CustomPaginationActionsTable() {
  const menuStore = useContext(MenuContext);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [rowsPerPage] = useState(5); // 페이지당 행 수 (고정)

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get("/mypage/inquiry");
      menuStore.setInquiryList(response.data);
      console.log("데이터오나?",response.data);
    } catch (error) {
      alert("데이터를 불러오는 데 실패했습니다.");
      console.error(error);
    }
  };
  

  // 전체 데이터에서 현재 페이지에 보여줄 데이터 계산
  const rows = menuStore.inquiryList || []; // inquiryList가 없을 경우를 대비하여 기본값 설정
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  // 전체 페이지 수 계산
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  // 페이지 변경 시 호출되는 함수
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer sx={{ width: 600 }} className='tablewrap'>
      <Table sx={{ minWidth: 500 }}>
        <TableHead sx={{ borderBottom: '3px solid blue' }}>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Context</TableCell>
            <TableCell>User Index</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 현재 페이지에 보여줄 데이터를 매핑하여 출력 */}
          {displayedRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell sx={{ width: '100px' }}>{row.subject}</TableCell>
              <TableCell sx={{ width: '100px' }}>{row.context}</TableCell>
              <TableCell sx={{ width: '100px' }}>{row.u_idx}</TableCell>
            </TableRow>
          ))}
          {/* 페이지가 고정된 행 수 미만이면 빈 행으로 채움 */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        {/* 페이지네이션 컴포넌트 */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} align="center"  sx={{ border: 0 }}>
              <Pagination
                count={pageCount} // 전체 페이지 수 계산
                page={page} // 현재 페이지 인덱스 (0부터 시작)
                color="primary"
                onChange={handleChangePage} // 페이지 변경 이벤트 핸들러
                size="large" // 페이지네이션 크기 설정
                className='pagination'
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
