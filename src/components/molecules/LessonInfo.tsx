import { Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
type props = {
  lesson: {
    subject: string
    duration: number
  }
}
const LessonInfo = ({ lesson }: props) => {
  const t = useTranslations('lessonPage.lessonInfo')
  return (
    <div className='flex flex-col md:flex-row gap-4 mb-5'>
      <div className='px-5 py-2 bg-[#23F6F0] rounded-[40px] flex items-center justify-center md:justify-start gap-2'>
        <span className='font-bold'>{lesson.subject}</span>
      </div>
      <div className='px-5 py-2 bg-[#23F6F0]/20 rounded-[40px] flex justify-center md:justify-start items-center gap-1'>
        <Clock></Clock>
        <span className='font-bold'>{t("duration")}</span>
        <span>:</span>
        <span className='text-muted-foreground'>{t("durationValue", {
          duration: lesson.duration
        })}</span>
      </div>
    </div>
  )
}

export default LessonInfo