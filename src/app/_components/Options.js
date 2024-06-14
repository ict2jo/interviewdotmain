"use client";
import React from "react";
import Input from "../_components/Input";
import { useOptions } from "../_lib/hooks/OptionContext";
import OptionContainer from "./OptionContainer";

export default function Options() {
  const {
    school,
    schoolName,
    major,
    handleSelectChange,
    handleInputChange,
    handleNext,
    page
  } = useOptions();



  return (
    <>
      <OptionContainer span='학력' text=" 최종학력을 입력해주세요">
        <select
          name="school"
          onChange={handleSelectChange}
          className="w-full h-10 bg-gray-200 text-gray-700 text-center leading-10"
        >
          <option value="">+</option>
          <option value="primary">초등학교 졸업</option>
          <option value="middle">중학교 졸업</option>
          <option value="high">고등학교 졸업</option>
          <option value="college">대학(2,3년)</option>
          <option value="uni">대학(4년)</option>
          <option value="master">대학원</option>

        </select>
      </OptionContainer>


      {school && (
        <>
          <Input
            placeholder="학교명을 입력해주세요 예)고려대학교"
            onChange={handleInputChange("schoolName")}
            name="schoolName"
          />

          <Input
            placeholder="전공을 입력해주세요"
            onChange={handleInputChange("major")}
            name="major"
          />
        </>
      )}
      <button
        className="mt-4 p-2 bg-primary-500 text-white"
        onClick={handleNext}

      >
        다음
      </button>
    </>
  );
}
