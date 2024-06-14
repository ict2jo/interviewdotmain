"use client"

import Link from "next/link"
import "./review_community.css"
import Header from "../../_components/Header"

export default function Review_Community() {
    

    return(
        <>
        <Header />

        <div className="comm_container">
            <div className="bord_box_1">
                <Link href={"./review_list"}>
                    면접 후기
                </Link>
            </div>
            <div className="bord_box_2">
                <Link href={"./review_success"}>
                    합격자 면접 후기
                </Link>
            </div>
        </div>
        </>
    )
}