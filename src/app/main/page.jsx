'use client'
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Image from "next/image";
import bg from "../../../public/images/bg.png"
import Button from "../_components/Button";
import menuStore from "@/stores/MenuStore";
import { Typography } from "@mui/material";
export default function Main() {
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        menuStore.setSelectedMenu(menu);
    };
    return (
        <>

            <div className="w-full flex flex-col justify-center items-center mb-20">

                {/* <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button> */}
                <div className="w-1/3 mt-10">
                    {/*  임시 이미지 */}
                    <Image src={bg} className="" alt="background image" />
                </div>
                <p className="text-3xl m-10 font-extrabold mpt-10">
                    인터뷰 닷으로 취업하자
                </p>
                <Typography onClick={() => handleMenuClick("main")}
                    className="bg-primary-500 text-white py-2 w-48 h-12 rounded-full font-bold hover:opacity-95 cursor-pointer text-center leading-8"
                >
                    바로 시작하기
                </Typography>
            </div>

        </>
    )
}