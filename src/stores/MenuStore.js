import { makeAutoObservable } from "mobx";

class MenuStore {
    selectedMenu = 
    localStorage.getItem("selectedMenu") || "main";  
    isAuthenticated = false; 
    token = null;
    constructor() {
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

const menuStore = new MenuStore(); 
export default menuStore;