"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"


export default function FeaturesCards() {
  const features = [
    {
      title: "تعلم جماعي",
      description: "تعلم مع أصدقائك بطريقة تفاعلية",
      icon: '/assets/images/icons/e-book.svg',
      color: "#23F6F0",
      direction: "left"
    },
    {
      title: "تجربة ممتعة",
      description: "واجهة سهلة الاستخدام ومحفزة للتعلم",
      icon: '/assets/images/icons/intrestead-face.svg',
      color: "#F7AEF3",
      direction: "right"

    },
    {
      title: "معلمين متميزين",
      description: "خبراء في مجالات التعليم المختلفة",
      icon: '/assets/images/icons/parents-monitor.svg',
      color: "#23F6F0",
      direction: "right"

    },
    {
      title: "مساعدة تفاعلية",
      description: "دعم مباشر لحل المشكلات التعليمية",
      icon: '/assets/images/icons/ai-assitant.svg',
      color: "#F7AEF3",
      direction: "left"

    },
    {
      title: "تقنية متطورة",
      description: "استخدام أحدث التقنيات في التعليم",
      icon: '/assets/images/icons/ai-chat.svg',
      color: "#23F6F0",
      direction: "right"

    },
    {
      title: "تقنية متطورة",
      description: "استخدام أحدث التقنيات في التعليم",
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
            className={`rounded-3xl p-8 border border-[${feature.color}] bg-gradient-to-br overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow duration-300  h-64`}
          >
            <div className={cn(`absolute size-[297px]  bottom-[90%]  bg-[${feature.color}] blur-3xl rounded-full circle`,
              feature.direction === "left" ? `left-[60%]` : "right-[60%]"
            )}></div>
            <div className={` relative w-16 h-16 mb-6`}>
              <Image src={feature.icon} fill={true} alt={feature.title} />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-white/90 text-md md:text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
