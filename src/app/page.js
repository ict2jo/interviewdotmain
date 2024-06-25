"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { MenuContext } from "@/stores/StoreContext";
import Header from "./_components/Header";

import Main from "./main/page";
import Job from "./job/page";
import List from "./job/recruitment/list/page";
import Review_Community from "./review/review_community/page";
import Selfprofile from "./mypage/selfProfile/page";
import Interview_history from "./ai/interview_history/page";
import Interview_feedback from "./ai/interview_feedback/page";
import Interview_guide from "./ai/interview_guide/page";
import QuestionRepository from "./ai/question_repository/page";
import Inquirywrite from "./mypage/Inquiry/Inquirywrite/page";
import Inquiry from "./mypage/Inquiry/page";
import Starthome from "./interview/starthome/page";
import JobTest from "./job/test/JobTest";
import Verification from "../../pages/verification";
import { App } from "./pages/toss/App";
import Footer from "./_components/Footer";
import Result from "./job/test/result/Result";
import Introduction from "./mypage/Introduction/page";
import Calendar from "./mypage/Schedule/page";
import Inquiryedit from "./mypage/Inquiry/Inquiryedit/page";

function Home() {
  // useContext 훅으로 MobX Store 가져오기
  const menuStore = useContext(MenuContext);

  const router = useRouter();

  // 로컬 스토리지에서 상태 불러오기
  useEffect(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) {
      menuStore.setUvoList(savedMenu);
    }
  }, [menuStore]);

  // 선택된 메뉴가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("selectedMenu", menuStore.selectedMenu);
  }, []);

  const renderContent = () => {
    switch (menuStore.selectedMenu) {
      case "main":
        return <Main />;
      case "ai":
        return <Starthome />;
      case "verification":
        return <Verification />;
      case "Airesult":
        return <Airesult />;
      case "airesult_history":
        return <Interview_history />; //면접 기록
      case "airesult_feedback":
        return <Interview_feedback />; //AI 피드백
      case "airesult_guide":
        return <Interview_guide />; //면접 가이드
      case "airesult_question":
        return <QuestionRepository />; //질문 저장소
      case "self":
        return <Inquiry />; //자기소개서
      case "job":
        return <Job />;
      case "jobTest":
        return <JobTest />;
      case "result":
        return <Result />;
      case "event":
        return <Job />; //이벤트
      case "recruitment":
        return <List />;
      case "review":
        return <Review_Community />; //면접후기
      case "profile":
        return <Selfprofile />;
      case "intoduction":
        return <Introduction />;
      case "schedule":
        return <Calendar />;
      case "inquiry":
        return <Inquiry />;
      case "toss":
        return <App />;
      case "inquirywrite":
        return <Inquirywrite />;
      case "inquiryedit":
        return <Inquiryedit />;
      case "option":
        return <OptionalInfo />;
      default:
        return <Main />;
    }
  };
  return (
    <div>
      <Header />
      {renderContent()}
      <Footer />
    </div>
  );
}

export default observer(Home);
