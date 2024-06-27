"use client";


import { useJobTest } from "../_lib/hooks/JobTestContext";
import { API_KEY, Q_NUM } from "../api/data/jobData";
import Button from "./Button";
import authStore from "@/stores/AuthStore";
import { useEffect } from "react";

function FinishScreen() {
  const { gender, answers, dispatch } = useJobTest();
  const user = authStore.getUser()
  //const name = session?.user?.name || user.name;
  const postDictionary = {
    apikey: API_KEY,
    qestrnSeq: Q_NUM,
    trgetSe: "100209",
    name: name,
    gender: gender,
    grade: "2",
    startDtm: Date.now(),
    answers: answers
      .map((answer, index) => {
        return `${index + 1}=${answer}`; // 수정: index + 1로 문제 번호 맞추기
      })
      .join(" ")
      .trim(),
  };
  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, []);
  return (
    <>
      <h1>검사 완료</h1>
      <p>{name}님 수고하셨습니다.</p>
      <p>
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지를 알려주고,<br></br>
        중요 가치를 충족시킬 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
      </p>

      <div>
        <Button type="mdBlue" onClick={() => dispatch({ type: "result" })}>결과보기</Button>
      </div>
    </>
  );
}

export default FinishScreen;
