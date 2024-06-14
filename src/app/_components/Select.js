"use client";
import React from "react";
import { useOptions } from "../_lib/hooks/OptionContext";

export default function Select({ name, children, value }) {
  const { handleSelectChange } = useOptions();
  const handleChange = (e) => {
    handleSelectChange(e);
  };
  return (
    <>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full h-10 bg-gray-200 text-gray-700 text-center leading-10"
      >{children}</select>
    </>
  );
}
