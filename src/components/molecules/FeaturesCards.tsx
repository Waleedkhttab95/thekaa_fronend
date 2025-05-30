"use client"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function FeaturesCards() {
  const t = useTranslations('HomePage.features')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      title: t("feature1.title"),
      description: t("feature1.description"),
      icon: '/assets/images/icons/e-book.svg',
      color: "#23F6F0",
      direction: "left"
    },
    {
      title: t("feature2.title"),
      description: t("feature2.description"),
      icon: '/assets/images/icons/intrestead-face.svg',
      color: "#F7AEF3",
      direction: "right"
    },
    {
      title: t("feature3.title"),
      description: t("feature3.description"),
      icon: '/assets/images/icons/parents-monitor.svg',
      color: "#23F6F0",
      direction: "right"
    },
    {
      title: t("feature4.title"),
      description: t("feature4.description"),
      icon: '/assets/images/icons/ai-assitant.svg',
      color: "#F7AEF3",
      direction: "left"
    },
    {
      title: t("feature5.title"),
      description: t("feature5.description"),
      icon: '/assets/images/icons/ai-chat.svg',
      color: "#23F6F0",
      direction: "right"
    },
    {
      title: t("feature6.title"),
      description: t("feature6.description"),
      icon: '/assets/images/icons/users.svg',
      color: "#F7AEF3",
      direction: "right"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="py-10 md:py-20 px-4 md:px-8" dir="rtl" ref={ref}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className={`rounded-3xl p-8 border border-[${feature.color}] bg-gradient-to-br overflow-hidden relative shadow-lg hover:shadow-xl transition-all duration-300 h-[289px]`}
          >
            <motion.div 
              className={cn(`absolute size-[297px] bottom-[90%] bg-[${feature.color}] blur-3xl rounded-full circle`,
                feature.direction === "left" ? `left-[60%]` : "right-[60%]"
              )}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className={`relative w-16 h-16 mb-8`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={feature.icon} fill={true} alt={feature.title} />
            </motion.div>
            <h3 className="font-pingar text-[#f8f8f8] text-xl md:text-3xl font-extrabold mb-3" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', letterSpacing: '-0.02em' }}>{feature.title}</h3>
            <p className="text-[#f0f0f0] text-lg leading-relaxed" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
