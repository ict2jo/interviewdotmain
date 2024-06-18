"use client"; // Next.js에서 클라이언트 컴포넌트로 인식하도록 설정

import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination'; // Material-UI Pagination 컴포넌트 추가
import { Table, TableHead } from '@mui/material';
import './inquiry.css';
// 데이터 생성 함수 정의
function createData(name, calories, fat) {
  return { name, calories, fat };
}

// 샘플 데이터
const rows = [
  createData('컵케이크', 305, 3.7),
  createData('도넛', 452, 25.0),
  createData('에클레어', 262, 16.0),
  createData('프로즌 요거트', 159, 6.0),
  createData('진저브레드', 356, 16.0),
  createData('허니콤', 408, 3.2),
  createData('아이스크림 샌드위치', 237, 9.0),
  createData('젤리 빈', 375, 0.0),
  createData('킷캣', 518, 26.0),
  createData('롤리팝', 392, 0.2),
  createData('마시멜로', 318, 0),
  createData('누가', 360, 19.0),
  createData('오레오', 437, 18.0),
  createData('킷캣', 518, 26.0),
  createData('롤리팝', 392, 0.2),
  createData('마시멜로', 318, 0),
  createData('누가', 360, 19.0),
  createData('오레오', 437, 18.0)
];

// 테이블을 렌더링하는 컴포넌트
export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(1); // 현재 페이지 상태
  const [rowsPerPage] = React.useState(5); // 페이지당 행 수 (고정)

  // 전체 데이터에서 현재 페이지에 보여줄 데이터 계산
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
                <TableCell>name</TableCell>
                <TableCell>calories</TableCell>
                <TableCell>fat</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {/* 현재 페이지에 보여줄 데이터를 매핑하여 출력 */}
            {displayedRows.map((row) => (
                <TableRow key={row.name}>
                    <TableCell sx={{ width: '100px' }}>{row.name}</TableCell>
                    <TableCell sx={{ width: '100px' }}>{row.calories}</TableCell>
                    <TableCell sx={{ width: '100px' }}>{row.fat}</TableCell>

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
                className='pagenation'
                />
                </TableCell>
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    );
    }
