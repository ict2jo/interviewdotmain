import { makeAutoObservable } from "mobx";


class MenuStore{
    selectedMenu = "main" ;  // 선택된 메뉴
    inquiryList = [];
    uvolist = [];
    
    constructor(){
        // MobX 스토어를 자동으로 관찰 가능하게 설정
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu){
        this.selectedMenu = menu;
    }
    setInquiryList(inquiryList){
        this.inquiryList = inquiryList;
    }
    setUvoList(uvolist){
        this.uvolist = uvolist;
    }
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore ;