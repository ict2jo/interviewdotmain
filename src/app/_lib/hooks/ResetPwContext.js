"use client";
import { URL } from "@/app/api/boot/route";
import menuStore from "@/stores/MenuStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useReducer, useContext } from "react";

const ResetPwContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.payload };
    case "verified":
      return { ...state, verified: true };
    case "init":
      return { ...state, pw: "" };
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
  }
}

function ResetPwProvider({ children }) {
  const initialState = {
    id: "",
    name: "",
    email: "",
    pw: "",
    checkPw: "",
    authCode: "",
    verified: false,
    isMatched: false,
    validPw: false
  }

  const [{ id, name, email, pw, checkPw, authCode, verified, isMatched, validPw }, dispatch] = useReducer(reducer, initialState)


  const handleFieldChange = (field) => (e) => {
    dispatch({ type: "updateField", field, payload: e.target.value });
  };

  async function handleGetCode(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}findPw`, {
        id: id,
        email: email,
        name: name,
      });
      alert("인증번호를 이메일로 보냈습니다.")
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("회원님의 정보를 찾을 수 없습니다.");
      } else {
        console.error("인증번호 오류:", err);
      }
    }
  }

  async function handleFindPwSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}verifyCode`, {
        email: email,
        authCode: authCode,
      });
      if (res.status === 200) {
        dispatch({ type: "verified" });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("인증번호가 틀렸습니다");
      } else {
        console.error("Auth code verification request error:", err);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}resetPw`, {
        pw: pw,
        id: id,
      });
      if (res.status === 200) {
        alert("비밀번호를 변경했습니다.")
        menuStore.setSelectedMenu("login")
      }
    } catch (err) {
      console.error("비밀번호 변경 오류:", err);
    }
  }


  return (
    <ResetPwContext.Provider value={{ dispatch, id, name, email, pw, checkPw, authCode, verified, isMatched, validPw, handleFindPwSubmit, handleReset, handleGetCode, handleFieldChange }}>

      {children}
    </ResetPwContext.Provider>
  )
}

function useResetPw() {
  const context = useContext(ResetPwContext);
  if (context === undefined) throw new Error("context used outside ");
  return context;
}

export { ResetPwProvider, useResetPw }