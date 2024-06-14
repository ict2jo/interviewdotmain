import { createContext, useContext, useReducer } from "react";

const OptionContext = createContext();

const initialState = {
  school: null,
  nameOfSchool: null,
  major: null,
  job: null,
  region: [],
  jobSearchingFor: [],
  status: "ready",
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "selected":
      return { ...state, school: action.payload, status: "answered" };
    case "schoolName":
      return { ...state, nameOfSchool: action.payload, status: "answered" };
    case "major":
      return { ...state, major: action.payload, status: "answered" };
    case "next":
      return { ...state, page: state.page + 1, status: "next" };
    case "job":
      return { ...state, job: action.payload, status: "answered" };
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
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OptionContext.Provider value={{ state, dispatch }}>
      {children}
    </OptionContext.Provider>
  );
}

function useOption() {
  const context = useContext(OptionContext);
  if (context === undefined)
    throw new Error("OptionContext was used outside of the OptionProvider");
  return context;
}

export { OptionProvider, useOption };
