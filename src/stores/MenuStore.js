import { makeAutoObservable } from "mobx";
import authStore from "./AuthStore";

import userStore from "@/stores/UserStore";

class MenuStore {
    selectedMenu = 
    localStorage.getItem("selectedMenu") || "main";  // 선택된 메뉴
    isAuthenticated = false;     // 사용자 인증상태
    token = null;
    constructor() {
        // MobX 스토어를 자동으로 관찰 가능하게 설정
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu) {
        this.selectedMenu = menu;
        localStorage.setItem("selectedMenu", menu);
    }

    setInquiryList(inquiryList) {
        this.inquiryList = inquiryList;
        localStorage.setItem('inquiryList', inquiryList);
    }
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore;