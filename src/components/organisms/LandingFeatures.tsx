import React from 'react'
import FeaturesCards from '../molecules/FeaturesCards'

const LandingFeatures = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl text-center mb-6 md:pt-10 text-wrap font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,_#23F6F0_0%,_#F7AEF3_68%,_#3D313A_100%)]">
        ما الذي يميز تجربة ذكاء؟
      </h2>
      <FeaturesCards />
    </div>
  )
}

export default LandingFeatures