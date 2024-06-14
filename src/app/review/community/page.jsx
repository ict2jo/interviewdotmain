"use client"

import Link from "next/link"
import "./community.css"
import Header from "../_components/Header"

export default function Community() {
    

    return(
        <>
        <Header />

        <div className="comm_container">
            <div className="bord_box_1">
                <Link href={"./interview_review"}>
                    면접 후기
                </Link>
            </div>
            <div className="bord_box_2">
                <Link href={"./interview_success"}>
                    합격자 면접 후기
                </Link>
            </div>
        </div>
        </>
    )
}