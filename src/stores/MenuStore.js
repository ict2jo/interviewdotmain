import { makeAutoObservable } from "mobx";

class MenuStore {
  selectedMenu = "main";
  isAuthenticated = false;
  token = null;
  selectedResumeData = [];

  constructor() {
    makeAutoObservable(this);

    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      this.initializeFromLocalStorage();
    }
  }

  // 메뉴 변경
  setSelectedMenu(menu) {
    this.selectedMenu = menu;
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedMenu", menu);
    }
  }

  setInquiryList(inquiryList) {
    this.inquiryList = inquiryList;
    if (typeof window !== "undefined") {
      localStorage.setItem("inquiryList", inquiryList);
    }
  }

  // 이력서 데이터 설정
  setSelectedResumeData(selectedResumeData) {
    this.selectedResumeData = selectedResumeData;
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedResumeData", selectedResumeData);
    }
  }

  // 클라이언트 사이드에서만 localStorage 값을 초기화하는 메서드
  initializeFromLocalStorage() {
    this.selectedMenu = localStorage.getItem("selectedMenu") || "main";
    this.inquiryList = localStorage.getItem("inquiryList") || [];
    this.selectedResumeData = JSON.parse(localStorage.getItem("selectedResumeData")) || [];
  }
}

const menuStore = new MenuStore();
export default menuStore;
