import { Box, Grid } from "@mui/material";
import Link from "next/link";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import axios from "axios";
import authStore from "@/stores/AuthStore";

export default function Innerlist({ list }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태 추가
    const user = authStore.getUser();
    const [uvo, setUvo] = useState({
        u_idx: user.u_idx,
        f_num: '', // 클릭한 recrutPblntSn이 들어갈 자리입니다.
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("/mypage/star", {
                params: {
                    u_idx: user.u_idx
                }
            });
            const favoriteSnList = response.data.map(item => item.f_num);
            setFavorites(favoriteSnList);
            console.log("데이터를 성공적으로 불러왔습니다:", favoriteSnList);
        } catch (error) {
            alert("데이터 로드에 실패했습니다.");
            console.error(error);
        } finally {
            setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
        }
    };

    const handleFavoriteClick = async (recrutPblntSn) => {
        const updatedUvo = {
            u_idx: user.u_idx,
            f_num: recrutPblntSn,
        };
        
        try {
            await axios.post('/mypage/favorites', updatedUvo);
            console.log("즐겨찾기 저장", recrutPblntSn, updatedUvo.u_idx);
            
            // 즐겨찾기 상태 업데이트 후 다시 데이터를 불러옴
            setFavorites(prevFavorites => [...prevFavorites, recrutPblntSn.toString()]); // 문자열로 변환하여 저장
            setUvo(updatedUvo);
        } catch (error) {
            console.error("즐겨찾기 저장 중 오류가 발생했습니다:", error);
        }
    };
    
    const handleFavoritenoneClick = async (recrutPblntSn) => {
        const updatedUvo = {
            u_idx: user.u_idx,
            f_num: recrutPblntSn,
        };
        
        try {
            await axios.post('/mypage/nonefavorites', updatedUvo);
            console.log("즐겨찾기 해제", updatedUvo.u_idx, recrutPblntSn);
            
            // 즐겨찾기 해제 후 다시 데이터를 불러옴
            setFavorites(prevFavorites => prevFavorites.filter(sn => sn !== recrutPblntSn.toString())); // 문자열로 변환하여 필터링
            setUvo(updatedUvo);
        } catch (error) {
            console.error("즐겨찾기 해제 중 오류가 발생했습니다:", updatedUvo.u_idx, recrutPblntSn, error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const renderStarIcon = (recrutPblntSn) => {
        if (loading) return null; // 데이터 로딩 중에는 아이콘을 표시하지 않음
        
        const isFavorite = favorites.some(item => item === recrutPblntSn.toString()); // 문자열로 변환하여 비교
        console.log("isFavorite", isFavorite);
        console.log("recrutPblntSn", recrutPblntSn);
        console.log("favorites", favorites);
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
        <div style={{ width: "100%", margin: "auto", paddingTop: "20px" }}>
            {list.map((k, index) => (
                <Box className="listbox" key={index}>
                    <Grid container>
                        <Grid item xs={3} className="lefttext">
                            {k.instNm}
                        </Grid>
                        <Grid item xs={6}>
                            <Link href={'/recruitmentdetail/' + k.recrutPblntSn}>
                                {k.recrutPbancTtl}
                                <br />
                                <div className="smalltext">
                                    {k.recrutSeNm} & {k.acbgCondNmLst}
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={3}>
                            {renderStarIcon(k.recrutPblntSn)}
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </div>
    );
}
