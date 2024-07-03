import * as React from 'react';
import './introduction.css';
import { useContext, useEffect} from 'react';
import { Button, CircularProgress } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import userStore from '@/stores/UserStore';

export default function Introduction() {
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                userStore.loadUserFromServer();
                setLoading(false);
            } catch (error) {
                alert("데이터를 가져오는 중 오류가 발생했습니다.");
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
                setLoading(false);
            }
        }
        fetchData();
    }, [userStore]);  

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <>
            <h2 className='mymaintext'>자기소개서제목</h2> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <h2 className='myname1'>{userStore.name}</h2>
                <p>&nbsp;</p>
                <p>{userStore.birth}</p>
                </div>
                <div className='myname'>
                <div className='myinfotitle'>
                    <p>휴대폰</p>
                    <p>주소</p>
                </div>
                <div className='myinfodetail'>
                    <p>{userStore.phonenumber}</p>
                    <p>{userStore.addr}</p>
                </div>
                <div className='myinfotitle'>
                    <p>email</p>
                </div>
                <div className='myinfodetail'>
                    <p>{userStore.email}</p>
                </div>
                </div>
            </div>
            <p className='mymaintext'>희망 근무 조건</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <div className='myinfotitle'>
                    <p>근무지</p>
                    <p>업종</p>
                    <p>학력</p>
                    <p>경력</p>
                </div>
                <div className='myinfodetail'>
                    <p>{userStore.p_location}</p>
                    <p>{userStore.p_job}</p>
                    <p>{userStore.p_class}</p>
                    <p>{userStore.p_career}</p>
                </div>
                </div>
            </div>
            <p className='mymaintext'>자기소개서</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='myname'>
                <div className='myinfodetail'>
                <p>{userStore.field}</p>
                </div>
                </div>
            </div>
            <div className='mybut'>
                <Button variant="contained" onClick={() => handleMenuClick("verification")}>자기소개서 교정하기</Button>
                <Button variant="contained" onClick={() => handleMenuClick("verification")}>자기소개서 피드백받기</Button>
            </div>
            </>
        </div>
    );
}
