"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import './recruitmentlist.css';
import userStore from "@/stores/UserStore";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Pagination, Button } from "@mui/material";
import menuStore from "@/stores/MenuStore";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function Myrecruitment() {
    const [list, setList] = useState([]); // 채용공고 리스트 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [page, setPage] = useState(1); // 현재 페이지
    const rowsPerPage = 5; // 페이지 당 보여줄 항목 수
    const employKey = process.env.NEXT_PUBLIC_EMPOLY_KEY;
    const [uvo, setUvo] = useState({
        u_idx: userStore.u_idx,
        f_num: '', // 클릭한 recrutPblntSn이 들어갈 자리입니다.
    });
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 1. 사용자 정보를 먼저 로드합니다.
                await userStore.loadUserFromServer();

                // 2. 로드된 사용자 정보로 API 호출합니다.
                const getStarResponse = await axios.get("/mypage/getstar", {
                    params: {
                        u_idx: userStore.u_idx
                    }
                });
                const favoriteSnList = getStarResponse.data.map(item => item.f_num);
                setFavorites(favoriteSnList);
                console.log("getstar22", favoriteSnList);

                const results = [];
                for (const sn of favoriteSnList) {
                    const queryParams = `serviceKey=${employKey}&sn=${sn}`;
                    const API_URL = `/recruitment/detail?${queryParams}`;
                    const response = await axios.get(API_URL);
                    results.push(response.data.result);
                }

                // 3. 결과를 세션 스토리지에 저장 (옵션)
                sessionStorage.setItem('recruitmentListData', JSON.stringify(results));

                // 4. 상태 업데이트 및 로딩 상태 변경
                setList(results);
                console.log("Recruitment details:", results);
                setLoading(false);
            } catch (error) {
                alert("데이터를 가져오는 데 실패했습니다.");
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 페이지 변경 핸들러
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Calculate the index dynamically based on current page and rows per page
    const calculateIndex = (pageIndex, rowIndex) => {
        return (pageIndex - 1) * rowsPerPage + rowIndex + 1;
    };

    // 데이터 로딩 중이면 로딩 스피너 표시
    if (loading) {
        return <CircularProgress />;
    }
    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };
    const handleFavoriteClick = async (recrutPblntSn) => {
        const updatedUvo = {
            u_idx: userStore.u_idx,
            f_num: recrutPblntSn,
        };
        try {
            await axios.post('/mypage/favorites', updatedUvo);
            if (updatedUvo.u_idx) {
                alert("즐겨찾기 저장", recrutPblntSn, updatedUvo.u_idx);
            } else {
                alert("로그인 후 이용해주세요");
                menuStore.setSelectedMenu("login");
            }
            setFavorites(prevFavorites => [...prevFavorites, recrutPblntSn.toString()]);
            setUvo(updatedUvo);
        } catch (error) {
            console.error("즐겨찾기 저장 중 오류가 발생했습니다:", error);
        }
    };
    const handleFavoritenoneClick = async (recrutPblntSn) => {
        const updatedUvo = {
            u_idx: userStore.u_idx,
            f_num: recrutPblntSn,
        };
        try {
            await axios.post('/mypage/nonefavorites', updatedUvo);
            alert("즐겨찾기 해제", updatedUvo.id, recrutPblntSn);
            setFavorites(prevFavorites => prevFavorites.filter(sn => sn !== recrutPblntSn.toString())); 
            setUvo(updatedUvo);
        } catch (error) {
            alert("즐겨찾기 해제 중 오류가 발생했습니다:", updatedUvo.u_idx, recrutPblntSn, error);
        }
    };
    const renderStarIcon = (recrutPblntSn) => {
        if (loading) return null; 
        const isFavorite = favorites.some(item => item === recrutPblntSn.toString()); 
        console.log(isFavorite);
        const handleStarClick = () => {
            if (isFavorite) {
                handleFavoritenoneClick(recrutPblntSn);
            } else {
                handleFavoriteClick(recrutPblntSn);
            }
        };
        
        return (
            isFavorite ? 
                <StarIcon onClick={handleStarClick} />
                :
                <StarBorderIcon onClick={handleStarClick} />
        );
    };
    return (
        <div>
            <TableContainer sx={{ width: 1500 }} className='tablewrap'>
            <h1>나의 채용공고</h1>
                {list.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                        등록된 채용공고가 없습니다
                    </Typography>
                ) : (
                <Table sx={{ minWidth: 600 }}>
                    <TableHead sx={{ borderBottom: '3px solid blue' }}>
                        <TableRow>
                            <TableCell sx={{ width: '10px', textAlign: 'center' }}>No</TableCell>
                            <TableCell sx={{ width: '200px', textAlign: 'center' }}>공고제목</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>회사</TableCell>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>고용유형</TableCell>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>채용유형</TableCell>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>채용인원</TableCell>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>지역</TableCell>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>기간</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>지원하기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ width: '10px', textAlign: 'center' }}>{calculateIndex(page, index)}</TableCell>
                                <TableCell sx={{ width: '300px', textAlign: 'center' }}>
                                    <div style={{display:'flex', itemAlign: 'center'}}>
                                    <p  onClick={() => handleMenuClick(`detail/${item.recrutPblntSn}`)}>{item.recrutPbancTtl}
                                    </p>
                                    {renderStarIcon(item.recrutPblntSn)}
                                        </div>
                                </TableCell>
                                <TableCell sx={{ width: '70px', textAlign: 'center' }}>
                                    <p>{item.instNm}</p>
                                </TableCell>
                                <TableCell sx={{ width: '30px', textAlign: 'center' }} onClick={() => handleMenuClick(`detail/${item.recrutPblntSn}`)}>
                                    <p>{item.hireTypeNmLst}</p>
                                </TableCell>
                                <TableCell sx={{ width: '30px', textAlign: 'center' }}>
                                    <p>{item.recrutSeNm}</p>
                                </TableCell>
                                <TableCell sx={{ width: '30px', textAlign: 'center' }}>
                                    <p>{item.recrutNope}</p>
                                </TableCell>
                                <TableCell sx={{ width: '30px', textAlign: 'center' }}>
                                    <p>{item.workRgnNmLst}</p>
                                </TableCell>
                                <TableCell sx={{ width: '30px', textAlign: 'center' }}>
                                    <p>D-{item.decimalDay}</p>
                                </TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>
                                <Button variant='contained' onClick={() => window.open(item.srcUrl, '_blank')}>지원하기</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* Pagination */}
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={12} sx={{ border: 0, textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Pagination
                                        count={Math.ceil(list.length / rowsPerPage)} // 전체 페이지 수
                                        page={page} // 현재 페이지
                                        color="primary"
                                        onChange={handleChangePage} // 페이지 변경 핸들러
                                        size="large" // 페이지네이션 사이즈
                                        className='pagination'
                                        style={{ marginLeft: 'auto', marginRight: 'auto' }} // 중앙 정렬
                                    />
                                    <Button sx={{marginRight: 6}}variant='outlined' onClick={() => {handleMenuClick("recruitment");}}>채용목록</Button>
                                    </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                )}
            </TableContainer>
        </div>
    );
}
