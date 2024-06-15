// Review_Community.js

"use client"

import { useRouter } from "next/navigation";
import "./review_community.css";
import { useEffect } from "react";

export default function Review_Community() {
    const router = useRouter();

    
    
    const handleReviewList = () => {
        router.push("/review_list")
    };

    return (
        <div className="comm_container">
            <div className="bord_box_1" onClick={handleReviewList}>
                    면접 후기
            </div>
            <div className="bord_box_2">
                합격자 면접 후기
            </div>
        </div>
    );
}
