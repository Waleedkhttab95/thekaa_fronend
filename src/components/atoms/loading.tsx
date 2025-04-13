import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex-center'>
      <Image
        src="/assets/images/m-logo.svg"
        alt='loading...'
        width={100}
        height={100}
        className='animate-pulse'
      />
    </div>
  )
}

export default Loading