"use client";

import userStore from "@/stores/UserStore";
import { useJobTest } from "../_lib/hooks/JobTestContext";
import Button from "./Button";
import { useEffect } from "react";

function FinishScreen() {
  const { answers, dispatch } = useJobTest();

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, []);
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center">
      <p className="my-5">
        <span className="text-primary-800 text-lg">{userStore.name}</span> 님, 수고하셨습니다.
      </p>

      <div className="mt-5">
        <Button type="mdBlue" onClick={() => dispatch({ type: "result" })}>
          결과보기
        </Button>
      </div>
    </div>

  );
}

export default FinishScreen;
