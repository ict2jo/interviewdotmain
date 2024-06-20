"use client";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "next/router";

const OptionContext = createContext();

const initialState = {
  school: "",
  schoolName: "",
  major: "",
  currentJob: "",
  region: [],
  selectedJob: [],
  jobSearchingFor: [],
  page: 1,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.payload };
    case "next":
      return { ...state, page: state.page + 1 };
    case "prev":
      return { ...state, page: state.page - 1 };
    case "addItem":
      return {
        ...state,
        [action.field]: [...state[action.field], action.payload],
      };
    case "removeItem":
      if (Array.isArray(state[action.field])) {
        return {
          ...state,
          [action.field]: state[action.field].filter(
            (item) => item !== action.payload
          ),
        };
      }
      console.error(`State field ${action.field} is not an array`);
      return state;
    case "submitSuccess":
      return { ...state, submitted: true, error: null };
    case "submitFailure":
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function OptionProvider({ children }) {
  // const navigate = useNavigate();
  const [
    {
      school,
      schoolName,
      major,
      currentJob,
      region,
      selectedJob,
      jobSearchingFor,
      page,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleFieldChange = (field) => (e) => {
    dispatch({ type: "updateField", field, payload: e.target.value });
  };

  const handleNext = () => {
    dispatch({ type: "next" });
  };
  const handlePrev = () => {
    dispatch({ type: "prev" });
  };

  const handleAddItem = (field) => (item) => {
    dispatch({ type: "addItem", field, payload: item });
  };

  const handleRemoveItem = (field) => (item) => {
    dispatch({ type: "removeItem", field, payload: item });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/addInfos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state), // 현재 상태를 서버로 전송
      });

      if (response.ok) {
        dispatch({ type: "submitSuccess" });
        navigate("/");
      } else {
        const errorData = await response.json();
        dispatch({ type: "submitFailure", payload: errorData.message });
      }
    } catch (error) {
      dispatch({ type: "submitFailure", payload: error.message });
    }
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
        page,
        handleFieldChange,
        handleNext,
        handlePrev,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
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
