import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const LandingTeachingWay = () => {
  const t = useTranslations("HomePage.learningWay")
  return (
    <div className='py-4 mb-5 relative flex flex-col md:flex-row gap-5 items-center'>
      <div className="absolute size-[250px] lg:size-[291px] bg-[#23F6F0]  rounded-full blur-[120px] lg:blur-[200px] top-1/2 lg:-top-36 -left-60"></div>
      <div className="hidden lg:block absolute  z-20 size-[150px] lg:size-[300px] bg-[url('/assets/images/bg-circle.svg')] bg-cover bg-no-repeat bottom-0   lg:-right-60"></div>
      <div className="content flex-1 relative z-30">
        <h2 className="section-heading">
          {t("title")}
        </h2>
        <p className='font-pingar md:text-2xl mb-2 text-center md:text-start text-secondary md:max-w-[90%] text-wrap select-none'>
          {t("description1")}
        </p>
        <p className='font-pingar md:text-2xl text-center md:text-start text-secondary md:max-w-[90%] text-wrap select-none'>
          {t("description2")}
        </p>
      </div>
      <div className="image flex-1 select-none">
        <Image className='mx-auto' src={"/assets/images/subjects.svg"} width={517} height={702} alt={t("title")} />
      </div>
    </div>
  )
}

export default LandingTeachingWay