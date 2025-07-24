/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import AiLessonChat from '../organisms/AiLessonChat'
import LessonPlayer from '../molecules/LessonPlayer'
import LessonInfo from '../molecules/LessonInfo'
import LessonDescription from '../molecules/LessonDescription'
import { Dialog, DialogContent } from '../atoms/dialog'
import { MessageCircle, AlertCircle, GraduationCap, CheckCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getLesson } from '@/services/lesson'
import { getCookie } from 'cookies-next/client'
import { Locales } from '@/types/locales.enum'
import { ILessonData } from '@/types/lesson'
import Loading from '../atoms/loading'
import { useAxiosAuth } from '@/hooks/useAxiosAuth'
import { AiAssistantMessage } from '@/services/content'
import { useRouter } from 'next/navigation'

const LessonPage = () => {
  const router = useRouter()
  const t = useTranslations('lessonPage');
  const locale = useLocale() as Locales;
  const studentId = getCookie("current_user") as string;
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const playerWrapperRef = React.useRef<HTMLDivElement>(null);
  const axiosAuth = useAxiosAuth();
  const { data, isLoading, error } = useQuery<ILessonData>({
    queryKey: ['lessonData', studentId, locale],
    queryFn: () => getLesson(axiosAuth, studentId, locale),
    enabled: !!studentId, // Only run query if studentId exists
  })
  const [messages, setMessages] = useState<AiAssistantMessage[]>([]);


  // Default values when data is not available
  const defaultLesson = {
    name: t('defaultTitle'),
    description: t('defaultDescription'),
    videoUrl: "",
    videoDuration: 15,
    subject: {
      name: t('defaultSubject'),
    }
  };

  // Use API data if available, otherwise use defaults
  const lessonData = data || defaultLesson;
  const lessonTitle = lessonData.name || defaultLesson.name;
  const lessonDescription = lessonData.description || defaultLesson.description;
  const subjectName =  lessonData.subject?.name || defaultLesson.subject.name;
  const videoUrl = lessonData.videoUrl || defaultLesson.videoUrl;
  const videoDuration = lessonData?.videoDuration || defaultLesson.videoDuration;

  // Handle video end event
  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setShowCompletionModal(true);
  };

  // Handle lesson completion
  const handleCompleteLesson = async () => {
    try {
      // Call the completion API
      const response = await axiosAuth.post(`education_plan/education_plan/complete-lesson/${studentId}`, {
        lessonId: data?.currentLessonId || ''
      });

      setShowCompletionModal(false);
      router.push('/dashboard') // TODO: Navigate to Dashboard
      // You might want to navigate to next lesson or dashboard
      // router.push('/dashboard') or router.push('/next-lesson')
    } catch (error) {
      console.error('Error completing lesson:', error);
      // Handle error (show toast, etc.)

    }
  };

  // Handle cancel completion
  const handleCancelCompletion = () => {
    setShowCompletionModal(false);
    setIsVideoEnded(false);
  };

  // Handle manual complete button click
  const handleManualComplete = () => {
    setShowCompletionModal(true);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className='relative min-h-[60vh] flex items-center justify-center'>
        <Loading width={120} height={120} />
      </div>
    );
  }

  // Handle error state
  if (error) {
    console.error('Error loading lesson:', error);
    // Continue with default values on error
  }

  return (
    <div className='relative'>
      <h1 className='flex gap-2 items-center text-lg mb-4 break-all text-wrap ps-2'>
        <GraduationCap />
        <span className="font-bold">
          {t("lessonName")}
        </span>
        <span>:</span>
        <span>{lessonTitle}</span>
      </h1>

      {/* Main content area */}
      <div className='flex flex-col  lg:flex-row gap-4 mb-5'>
        {/* Video player takes full width on mobile, 65% on desktop */}
        <div className='w-full xl:w-[65%] relative aspect-video ' ref={playerWrapperRef}>
          {videoUrl && videoUrl !== defaultLesson.videoUrl ? (
            <LessonPlayer
              url={videoUrl}
              title={lessonTitle}
              poster=''
              onVideoEnd={handleVideoEnd}
            />
          ) : data && !data.videoUrl ? (
            // Show "lesson not available" when data is fetched but no video URL
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col items-center justify-center p-8 border border-gray-700">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">!</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {t("lessonNotFound")}
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md">
                    {t("lessonNotFoundDescription")}
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          ) : (
            // Show default video when no data is fetched yet or using fallback
            <LessonPlayer
              url={videoUrl}
              title={lessonTitle}
              poster=''
              onVideoEnd={handleVideoEnd}
            />
          )}
        </div>

        {/* Chat visible only on desktop screens */}
        <div className='hidden  xl:block w-[35%]  '
          style={{
            height: playerWrapperRef.current ? playerWrapperRef.current.clientHeight : 'auto',
          }}>
          <AiLessonChat messages={messages} setMessages={setMessages} />
        </div>
      </div>

      <LessonInfo lesson={{
        subject: subjectName,
        duration: videoDuration
      }} />

      <LessonDescription lesson={{
        description: lessonDescription
      }} />

      {/* Complete Lesson Button */}
      <div className="mt-4">
        <button
          onClick={handleManualComplete}
          className="bg-green-500 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5" />
          {t("completeLesson")}
        </button>
      </div>

      {/* Lesson Completion Modal */}
      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="w-[90%] max-w-md p-0 border-none rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("congratulations")}
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {t("lessonCompleted")}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCompleteLesson}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {t("complete")}
              </button>

              <button
                onClick={handleCancelCompletion}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {t("stayInLesson")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
            <AiLessonChat className="rounded-none" setMessages={setMessages} messages={messages} />
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
