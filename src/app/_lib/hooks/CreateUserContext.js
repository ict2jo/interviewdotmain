"use client";
import moment from "moment";
import { useReducer } from "react";
import { useSession } from "next-auth/react";
const { createContext, useContext } = require("react");

const CreateUserContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "displayDate":
      return { ...state, displayDate: action.payload };
    case "updateField":
      return { ...state, [action.field]: action.payload };
    case "showTerms":
      return { ...state, showTerms: action.payload };
    case "isChecked":
      return { ...state, isChecked: action.payload };
    case "isSelected":
      if (action.payload === "직접작성") {
        return {
          ...state,
          email: state.email + "@" + action.payload,
          isCustomDomain: true,
        };
      } else {
        return {
          ...state,
          selectedOption: action.payload,
          isCustomDomain: false,
          email: `${state.email}@${action.payload}`,
        };
      }
    default:
      return state;
  }
}

function CreateUserProvider({ children }) {
  const { data: session } = useSession();
  const initialState = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    birth: "",
    id: "",
    pw: "",
    checkPw: "",
    displayDate: "",
    phone: "",
    showTerms: false,
    isChecked: false,
    selectedOption: "",
    isCustomDomain: false,
    requiredTermsChecked: false,
  };
  const [
    {
      name,
      email,
      birth,
      id,
      pw,
      checkPw,
      phone,
      showTerms,
      isChecked,
      displayDate,
      selectedOption,
      isCustomDomain,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleFieldChange = (field) => (e) => {
    dispatch({ type: "updateField", field, payload: e.target.value });
  };
  function validateId(id) {
    const idRegex = /^[a-z0-9_-]{5,20}$/;
    if (!idRegex.test(id)) {
      alert("5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용해주세요");
      return false;
    }
    return true;
  }

  const handleOptionChange = (e) => {
    dispatch({ type: "isSelected", payload: e.target.value });
  };
  function validatePw(pw) {
    const pwRegex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[_-])(?=.*[^a-zA-Z0-9_-]).{8,16}$/;
    if (!pwRegex.test(pw)) {
      alert("5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용해주세요");
      return false;
    }
    return true;
  }
  const handleDateChange = (date) => {
    if (date) {
      const formattedDisplayDate = moment(date).format("YYYY년 MM월 DD일");
      const formattedDate = moment(date).format("YYMMDD");
      dispatch({ type: "displayDate", payload: formattedDisplayDate });
      dispatch({ type: "birth", payload: formattedDate });
    }
  };

  function validateForm() {
    if (pw !== checkPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    //  필수약관 체크 확인
    if (!state.requiredTermsChecked) {
      alert("필수 약관에 동의해야 합니다.");
      return false;
    }
    if (isChecked) return true;

    // 아이디 중복체크 확인

    //인풋 전체 필드 입력 확인

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    //`회원가입 처리
    // createUser({ name, email, birth, id, pw, phone });
  };

  return (
    <CreateUserContext.Provider
      value={{
        name,
        email,
        birth,
        id,
        pw,
        checkPw,
        phone,
        showTerms,
        isChecked,
        displayDate,
        selectedOption,
        isCustomDomain,
        handleFieldChange,
        validateId,
        validatePw,
        handleDateChange,
        validateForm,
        handleSubmit,
        dispatch,
        handleOptionChange,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
}

function useCreateUser() {
  const context = useContext(CreateUserContext);
  if (context === undefined) throw new Error("context used outside ");
  return context;
}

export { CreateUserProvider, useCreateUser };
