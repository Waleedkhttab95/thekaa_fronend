import React from 'react'
import LandingHeader from '../organisms/LandingHeader'
import LandingHeroSection from '../organisms/LandingHeroSetion'
import LandingTeachingWay from '../organisms/LandingTeachingWay'
import LandingFeatures from '../organisms/LandingFeatures'
import LandingHowCanWeHelp from '../organisms/LandingHowCanHelp'
import LandingFaq from '../organisms/LandingFaq'
import LandingFooter from '../organisms/LandingFooter'
import TestimonialSlider from '../organisms/LandingTestnomials'

const LandingPage = () => {
  return (
    <div className='bg-[#232122] relative overflow-x-hidden'>
      <div className="absolute size-[594px] bg-[#F7AEF3]  rounded-full blur-[200px] -top-48 -left-48"></div>

      <div className='w-[95%] md:w-[90%] lg:w-[83%] mx-auto relative z-20'>
        <LandingHeader />
        <LandingHeroSection />
        <LandingTeachingWay />
        <LandingFeatures />
        <LandingHowCanWeHelp />
      </div>
      <TestimonialSlider />
      <div className='w-[95%] md:w-[90%] lg:w-[83%] mx-auto '>

        <LandingFaq />
      </div>

      <LandingFooter />
    </div>
  )
}

export default LandingPage