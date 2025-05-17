"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

type FaqItem = {
  question: string
  answer: string
}

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState(0)
  const t = useTranslations("HomePage.faq")
  const faqItems: FaqItem[] = [
    {
      question: t("questions.question1.question"),
      answer: t("questions.question1.answer"),

    },
    {
      question: t("questions.question2.question"),
      answer: t("questions.question2.answer"),
    },
    {
      question: t("questions.question3.question"),
      answer: t("questions.question3.answer"),
    },
    {
      question: t("questions.question4.question"),
      answer: t("questions.question4.answer"),
    },
  ]

  return (
    <div className="py-10 md:py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl  font-bold mb-16 bg-gradient-to-r from-[#22e3e3] via-[#dd8ee0] to-[#ffb6e1] bg-clip-text text-transparent">
          اطمئن، جهّزنا لك كل الإجابات
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-xl relative overflow-hidden border border-[#23F6F0]">
              {/* Glow splashes */}
              <div className="absolute z-10 w-[400px] h-[200px] bg-[#23F6F0] blur-[140px] rounded-full  bottom-0 left-[95%] -rotate-3" />

              <button
                className="relative  w-full flex justify-between items-center p-6 bg-[#222] text-right"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="text-md md:text-xl font-bold text-[#22e3e3]">{item.question}</span>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#22e3e3]">
                  {openIndex === index ? (
                    <X size={18} strokeWidth={3} className="text-[#222]" />
                  ) : (
                    <Plus size={18} strokeWidth={3} className="text-[#222]" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#222] relative  text-white"
                  >
                    <div className="p-6 pt-0">
                      <p className="text-md md:text-lg">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}
