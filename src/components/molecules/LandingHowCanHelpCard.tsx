import Image from 'next/image'
import React from 'react'
type props = {
  icon: string
  title: string
  description: string
  bgColor: string
}
const LandingHowCanHelpCard = ({ icon, title, description, bgColor }: props) => {
  return (
    <div className="relative">
      <div className="absolute -z-0 -top-2 -right-2 w-full h-full rounded-[40px] bg-[#222]" />

      <div className={`${bgColor} relative z-10 rounded-[40px] p-8 border border-black md:min-h-[400px] lg:min-h-[297px]`}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-6">
            <Image width={50} height={60} src={icon} alt={title} className="w-auto h-auto" />
          </div>
          <h3 className="text-center text-2xl font-bold mb-4">{title}</h3>
          <p className="text-center text-lg">{description}</p>
        </div>
      </div>
    </div>)
}

export default LandingHowCanHelpCard