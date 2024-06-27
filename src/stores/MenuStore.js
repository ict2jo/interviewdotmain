import { makeAutoObservable } from "mobx";
import authStore from "./AuthStore";


//const user = authStore.getUser();

class MenuStore {
    selectedMenu = "main";  // 선택된 메뉴
    isAuthenticated = false;     // 사용자 인증상태
    token = null;
    uvolist = {
        id: 'user.id',
        name: 'user.name',
        phonenumber: 'user.phonenumber',
        email: 'user.email',
        p_job: '',
        p_class: '',
        p_career: '',
        p_location: '',
        Field: ''
    };
    constructor() {

        // MobX 스토어를 자동으로 관찰 가능하게 설정
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu) {
        this.selectedMenu = menu;
    }

    setInquiryList(inquiryList) {
        this.inquiryList = inquiryList;
        localStorage.setItem('inquiryList', inquiryList);
    }
    setUvoList(uvolist) {
        this.uvolist = uvolist;
        localStorage.setItem("uvolist", uvolist);
    }
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore;