import React, { PropsWithChildren } from 'react'
import Header from '../organisms/Header'
import Image from 'next/image'
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='main-layout relative w-100vw min-h-[100vh]'>
      <Header />
      <div className='z-[1]' >{children}</div>
      <Image className='fixed top-[-121px]  left-[-100px]' src="/assets/images/top-left.svg" alt="acc" width={404} height={377} />
      <Image className='fixed bottom-[-80px] right-[-20px]' src="/assets/images/bottom-right.svg" alt="acc" width={404} height={377} />
    </div>
  )
}

export default MainLayout
