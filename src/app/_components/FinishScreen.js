"use client";

import { useSession } from "next-auth/react";
import { useJobTest } from "../_lib/hooks/JobTestContext";
import Link from "next/link";
import { API_KEY, PostResultAPI, Q_NUM } from "../api/data/jobData";
import { useEffect } from "react";

function FinishScreen() {
  const { gender, answers } = useJobTest();
  const { data: session, status } = useSession();
  const name = "paul";
  //const name = session?.user?.name || "";

  // post보낼 배열 준비
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
    const request = async () => {
      try {
        const response = await PostResultAPI(postDictionary);
        const data = response.data.result;
        console.log(data);
      } catch (error) {
        console.error("Error posting result:", error);
      }
    };

    request(); // useEffect 내에서 request 함수 호출 추가
  }, [postDictionary]); // useEffect 두 번째 인자를 빈 배열로 전달하여 한 번만 호출되도록 설정

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
        <Link href="/result">
          <button>결과보기</button>
        </Link>
      </div>
    </>
  );
}

//   const wonScore = response.data.result.wonScore
//     .split(" ")
//     .splice(0, 8)
//     .map((answer) => Number(answer.split("=")[1]));
//   // 출력결과: wonScore  [3, 4, 3, 4, 4, 3, 3, 4]

//   const Ability = [
//     "능력발휘",
//     "자율성",
//     "보수",
//     "안정성",
//     "사회적 인정",
//     "사회봉사",
//     "자기계발",
//     "창의성",
//   ];

//   const wonScoreArr = wonScore
//     .map((value, index) => ({ value, index }))
//     .sort((a, b) => a.value - b.value);

//   const bestWonScore = wonScoreArr.slice(wonScoreArr.length - 2); // 0: {value: 4, index: 4}   1: {value: 4, index: 7}     =>  사회적 인정, 창의성
//   const worstWonScore = wonScoreArr.slice(0, 2); // 0: {value: 3, index: 0}   1: {value: 3, index: 2}     =>  능력발휘, 보수

//   const bestWonScoreIndex = bestWonScore[0].index; // 최대값: 출력결과 = 4
//   const bestSecondWonScoreIndex = bestWonScore[1].index; // 두번째 최대값: 출력결과 = 7
//   const worstWonScoreIndex = worstWonScore[0].index; // 최소값: 출력결과 = 0
//   const worstSecondWonScoreIndex = worstWonScore[1].index; // 두번쨰 최소값: 출력결과 = 2

//   const bestAbility = Ability[bestWonScoreIndex]; // 출력결과 = 사회적 인정
//   const bestSecondAbility = Ability[bestSecondWonScoreIndex]; // 출력결과 = 창의성
//   const worstAbility = Ability[worstWonScoreIndex]; // 출력결과 = 능력발휘
//   const worstSecondAbility = Ability[worstSecondWonScoreIndex]; // 출력결과 = 보수

//   console.log(
//     bestAbility,
//     bestSecondAbility,
//     worstAbility,
//     worstSecondAbility,
//     bestWonScoreIndex,
//     bestSecondWonScoreIndex
//   );

//   dispatch(
//     actionSetResult(
//       bestAbility,
//       worstAbility,
//       bestSecondAbility,
//       worstSecondAbility,
//       bestWonScoreIndex,
//       bestSecondWonScoreIndex,
//       wonScore
//     )
//   );
// };

export default FinishScreen;
