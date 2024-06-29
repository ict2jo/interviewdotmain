'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Recruitmentdetail({recrutPblntSn} ) {
    const [item, setItem] = useState({});
    const id = recrutPblntSn ;
    //http://makeup-api.herokuapp.com/api/v1/products/488.json
    // 스트링이랑 객체값 같이 불러오고싶을때는 삐침(`) 사용하기
    const API_URL = `/recruitment/detail?serviceKey=B6imLe%2BFf%2B3fVWotgO%2BhgAihHyVI%2F7tlmTiqrvZifWgzl94sf9U4VL3GuwTIkEkjW3MsF%2BtQ3OnUHkqwMRmuMA%3D%3D&sn=${id}`;
    const getData = () => {
        axios
            .get(API_URL)
            .then((data) => {
                console.log(data.data.result);
                setItem(data.data.result);
            })
            .catch(console.log('에러 발생'));
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
        <div className="wrap">
            <div className="info_item">
                <strong className="tit_item">{item.instNm}</strong>
                <strong className="num_price">{item.ncsCdNmLst}</strong>
            </div>
        </div>
    </>
    );
}