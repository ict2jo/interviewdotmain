"use client"

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { MenuContext } from "@/stores/StoreContext";
import Header from "./_components/Header";
import Main from "./main/page";
import Interview_start from "./interview/interview_start/page";
import Job from "./job/page";
import List from "./job/recruitment/list/page";


function Home(){
   // useContext 훅으로 MobX Store 가져오기 
  const menuStore = useContext(MenuContext)  

  const router = useRouter();
    
    useEffect(() => {
        //if(!menuStore.isAuthenticated){
        //    router.push("/")
        //}
    },[menuStore]);

    const renderContent = () => {
        switch(menuStore.selectedMenu){
            case "ai" :
                return <Interview_start />;
            case "Airesult" :
                return <Airesult />;
            case "airesult_history" :
                return <Airesult />; //면접 기록
            case "airesult_feedback" :
                return <Airesult />; //AI 피드백
            case "airesult_guide" :
                return <Airesult />; //면접 가이드
            case "airesult_question" :
                return <Airesult />; //질문 저장소
            case "job" :
                return <Job />;
            case "news" :
                return <Job />; //뉴스
            case "event" :
                return <Job />; //이벤트
            case "recruitment" :
                return <List />;
            case "review" :
                return <Review />; //면접후기
            default:
                return <Main />
    }
    }
    return(
        <div>
        <Header />
        {renderContent()}
        <footer>Copyright by ... </footer>
        </div>
    )
}

export default observer(Home);