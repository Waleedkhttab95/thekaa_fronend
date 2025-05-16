import { useTranslations } from 'next-intl'
import Image from 'next/image';
import React from 'react'
import { Button } from '../atoms/button';

const LandingHeroSection = () => {
  const t = useTranslations('HomePage.hero');
  return (
    <div className='py-4 mb-5 relative'>
      <div className="absolute size-[594px] bg-[#23F6F0]  rounded-full blur-[200px] top-48 -right-1/2"></div>
      <div className="absolute  z-20 size-[400px] bg-[url('/assets/images/bg-circle.svg')] bg-no-repeat -bottom-36 -right-36"
      >
      </div>

      <div className='relative z-20 flex flex-col md:flex-row items-center gap-5'>
        <div className="hero-content  lg:max-w-[40.3%]">
          <h1 className="text-3xl md:text-4xl mb-6  text-center md:text-start text-wrap font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,_#23F6F0_0%,_#F7AEF3_68%,_#3D313A_100%)]">
            {t("title")}
          </h1>
          <p className='md:text-2xl mb-5 text-center md:text-start text-secondary md:max-w-[80%] text-wrap'>
            {t("description")}
          </p>
          <Button variant={'outline'} className='w-full md:w-48 bg-transparent border border-white text-white '>
            {t("startTrialFree")}
          </Button>
        </div>
        <div className="hero-image">
          <Image src="/assets/images/hero-image.svg" width={700} height={548} alt="Hero Image" />
        </div>
      </div>
    </div>
  )
}

export default LandingHeroSection