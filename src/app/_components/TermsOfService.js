import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <>
      <div className='border-b border-gray-300 py-5 flex justify-between'>
        <h1 className='text-3xl text-extrabold'>서비스 이용약관 </h1>
        <Link href='/createUser'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </Link>
      </div>
      <div>
        <pre className='whitespace-pre-wrap break-words'>
          {``}
        </pre>
      </div>
    </>
  )
}
