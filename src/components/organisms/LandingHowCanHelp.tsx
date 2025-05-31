"use client"

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from "next-intl"
import LandingHowCanHelpCard from "../molecules/LandingHowCanHelpCard"


// Define a type for our feature items
type FeatureItem = {
  icon: string
  title: string
  description: string
  bgColor: string
}

const LandingHowCanHelp = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const t = useTranslations('HomePage.howcanhelp')
  // Dynamic data array for features
  const features: FeatureItem[] = [
    {
      icon: '/assets/images/icons/graduate-student.svg',
      title: t("cards.card1.title"),
      description: t("cards.card1.description"),
      bgColor: "bg-white",
    },
    {
      icon: '/assets/images/icons/open-book.svg',
      title: t("cards.card2.title"),
      description: t("cards.card2.description"),
      bgColor: "bg-white",
    },
    {
      icon: '/assets/images/icons/pencil-ruler.svg',
      title: t("cards.card3.title"),
      description: t("cards.card3.description"),
      bgColor: "bg-white",
    },
    {
      icon: '/assets/images/icons/graduate-student.svg',
      title: t("cards.card4.title"),
      description: t("cards.card4.description"),
      bgColor: "bg-white",
    },
  ]

  return (
    <div id="howWeCanHelp-section" className="relative py-20 px-2 md:px-0">
      <div className="absolute size-[250px] lg:size-[594px] bg-[#23F6F0]  rounded-full blur-[120px] lg:blur-[200px] bottom-16 -right-1/2"></div>
      <div className="hidden lg:block absolute  z-20 size-[150px] lg:size-[400px] bg-[url('/assets/images/bg-circle.svg')] bg-cover bg-no-repeat top-56 lg:top-96 -right-24  lg:-right-36"
      ></div>
      <div className="absolute size-[250px] lg:size-[594px] bg-[#F7AEF3]  rounded-full blur-[120px] lg:blur-[200px] -top-48 -left-1/2"></div>
      <div className="hidden lg:block absolute  z-20 size-[150px] lg:size-[400px] bg-[url('/assets/images/bg-circle.svg')]  bg-no-repeat -top-5 lg:-top-24 -left-24  lg:-left-60"
      ></div>
      <div className=" py-20 px-4 mb-5 rounded-[40px] md:px-8 bg-[#22e3e3]" >

        <motion.div 
          ref={ref}
          className="max-w-7xl mx-auto relative z-30"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-center text-4xl md:text-5xl font-extrabold mb-16 text-[#1a1a1a]"
            style={{ letterSpacing: '-0.02em' }}
            variants={itemVariants}
          >
            {t("title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={`how-can-help-${index}`}
                variants={itemVariants}
              >
                <LandingHowCanHelpCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  bgColor={feature.bgColor}
                />
              </motion.div>
            ))}

          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingHowCanHelp
