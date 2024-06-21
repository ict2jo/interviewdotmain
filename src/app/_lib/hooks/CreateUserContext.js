"use client";
import moment from "moment";
import { useReducer } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { URL } from "@/app/api/boot/route";
const { createContext, useContext } = require("react");
const CreateUserContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "displayDate":
      return { ...state, displayDate: action.payload };
    case "updateField":
      return { ...state, [action.field]: action.payload };
    case "birth":
      return { ...state, birth: action.payload };
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
      return { ...state, isChecked: action.payload, requiredTermsChecked: true };
    case "updateRequiredTermsChecked":
      return { ...state, requiredTermsChecked: action.payload };
    case "isSelected":
      if (action.payload === "직접작성") {
        return {
          ...state,
          email: state.email,
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
  const router = useRouter();
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
      requiredTermsChecked,
      validPw,
      isMatched,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleFieldChange = (field) => (e) => {
    dispatch({ type: "updateField", field, payload: e.target.value });
  };

  async function handleIdValidation(id) {
    const idRegex = /^[a-z0-9_-]{5,20}$/;
    if (!idRegex.test(id)) {
      alert("5-20자, 영문 소문자, 숫자, 특수문자 (-), (_)만 사용해주세요");
      return false;
    }
    try {
      const response = await axios.get(`${URL}idCheck`, {
        params: { id },
      });
      if (response.data.exists) {
        alert("아이디가 이미 사용 중입니다. 다른 아이디를 사용해주세요.");
        return false;
      } else {
        alert("사용 가능한 아이디입니다.");
        return true;
      }
    } catch (error) {
      console.error(error);
      alert("아이디 중복 체크 중 오류가 발생했습니다. 다시 시도해주세요.");
      return false;
    }
  }
  const handleOptionChange = (e) => {
    dispatch({ type: "isSelected", payload: e.target.value });
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDisplayDate = moment(date).format("YYYY년 MM월 DD일");
      const formattedDate = moment(date).format("YYMMDD");
      console.log("date", formattedDate);
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
    console.log(isMatched, "ismatched");
    console.log(isChecked, "isChecked");
    console.log(requiredTermsChecked, "requiredTermsChecked");
    console.log(id, "id");
    console.log(name, "name");
    console.log(email, "email");
    console.log(pw, "pw");
    console.log(birth, "birth");
    console.log(phone1, "phone1");
    console.log(phone2, "phone2");
    console.log(phone3, "phone3");
    console.log(phonenumber, "phonenumber");

    if (!isMatched) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    //  필수약관 체크 확인
    if (!requiredTermsChecked || !isChecked) {
      alert("필수 약관에 동의해야 합니다.");
      return false;
    }

    if (
      !id ||
      !name ||
      !email ||
      !pw ||
      !birth ||
      !phone1 ||
      !phone2 ||
      !phone3
    ) {
      alert("정보를 모두 입력해주세요.");
      return false;
    } else return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const response = await axios.post(`${URL}create`, {
        id,
        name,
        email,
        pw,
        birth,
        phonenumber,
      });
      console.log("User created:", response.data);
      router.push("/signin/optionalInfo");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

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
        requiredTermsChecked,
        validPw,
        handleFieldChange,
        handleIdValidation,
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
