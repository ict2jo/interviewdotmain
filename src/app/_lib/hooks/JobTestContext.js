"use client";
import { GetQuestionAPI } from "@/app/api/data/jobData";
import { createContext, useContext, useEffect, useReducer } from "react";

const JobTestContext = createContext();

const initialState = {
  questions: [],
  //  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  page: 0,
  answers: [],
  gender: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setGender":
      return {
        ...state,
        gender: action.payload,
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        page: 1,
        gender: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answerQuestion":
      const { index, answer } = action.payload;
      const newAnswers = [...state.answers];
      newAnswers[index] = answer;
      return {
        ...state,
        answers: newAnswers,
      };
    case "nextPage":
      return {
        ...state,
        page: state.page + 1,
      };

    case "prevPage":
      return { ...state, page: state.page - 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "result":
      return {
        ...state,
        status: "result",
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Action unkonwn");
  }
}

function JobTestProvider({ children }) {
  const [
    { gender, questions, status, index, answers, page, points },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchJobTests() {
      try {
        const data = await GetQuestionAPI();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchJobTests();
  }, []);

  return (
    <JobTestContext.Provider
      value={{
        questions,
        status,
        index,
        answers,
        points,
        page,
        numQuestions,
        dispatch,
        gender,
      }}
    >
      {children}
    </JobTestContext.Provider>
  );
}

function useJobTest() {
  const context = useContext(JobTestContext);

  if (context === undefined)
    throw new Error("Context was used outside of the Provider");
  return context;
}

export { JobTestProvider, useJobTest };
