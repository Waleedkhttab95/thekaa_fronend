import { useTranslations } from 'next-intl'
import React from 'react'
import AiLessonChat from '../organisms/AiLessonChat'

const LessonPage = () => {
  const t = useTranslations('lessonPage')
  return (
    <div>
      <h1 className='font-bold text-xl'>{t("lessonName")}</h1>
      <div className='flex gap-4'>
        <div className='w-[65%]'></div>
        <AiLessonChat />
      </div>
    </div>
  )
}

export default LessonPage