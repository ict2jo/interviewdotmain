import Button from "@/app/_components/Button";
import { useJobTest } from "../_lib/hooks/JobTestContext";
import OptionContainer from "./OptionContainer";

function StartScreen() {
  const { gender, numQuestions, dispatch } = useJobTest();
  console.log(gender);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="font-extrabold text-lg">직업적성테스트</h2>

      <p> 총 {numQuestions} 문제입니다. 솔직하게 답변해주세요 </p>
      <OptionContainer span="" text="성별을 선택해주세요">
        <select
          name="gender"
          className="my-5"
          value={gender}
          onChange={(e) =>
            dispatch({ type: "setGender", payload: e.target.value })
          }
        >
          <option value="">성별</option>
          <option value="100323">남자</option>
          <option value="100324">여자</option>
        </select>
      </OptionContainer>

      <Button
        type={`${gender ? "mdBlue" : "mdGray"}`}
        onClick={() => dispatch({ type: "start" })}
        disabled={!gender}
      >
        시작하기
      </Button>
    </div>
  );
}

export default StartScreen;
