"use client"
import { useTranslations } from 'next-intl'
import Image from 'next/image';
import React from 'react'
import { Button } from '../atoms/button';
import { useRouter } from 'next/navigation';

const LandingHeroSection = () => {
  const t = useTranslations('HomePage.hero');
  const router = useRouter()
  const HandleStartClick = () => {
    router.push('/sign-up');
  }
  return (
    <div className='py-4 mb-5 relative'>
      <div className="absolute size-[250px] lg:size-[594px] bg-[#23F6F0]  rounded-full blur-[120px] lg:blur-[200px] top-48 -right-1/2"></div>
      <div className="absolute  z-20 size-[150px] lg:size-[400px] bg-[url('/assets/images/bg-circle.svg')] bg-cover bg-no-repeat top-56 lg:top-90 -right-24  lg:-right-36"
      >
      </div>

      <div className='relative z-20 flex flex-col md:flex-row items-center gap-5'>
        <div className="hero-content  lg:max-w-[40.3%]">
          <h1 className="section-heading">
            {t("title")}
          </h1>
          <p className='md:text-2xl mb-5 text-center md:text-start text-secondary md:max-w-[80%] '>
            {t("description")}
          </p>
          <Button variant={'outline'} className='block w-1/2 mx-auto md:mx-0 md:w-48 bg-transparent border border-white text-white ' onClick={HandleStartClick}>
            {t("startTrialFree")}
          </Button>
        </div>
        <div className="hero-image select-none">
          <Image src="/assets/images/hero-image.svg" width={700} height={548} alt="Hero Image" />
        </div>
      </div>
    </div>
  )
}

export default LandingHeroSection