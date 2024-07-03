import { Box, Grid } from "@mui/material";
import Link from "next/link";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "@/stores/UserStore";
import menuStore from "@/stores/MenuStore";

export default function Innerlist({ list }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태 추가
    const [uvo, setUvo] = useState({
        u_idx: userStore.u_idx,
        f_num: '', // 클릭한 recrutPblntSn이 들어갈 자리입니다.
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("/mypage/getstar", {
                params: {
                    u_idx: userStore.u_idx
                }
            });
            const favoriteSnList = response.data.map(item => item.f_num);
            setFavorites(favoriteSnList);
            console.log("favoriteSnList",favoriteSnList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
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
            id: userStore.u_idx,
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
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
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
        <div style={{ width: "100%", margin: "auto", paddingTop: "20px" }}>
            {list.map((k, index) => (
                <Box className="listbox" key={index}>
                    <Grid container>
                        <Grid item xs={3} className="lefttext">
                            {k.instNm}
                        </Grid>
                        <Grid item xs={6}>
                            <Grid  onClick={() => handleMenuClick(`detail/${k.recrutPblntSn}`)}>
                                {k.recrutPbancTtl}
                                <br />
                                <div className="smalltext">
                                    {k.recrutSeNm} & {k.acbgCondNmLst}
                                </div>
                            </Grid>
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
