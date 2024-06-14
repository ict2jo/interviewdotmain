'use client'

import React, { useState } from 'react'

export default function Term({ children, isChecked, content }) {

  const [isClicked, setIsClicked] = useState(false);
  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={isClicked || isChecked ? 'black' : 'gray'} className="w-6 h-6" onClick={handleIconClick}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <p className='text-sm ml-1'>{content}</p>
      </div>
      {children}
    </div >
  )
}
