import React, { PropsWithChildren } from 'react'
import Header from '../organisms/Header'
import Image from 'next/image'
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='relative w-100vw min-h-[100vh] overflow-x-hidden'>
      <Header />
      {children}
      <Image className='absolute top-[-121px] z-[-1] left-[-100px]' src="/assets/images/top-left.svg" alt="acc" width={404} height={377} />
      <Image className='absolute bottom-[-80px] z-[-1] right-[-20px]' src="/assets/images/bottom-right.svg" alt="acc" width={404} height={377} />
    </div>
  )
}

export default MainLayout