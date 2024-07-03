// Review_Community.js

"use client"

import { useRouter } from "next/navigation";
import "./review_community.css";
import menuStore from "@/stores/MenuStore";
export default function Review_Community() {
    const router = useRouter();

    
    const handleMenuClick = async (menu) => {
        menuStore.setSelectedMenu(menu);
    };


    return (
        
        <div className="comm_container">
            <div className="bord_box_1" onClick={() => handleMenuClick(`review/reviewList`)}>
                    면접 후기
            </div>
            <div className="bord_box_2" onClick={() => handleMenuClick(`review/successList`)}>
                합격자 면접 후기
            </div>
        </div>
    );
}
