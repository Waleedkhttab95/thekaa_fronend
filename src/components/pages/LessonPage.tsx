'use client'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import AiLessonChat from '../organisms/AiLessonChat'
import LessonPlayer from '../molecules/LessonPlayer'
import LessonInfo from '../molecules/LessonInfo'
import LessonDescription from '../molecules/LessonDescription'
import { Dialog, DialogContent } from '../atoms/dialog'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const LessonPage = () => {
  const t = useTranslations('lessonPage')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const playerWrapperRef = React.useRef<HTMLDivElement>(null)
  return (
    <div className='relative'>
      <h1 className='font-bold text-xl mb-4 break-all text-wrap ps-2'>{"درس 1 :الأفعال والحروف"}</h1>

      {/* Main content area */}
      <div className='flex flex-col  lg:flex-row gap-4 mb-5'>
        {/* Video player takes full width on mobile, 65% on desktop */}
        <div className='w-full xl:w-[65%] relative aspect-video ' ref={playerWrapperRef}>
          <LessonPlayer
            url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            title='درس 1 :الأفعال والحروف'
            poster=''
          />
        </div>

        {/* Chat visible only on desktop screens */}
        <div className='hidden  xl:block w-[35%]  '
          style={{
            height: playerWrapperRef.current ? playerWrapperRef.current.clientHeight : 'auto',
          }}>
          <AiLessonChat />
        </div>
      </div>

      <LessonInfo lesson={{
        subject: "اللغة الإنجليزية",
        duration: 30
      }} />

      <LessonDescription lesson={{
        description: "هذا هو الدرس الأول في اللغة الإنجليزية. سنبدأ بتعلم الأساسيات مثل الأبجدية والأرقام وبعض العبارات الأساسية."
      }} />

      {/* Floating chat button (visible only on mobile) */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={cn(
          'xl:hidden fixed bottom-6 right-6 z-10 bg-primary rounded-full p-3 shadow-lg',
          'hover:bg-primary/90 transition-colors'
        )}
        aria-label={t("aiChat.openChat")}
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Chat dialog (mobile only) */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen} >
        <DialogContent
          className="w-[95%] h-[460px]  p-0 border-none rounded-[40px] overflow-hidden"
          hideCloseButton
        >
          <div className="h-full">
            <AiLessonChat className="rounded-none" />
            {/* <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-[-30px] bg-[#23F6F0]/50 right-3  rounded-full p-2 shadow-md"
              aria-label={t("aiChat.closeChat")}
            >
              <X className="h-5 w-5" />
            </button> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LessonPage