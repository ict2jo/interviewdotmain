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
    case "validatePw":
      const pwRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      if (!pwRegex.test(action.payload)) {
        return { ...state, validPw: false };
      }
      return { ...state, pw: action.payload, validPw: true };

    case "checkPw":
      return {
        ...state,
        checkPw: action.payload,
        isMatched: state.pw === action.payload,
      };
    case "updatePhone":
      const { phone1, phone2, phone3 } = state;
      const phonenumber = `${phone1}-${phone2}-${phone3}`;
      return { ...state, phonenumber };
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
    phone1: "",
    phone2: "",
    phone3: "",
    phonenumber: "",
    showTerms: false,
    isChecked: false,
    selectedOption: "",
    isCustomDomain: false,
    requiredTermsChecked: false,
    isMatched: false,
    validPw: false,
  };
  const [
    {
      name,
      email,
      birth,
      id,
      pw,
      checkPw,
      phone1,
      phone2,
      phone3,
      phonenumber,
      showTerms,
      isChecked,
      displayDate,
      selectedOption,
      isCustomDomain,
      validPw,
      isMatched,
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

  const handleDateChange = (date) => {
    if (date) {
      const formattedDisplayDate = moment(date).format("YYYY년 MM월 DD일");
      const formattedDate = moment(date).format("YYMMDD");
      dispatch({ type: "displayDate", payload: formattedDisplayDate });
      dispatch({ type: "birth", payload: formattedDate });
    }
  };

  function handleNumberChange(field) {
    return (e) => {
      let value = e.target.value;

      const maxLength = 4;
      if (value.length > maxLength) {
        value = value.slice(0, maxLength);
      }
      dispatch({ type: "updateField", field, payload: value });

      if (field === "phone1" || field === "phone2" || field === "phone3") {
        dispatch({ type: "updatePhone" });
      }
    };
  }
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
        dispatch,
        name,
        email,
        birth,
        id,
        pw,
        checkPw,
        isMatched,
        phone1,
        phone2,
        phone3,
        phonenumber,
        showTerms,
        isChecked,
        displayDate,
        selectedOption,
        isCustomDomain,
        handleFieldChange,
        validateId,
        validPw,
        handleDateChange,
        validateForm,
        handleSubmit,
        handleOptionChange,
        handleNumberChange,
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
