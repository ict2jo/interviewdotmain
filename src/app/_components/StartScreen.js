'use client'
import Button from "@/app/_components/Button";
import { useJobTest } from "../_lib/hooks/JobTestContext";

function StartScreen() {
  const { gender, numQuestions, dispatch } = useJobTest();
  return (
    <div className="flex flex-col justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>

      <h2 className="font-extrabold text-lg">직업적성테스트</h2>
      <div className="my-10 w-3/4 ">
        <p className="my-2"> 총 <span className="font-extrabold">{numQuestions}</span> 문제입니다. </p>
        <p> 나의 진로선택을 위한 과정중 하나로 자기 자신에 대한 정확한 이해를 위한 테스트입니다.
          내가 어떤활동을 좋아하는지, 어떤 분야에 관심이 있는지 객관적으로 알아볼 수 있도록 도와줍니다.
          본 프로그램은 미국의 저명한 심리학자인 JOHN L.HOLLAND 의 직업성격유형 이론에 근거하여 개인의 흥미를 <span className="font-extrabold">6가지 유형</span>으로 구분하여 측정한 것입니다. 여기서 흥미란 특정활동이나
          대상에 대해 지속적인 관심을 두고 좋아하는 것으로, 어떤일을 할때 사람들은 자신이 좋아하는일이면 더 만족하고 오랫동안 그 활동을 지속할 수 있습니다.
        </p>
      </div>
      <Button
        type="mdBlue"
        onClick={() => dispatch({ type: "start" })}
      >
        시작하기
      </Button>


    </div>
  );
}

export default StartScreen;
