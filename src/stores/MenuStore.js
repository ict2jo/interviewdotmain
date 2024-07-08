import { makeAutoObservable } from "mobx";

class MenuStore {

  selectedMenu = localStorage.getItem("selectedMenu") || "main";
  isAuthenticated = false;
  token = null;
  selectedResumeData = [];

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
    localStorage.setItem("inquiryList", inquiryList);
  }

// 이력서 데이터 설정
  setSelectedResumeData(selectedResumeData) {
    this.selectedResumeData = selectedResumeData;
    localStorage.setItem("selectedResumeData", selectedResumeData);
  }


}

const menuStore = new MenuStore();
export default menuStore;