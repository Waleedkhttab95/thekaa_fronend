import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
type props = {
  lesson: {
    description: string
  }
}
const LessonDescription = ({
  lesson
}: props) => {
  const t = useTranslations('lessonPage.lessonDescription')
  return (
    <div className='w-full lg:w-[65%] h-full bg-white rounded-[40px] py-4 px-6 border'>
      <div className='flex items-center gap-2 mb-3'>
        <Image
          src="/assets/images/icons/comment.svg"
          width={22}
          height={20}
          alt={t("title")}
        />
        <h3 className='font-bold text-lg'>{t("title")}</h3>
      </div>
      <div >
        <p className='text-muted-foreground text-wrap'>{lesson.description}</p>
      </div>
    </div>
  )
}

export default LessonDescription