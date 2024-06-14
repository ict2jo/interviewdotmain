import React from 'react'

export default function OptionContainer({ span, text, children }) {
  return (
    <div className="flex flex-col">
      <div className="my-2">
        <span className="text-bold mx-1">{span}</span>
        <span className="text-xs text-gray-700 mx-2">
          {text}
        </span>
      </div>
      {children}
    </div>
  )
}