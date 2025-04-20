import React, { PropsWithChildren } from 'react'
import Header from '../organisms/Header'
import { Sonner } from '../atoms/sooner'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative bg-layout overflow-hidden min-h-[100vh]">
      <div className="z-10">
        <Header />
        {children}
        <Sonner />
      </div>
      {/* Top-left background */}
      <div
        className="absolute md:top-[-100px] top-[-150px] left-[-250px] md:left-[-10%] 2xl:left-[-4%] w-[404px] h-[377px] z-[-1] select-none pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/images/top-left.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Bottom-right background */}
      <div
        className="absolute top-[55vh] md:right-[-3.5%] right-[-200px]  2xl:right-[-2%] w-[404px] h-[377px] z-[-1] select-none pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/images/bottom-right.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  )
}

export default MainLayout
