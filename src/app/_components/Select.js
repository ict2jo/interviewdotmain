"use client";
import React from "react";

export default function Select({
  name,
  children,
  value,
  multiple,
  onChange,
  height = "h-10",
}) {

  return (
    <select
      name={name}
      value={value}
      multiple={multiple}
      onChange={onChange}
      className={`w-full ${height} bg-gray-200 text-gray-700 text-center rounded-xl leading-10}`}
    >
      {children}
    </select>
  );
}
