"use client";
import { createContext, useContext, useReducer } from "react";

const KEY = "631411887293319c018c3eeeb7413e40";
const OptionContext = createContext();

const initialState = {
  school: null,
  schoolName: null,
  major: null,
  currentJob: null,
  region: [],
  selectedJob: null,
  jobSearchingFor: [],
  status: "ready",
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "school":
      return { ...state, school: action.payload, status: "answered" };
    case "schoolName":
      return { ...state, schoolName: action.payload, status: "answered" };
    case "major":
      return { ...state, major: action.payload, status: "answered" };
    case "next":
      return { ...state, page: state.page + 1, status: "next" };
    case "job":
      return { ...state, currentJob: action.payload, status: "answered" };
    case "selectedJob":
      return { ...state, selectedJob: action.payload, status: "answered" };
    case "jobSearching":
      return {
        ...state,
        jobSearchingFor: [...action.payload],
        status: "answered",
      };
    case "region":
      return { ...state, region: [...action.payload], status: "answered" };
    default:
      throw new Error("Action unknown");
  }
}

function OptionProvider({ children }) {
  const [
    {
      school,
      schoolName,
      major,
      currentJob,
      region,
      selectedJob,
      jobSearchingFor,
      status,
      page,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const handleInputChange = (type) => (e) => {
    dispatch({ type, payload: e.target.value });
  };

  const handleNext = () => {
    console.log("click");
    dispatch({ type: "next" });
  };

  return (
    <OptionContext.Provider
      value={{
        school,
        schoolName,
        major,
        currentJob,
        selectedJob,
        region,
        jobSearchingFor,
        status,
        page,
        handleSelectChange,
        handleInputChange,
        handleNext,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
}

function useOptions() {
  const context = useContext(OptionContext);
  if (context === undefined) throw new Error("context used outside ");
  return context;
}
export { OptionProvider, useOptions };
