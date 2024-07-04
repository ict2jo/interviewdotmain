'use client';
import { MenuContext } from '@/stores/StoreContext';
import * as React from 'react';
import axios from 'axios';
import './recruitmentdetail.css';
import { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

export default function Recruitmentdetail({recrutPblntSn} ) {
    const [k, setItem] = useState({});
    const menuStore = useContext(MenuContext);
    const [loading, setLoading] = React.useState(true);
    const [files, setFiles] = useState([]);
    const id = recrutPblntSn ;
    const employKey = process.env.NEXT_PUBLIC_EMPOLY_KEY;
    const API_URL = `/recruitment/detail?serviceKey=${employKey}&sn=${id}`;
    const getData = () => {
        axios
            .get(API_URL)
            .then((data) => {
                setItem(data.data.result);
                setFiles(data.data.result.files);
            })
            .catch(console.log('에러 발생'));
            setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);
    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };
    if (loading) {
        return <CircularProgress />;
    }
    return (
        <>
        <div>
            <>
            <h2 className='rdetailmaintext'>{k.recrutPbancTtl}</h2> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    공고기간
                </div>
                <div className='rdetailinfodetail1'>
                <p>{k.pbancBgngYmd}&nbsp;~&nbsp;{k.pbancEndYmd}</p>
                </div>
                </div>

                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>채용분야</p>
                    
                </div>
                <div className='rdetailinfodetail1'>
                    <p>{k.hireTypeLst}</p>
                </div>
                </div>

                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>고용형태</p>
                    
                </div>
                <div className='rdetailinfodetail1'>
                    <p>{k.hireTypeNmLst}</p>
                </div>
                </div>

                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>학력정보</p>
                    <p>근무지</p>
                </div>
                <div className='rdetailinfodetail1'>
                    <p>{k.acbgCondLst}</p>
                    <p>{k.workRgnNmLst}</p>
                </div>
                </div>
            </div>
            <p className='rdetailmaintext'>공고 내용</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>응시자격</p>
                </div>
                <div className='rdetailinfodetail2'>
                    <p>{k.aplyQlfcCn}</p>
                </div>
                </div>
                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>결격사유</p>
                </div>
                <div className='rdetailinfodetail2'>
                    <p>{k.disqlfcRsn}</p>
                </div>
                </div>
                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>우대조건</p>
                </div>
                <div className='rdetailinfodetail2'>
                    <p>{k.prefCn}</p>
                </div>
                </div>
                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>우대내용</p>
                </div>
                <div className='rdetailinfodetail2'>
                    <p>{k.prefCondCn}</p>
                </div>
                </div>
                <div className='rdetailname'>
                <div className='rdetailinfotitle'>
                    <p>전형절차</p>
                </div>
                <div className='rdetailinfodetail2'>
                    <p>{k.scrnprcdrMthdExpln}</p>
                </div>
                </div>
            </div>
            <p className='rdetailmaintext'>첨부 파일</p> 
            <div className='blueline'></div>
            <div className='whitebox'>
                <div className='rdetailinfodetail2'>
                <List>
                {files.map((file, index) => (
                    <ListItem key={index} component="a" href={file.url} target="_blank" rel="noopener noreferrer">
                        <ListItemText primary={file.atchFileNm} secondary={`파일 유형: ${file.url}`} />
                    </ListItem>
                ))}
            </List>
                </div>
            </div>
                <div className='rdetailbut'>
                <Button variant="contained"  onClick={() => window.open(k.srcUrl, '_blank')}>지원하기</Button>
                <Button variant='outlined' onClick={() => {handleMenuClick("recruitment");}}>채용목록</Button>
                </div>
                </>
        </div>
    </>
    );
}