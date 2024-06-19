import { Box, Grid } from "@mui/material";
import Link from "next/link";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Innerlist({ list }) {
    const [favorites, setFavorites] = useState([]);
    const [uvo, setUvo] = useState({
        u_idx: '1',
        f_num: '', // 클릭한 recrutPblntSn이 들어갈 자리입니다.
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("/mypage/star", uvo);
            const favoriteSnList = response.data.map(item => item.f_num);
            setFavorites(favoriteSnList);
            console.log("Data loaded successfully:", favoriteSnList);
        } catch (error) {
            alert("Failed to load data.");
            console.error(error);
        }
    };

    const handleFavoriteClick = async (recrutPblntSn) => {
        const updatedUvo = {
            u_idx: '1',
            f_num: recrutPblntSn,
        };
        
        try {
            await axios.post('/mypage/favorites', updatedUvo);
            console.log("즐겨찾기 저장", recrutPblntSn, updatedUvo.u_idx);
            
            // 즐겨찾기 상태 업데이트 후 다시 데이터를 불러옴
            setFavorites(prevFavorites => [...prevFavorites, recrutPblntSn]);
            setUvo(updatedUvo);
            fetchData(); // 새로운 데이터 다시 불러오기
        } catch (error) {
            console.error("즐겨찾기 저장 중 오류가 발생했습니다:", error);
        }
    };
    
    const handleFavoritenoneClick = async (recrutPblntSn) => {
        const updatedUvo = {
            u_idx: '1',
            f_num: recrutPblntSn,
        };
        
        try {
            await axios.post('/mypage/nonefavorites', updatedUvo);
            console.log("즐겨찾기 해제", updatedUvo.u_idx, recrutPblntSn);
            
            // 즐겨찾기 해제 후 다시 데이터를 불러옴
            setFavorites(prevFavorites => prevFavorites.filter(sn => sn !== recrutPblntSn));
            setUvo(updatedUvo);
            fetchData(); // 새로운 데이터 다시 불러오기
        } catch (error) {
            console.error("즐겨찾기 해제 중 오류가 발생했습니다:", updatedUvo.u_idx, recrutPblntSn, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Rendering function to handle null or incorrect rendering of favorites
    const renderStarIcon = (recrutPblntSn) => {
        
        console.log("favorites:", favorites);
        console.log("recrutPblntSn:", recrutPblntSn);
    
        if (favorites.some(item => item === recrutPblntSn.toString())) {
            return <StarIcon onClick={() => handleFavoritenoneClick(recrutPblntSn)} />;
        } else {
            return <StarBorderIcon onClick={() => handleFavoriteClick(recrutPblntSn)} />;
        }
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
