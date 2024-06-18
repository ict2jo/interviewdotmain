"use client";

import Button from "@/app/_components/Button";
import { useJobTest } from "../_lib/hooks/JobTestContext";
import CheckBox from "./CheckBox";

export default function JobQuestion() {
  const { questions, index, dispatch, page, answers, points, numQuestions } =
    useJobTest();
  const questionsPerPage = 5;

  const currentQuestions = questions.slice(
    (page - 1) * questionsPerPage,
    page * questionsPerPage
  );

  const allOptionsChecked = currentQuestions.every((question, idx) => {
    const currentIndex = (page - 1) * questionsPerPage + idx;
    return answers[currentIndex] !== undefined;
  });

  const options = [
    "전혀아니다",
    "아니다",
    "조금아니다",
    "보통이다",
    "조금그렇다",
    "그렇다",
    "매우그렇다",
  ];

  const handleOptionClick = (questionIndex, optionValue) => {
    dispatch({
      type: "answerQuestion",
      payload: { index: questionIndex, answer: optionValue },
    });
  };

  const handleNextClick = () => {
    if (page < Math.ceil(numQuestions / questionsPerPage)) {
      dispatch({ type: "nextPage" });
    } else {
      dispatch({ type: "finish" });
    }
  };
  return (
    <div>
      {currentQuestions.map((question, idx) => {
        const currentIndex = (page - 1) * questionsPerPage + idx;
        return (
          <div
            className="flex w-full gap-5 h-[14rem] border-solid border-b-2 border-gray-300 p-10"
            key={question.qitemNo}
          >
            <div className="w-1/3">
              <p className="m-2 text-3xl text-primary-500 font-extrabold">
                Q{currentIndex + 1}.
              </p>
              <h1 className="font-bold">{question.question}</h1>
            </div>
            <div className="flex justify-between my-5 flex-grow">
              {options.map((option, i) => (
                <CheckBox
                  key={i}
                  value={i + 1}
                  checked={answers[currentIndex] === i + 1}
                  onChange={() => handleOptionClick(currentIndex, i + 1)}
                >
                  {option}
                </CheckBox>
              ))}
            </div>
          </div>
        );
      })}
      <div className="flex justify-between m-5">
        <Button type="mdBlue" onClick={() => dispatch({ type: "prevPage" })}>
          이전
        </Button>

        <Button
          type={`${allOptionsChecked ? "mdBlue" : "mdGray"}`}
          onClick={handleNextClick}
          disabled={!allOptionsChecked}
        >
          {page < Math.ceil(numQuestions / questionsPerPage) ? "다음" : "완료"}
        </Button>
      </div>
    </div>
  );
}
