"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

type Step = {
  number: string
  title: string
  description: string
}

export default function JourneySteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const t = useTranslations("HomePage.journeySteps");
  const containerRef = useRef<HTMLDivElement>(null)

  const steps: Step[] = [
    {
      number: "01",
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),

    },
    {
      number: "02",
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
    },
    {
      number: "03",
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
    },
    {
      number: "04",
      title: t("steps.step4.title"),
      description: t("steps.step4.description"),
    }
  ]

  // Auto-advance functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [steps.length])



  return (
    <div ref={containerRef} id="journey-section" className="py-24 px-4 md:px-8 min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-heading !text-center !mb-16" initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        <div className="flex flex-col md:flex-row">
          {/* Steps content - full width on mobile, 50% on larger screens */}
          <div className="w-full md:w-1/2 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 select-none"
              >
                <div className="flex flex-col  h-full">
                  <div className="text-[#22e3e3] text-8xl md:text-9xl lg:text-[12rem] font-bold mb-4">
                    {steps[currentStep].number}
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#22e3e3]">{steps[currentStep].title}</h3>
                    <p className="text-lg text-white">{steps[currentStep].description}</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <DecorativeElements />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image - full width on mobile, 50% on larger screens */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center select-none">
            <motion.img
              src="/assets/images/Illustration.svg"
              alt="Journey illustration"
              className="w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>


      </div>
    </div>
  )
}

function DecorativeElements() {
  return (
    <>
      {/* Pink elements */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[#ffb6e1] left-10 top-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-[#ffb6e1] left-20 top-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.div
        className="absolute w-16 h-2 rounded-full bg-[#ffb6e1] left-0 top-0 -rotate-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#ffb6e1] right-40 top-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />

      {/* Cyan elements */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#22e3e3] left-30 top-60"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-[#22e3e3] left-40 top-80"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <motion.div
        className="absolute w-16 h-2 rounded-full bg-[#22e3e3] left-20 bottom-20 rotate-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
      <motion.div
        className="absolute w-16 h-2 rounded-full bg-[#22e3e3] right-20 bottom-10 -rotate-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </>
  )
}
