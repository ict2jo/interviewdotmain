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
        <>
        <div className='profile_con'>
        <h2 className='mymaintext'>자기소개서제목</h2> 
        <div className='profile'>
            <table class='styled-table'>
                <tbody>
                    <tr><th colspan="4" style={{backgroundColor:"blue", color: "white"}}>인적사항</th></tr>
                    <tr><th>이름</th><td>{userStore.name}</td><th>생년월일</th><td>{userStore.birth}</td></tr>
                    <tr><th>Email</th><td>{userStore.email}</td><th>휴대폰</th><td>{userStore.phonenumber}</td></tr>
                    <tr><th>주소</th><td colspan="3">{userStore.addr}</td></tr>
                </tbody>
            </table>
        </div>
    

        <div className='profile'>
            <table class='styled-table'>
                <tbody>
                    <tr><th colspan="2" style={{backgroundColor:"blue", color: "white"}}>희망 근무조건</th></tr>
                    <tr><th>근무지</th><td>{userStore.p_location}</td></tr>
                    <tr><th>업종</th><td>{userStore.p_job}</td></tr>
                    <tr><th>학력</th><td>{userStore.p_class}</td></tr>
                    <tr><th>경력</th><td>{userStore.p_career}</td></tr>
                </tbody>
            </table>
        </div>
    

        <div className='profile'>
            <table class='styled-table'>
                <tbody>
                    <tr><th style={{backgroundColor:"blue", color: "white"}}>자기소개서</th></tr>
                    <tr><td>{userStore.field}</td></tr>
                </tbody>
            </table>
        </div>
        
        <div className='mybut'>
            <Button variant="contained" onClick={() => handleMenuClick("verification")}>자기소개서 피드백 받기</Button>
        </div>
        </div>
        </>
    );
}
