'use client'
import React, { useEffect } from 'react'
import Term from './Term'
import termsData from '@/app/api/data/terms.json'

export default function Terms({ isChecked }) {
  const data = termsData.terms;
  const [marketing] = data[2].marketing;

  return (
    <div className='w-full'>
      <Term isChecked={isChecked} content="서비스 이용약관 동의 (필수)">
        <div className='w-full h-40 border-solid overflow-y-auto p-2 m-2'>
          {data[0].termOfService}
        </div>
      </Term>
      <Term isChecked={isChecked} content="개인정보 수집 및 이용동의 (필수)">
        <div className='w-full h-40 border-solid overflow-y-auto p-2 m-2'>
          {data[1].privacy}
        </div>

      </Term>
      <Term isChecked={isChecked} content="마케팅 정보 수신 동의(선택)">
        <div className='w-full h-40 border-solid overflow-y-auto p-2 m-2'>
          {marketing.purpose}
        </div>
      </Term>
    </div >
  )
}
