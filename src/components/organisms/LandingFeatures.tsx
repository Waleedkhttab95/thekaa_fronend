import React from 'react'
import FeaturesCards from '../molecules/FeaturesCards'
import { useTranslations } from 'next-intl'

const LandingFeatures = () => {
  const t = useTranslations('HomePage.features')
  return (
    <div id="features-section" className="relative py-28 px-2 md:px-0">

      <h2 className="section-heading !text-center ">
        {t("title")}
      </h2>
      <FeaturesCards />
    </div>
  )
}

export default LandingFeatures