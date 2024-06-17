import React from "react";

export default function Input({
  name,
  placeholder,
  type = "text",
  handleChange,
  width = "w-full",
}) {
  return (
    <input
      type={type}
      name={name}
      className={`${width} h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs cursor-pointer`}
      placeholder={placeholder}
    />
  );
}
