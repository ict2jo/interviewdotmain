"use client"

import { Box,Pagination,} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './recruitmentlist.css';
import Center from "./center/page";
import Searchbox from "./searchbox/page";
import Innerlist from "./innerlist/pags";
import { MenuContext } from "@/stores/StoreContext";

export default function list() {
    const [list, setList] = useState([]);
    const [numOfRows, setNumOfRows] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [acbgCondLst, setAcbgCondLst] = useState("");
    const [recrutSe, setRecrutSe] = useState("");
    const [workRgnLst, setWorkRgnLst] = useState("");
    const [acbgCondText, setAcbgCondText] = useState("");
    const [recrutSeText, setRecrutSeText] = useState("");
    const [workRgnText, setWorkRgnText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [ongoingYn, setOngoingYn] = useState("");
    const menuStore = useContext(MenuContext);
    useEffect(() => {
        fetchData();
    }, [pageNo, numOfRows, acbgCondLst, recrutSe, workRgnLst, searchQuery, ongoingYn]); 

    const fetchData = async () => {
        let queryParams = `serviceKey=B6imLe%2BFf%2B3fVWotgO%2BhgAihHyVI%2F7tlmTiqrvZifWgzl94sf9U4VL3GuwTIkEkjW3MsF%2BtQ3OnUHkqwMRmuMA%3D%3D&pageNo=${pageNo}&acbgCondLst=${acbgCondLst}&recrutSe=${recrutSe}&workRgnLst=${workRgnLst}&recrutPbancTtl=${searchQuery}&ongoingYn=${ongoingYn}`;
        const API_URL = `/recruitment/list?${queryParams}`;

        try {
            const response = await axios.get(API_URL);
            setList(response.data.result);
            setTotalItems(response.data.totalCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (event, value) => {
        setPageNo(value);
    };

    const handleRadioChange = (e) => {
        const { name, value, nextSibling } = e.target;
        const labelText = nextSibling.innerText;

        switch (name) {
            case "acbgCondLst":
                setAcbgCondLst(value === acbgCondLst ? "" : value);
                setAcbgCondText(value === acbgCondLst ? "" : labelText);
                break;
            case "recrutSe":
                setRecrutSe(value === recrutSe ? "" : value);
                setRecrutSeText(value === recrutSe ? "" : labelText);
                break;
            case "workRgnLst":
                setWorkRgnLst(value === workRgnLst ? "" : value);
                setWorkRgnText(value === workRgnLst ? "" : labelText);
                break;
            default:
                break;
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleOngoingYnChange = () => {
        setOngoingYn(prevState => prevState === "Y" ? "" : "Y");
    };

    return (
        <div className="recruitmentlistwrapbg">
        <div className="recruitmentlistwrap">
            <Searchbox
                workRgnLst={workRgnLst}
                handleRadioChange={handleRadioChange}
                recrutSe={recrutSe}
                acbgCondLst={acbgCondLst}
                />
            <Center 
                acbgCondText={acbgCondText} 
                recrutSeText={recrutSeText} 
                workRgnText={workRgnText} 
                searchQuery={searchQuery} 
                handleSearchChange={handleSearchChange} 
                totalItems={totalItems} 
                ongoingYn={ongoingYn} handleOngoingYnChange={handleOngoingYnChange}
                />
            <Innerlist list={list} />
            <Pagination
                count={Math.ceil(totalItems / numOfRows)}
                page={pageNo}
                color="primary"
                onChange={handlePageChange}
                className="pagination"
                />
        </div>
        </div>
    );
}
