"use client";

import React from "react";

export default function Term({
  children,
  isChecked,
  isClicked,
  content,
  onClick,
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center cursor-pointer" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke={isClicked || isChecked ? "black" : "gray"}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
        <p className="text-sm ml-1">{content}</p>
      </div>
      {children}
    </div>
  );
}
