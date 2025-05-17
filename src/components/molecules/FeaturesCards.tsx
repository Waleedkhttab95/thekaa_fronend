"use client"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"


export default function FeaturesCards() {
  const t = useTranslations('HomePage.features')
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

  return (
    <div className="py-10 md:py-20 px-4 md:px-8" dir="rtl">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-3xl p-8 border border-[${feature.color}] bg-gradient-to-br overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow duration-300  h-[289px]`}
          >
            <div className={cn(`absolute size-[297px]  bottom-[90%]  bg-[${feature.color}] blur-3xl rounded-full circle`,
              feature.direction === "left" ? `left-[60%]` : "right-[60%]"
            )}></div>
            <div className={` relative w-16 h-16 mb-6`}>
              <Image src={feature.icon} fill={true} alt={feature.title} />
            </div>
            <h3 className="font-pingar text-white text-lg md:text-2xl font-bold mb-1">{feature.title}</h3>
            <p className="text-white/90 text-md ">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
