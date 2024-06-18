import React from "react";

export default function Input({
  name,
  placeholder,
  type = "text",
  onChange,
  width = "w-full",
  maxLength = null,
  value,
}) {
  return (
    <input
      type={type}
      name={name}
      className={`${width} h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs cursor-pointer`}
      placeholder={placeholder}
      onChange={onChange}
      maxLength={maxLength}
      value={value}
    />
  );
}
