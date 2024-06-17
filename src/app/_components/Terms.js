"use client";
import React, { useEffect, useState } from "react";
import Term from "./Term";
import termsData from "@/app/api/data/terms.json";
import { useCreateUser } from "../_lib/hooks/CreateUserContext";

export default function Terms() {
  const data = termsData.terms;
  const [marketing] = data[2].marketing;
  const { isChecked, requiredTermsChecked, dispatch } = useCreateUser();
  const [clickedTerms, setClickedTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  useEffect(() => {
    const areRequiredTermsChecked =
      clickedTerms.service && clickedTerms.privacy;
    dispatch({
      type: "updateRequiredTermsChecked",
      payload: areRequiredTermsChecked,
    });
  }, [clickedTerms, dispatch]);

  const handleIconClick = (term) => {
    setClickedTerms((prev) => ({
      ...prev,
      [term]: !prev[term],
    }));
  };

  return (
    <div className="w-full">
      <Term
        isChecked={isChecked}
        isClicked={clickedTerms.service}
        content="서비스 이용약관 동의 (필수)"
        onClick={() => handleIconClick("service")}
      >
        <div className="w-full h-40 border-solid overflow-y-auto p-2 m-2">
          {data[0].termOfService}
        </div>
      </Term>
      <Term
        isChecked={isChecked}
        isClicked={clickedTerms.privacy}
        content="개인정보 수집 및 이용동의 (필수)"
        onClick={() => handleIconClick("privacy")}
      >
        <div className="w-full h-40 border-solid overflow-y-auto p-2 m-2">
          {data[1].privacy}
        </div>
      </Term>
      <Term
        isChecked={isChecked}
        isClicked={clickedTerms.marketing}
        content="마케팅 정보 수신 동의(선택)"
        onClick={() => handleIconClick("marketing")}
      >
        <div className="w-full h-40 border-solid overflow-y-auto p-2 m-2">
          {marketing.purpose}
        </div>
      </Term>
    </div>
  );
}
