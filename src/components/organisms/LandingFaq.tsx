"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type FaqItem = {
  question: string
  answer: string
}

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqItems: FaqItem[] = [
    {
      question: "هل المنصة آمنة لطفلي؟",
      answer: "أبداً. خصوصية وأمان طفلك أولوية عندنا. كل البيانات محفوظة ومحمية بأعلى معايير الأمان.",
    },
    {
      question: "هل أقدر أتابع تقدم طفلي؟",
      answer:
        "نعم، توفر منصة ذكاء لوحة تحكم خاصة للآباء تمكنك من متابعة تقدم طفلك بشكل مفصل، ومعرفة المهارات التي أتقنها والمجالات التي تحتاج إلى تحسين.",
    },
    {
      question: "لأي أعمار المنصة مناسبة؟",
      answer:
        "منصة ذكاء مصممة للأطفال من سن 6 إلى 14 سنة، مع محتوى تعليمي مخصص لكل فئة عمرية بما يتناسب مع قدراتهم ومستوى تطورهم.",
    },
    {
      question: "هل يحتاج إشراف دائم مني؟",
      answer:
        "لا، المنصة مصممة لتكون آمنة وسهلة الاستخدام للأطفال. ومع ذلك، نشجع المشاركة الأبوية الدورية لمتابعة تقدم الطفل ودعم رحلته التعليمية.",
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
