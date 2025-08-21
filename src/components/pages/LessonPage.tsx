/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState, useEffect } from 'react'
import AiLessonChat from '../organisms/AiLessonChat'
import StreamingAvatarChat from '../organisms/StreamingAvatarChat'
// import LessonPlayer from '../molecules/LessonPlayer' // Removed - using interactive avatar instead
import LessonInfo from '../molecules/LessonInfo'
import LessonDescription from '../molecules/LessonDescription'
import { Dialog, DialogContent } from '../atoms/dialog'
import { MessageCircle, GraduationCap, CheckCircle, X, Clock, MessageSquare } from 'lucide-react'
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
  const [showWaitingModal, setShowWaitingModal] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  // const [chatMode, setChatMode] = useState<'text' | 'avatar'>('text') // Removed - using avatar as primary interface
  const playerWrapperRef = React.useRef<HTMLDivElement>(null);
  const axiosAuth = useAxiosAuth();
  const { data, isLoading, error } = useQuery<ILessonData>({
    queryKey: ['lessonData', studentId, locale],
    queryFn: () => getLesson(axiosAuth, studentId, locale),
    enabled: !!studentId, // Only run query if studentId exists
  })
  const [messages, setMessages] = useState<AiAssistantMessage[]>([]);

  // Check for waiting status when data changes
  useEffect(() => {
    if (data?.lesson?.videoStatus === 'waiting') {
      setShowWaitingModal(true);
    }
  }, [data]);

  // Default values when data is not available
  const defaultLesson = {
    name: t('defaultTitle'),
    description: t('defaultDescription'),
    videoDuration: 15,
    subject: {
      name: t('defaultSubject'),
    }
  };

  // Use API data if available, otherwise use defaults
  const lessonData = data || defaultLesson;
  
  // Map new API response structure to legacy properties
  const lessonTitle = data?.lesson?.name || data?.name || defaultLesson.name;
  const lessonDescription = data?.lesson?.description || data?.description || defaultLesson.description;
  const subjectName = typeof data?.subject === 'string' ? data.subject : (typeof lessonData.subject === 'object' && lessonData.subject?.name || defaultLesson.subject.name);
  // const videoUrl = data?.lesson?.videoUrl || lessonData.videoUrl || defaultLesson.videoUrl; // Not needed for interactive avatar
  const videoDuration = data?.lesson?.videoDuration || lessonData?.videoDuration || defaultLesson.videoDuration;
  const mergedContent = data?.mergedContent; // New merged content for avatar knowledge base

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

  // Handle waiting modal close
  const handleCloseWaiting = () => {
    setShowWaitingModal(false);
    router.push('/dashboard'); // Redirect to dashboard
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

      {/* Main content area - Interactive Avatar Only */}
      <div className='flex flex-col lg:flex-row gap-4 mb-5'>
        {/* Interactive Avatar takes full width on mobile, 65% on desktop */}
        <div className='w-full xl:w-[65%] relative' ref={playerWrapperRef}>
          <StreamingAvatarChat 
            className="h-[400px] lg:h-[500px]" 
            lessonContent={mergedContent}
            lessonTitle={lessonTitle}
          />
        </div>

        {/* Additional Chat Options for Desktop */}
        <div className='hidden xl:block w-[35%]'>
          <div className="space-y-4">
            {/* Lesson Information Card */}
            {/* <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Lesson Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Subject:</strong> {subjectName}</p>
                <p><strong>Duration:</strong> {videoDuration} minutes</p>
                <p><strong>Type:</strong> Interactive AI Lesson</p>
              </div>
            </div> */}

            {/* Traditional Text Chat Option */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Text Chat
              </h3>
              <div style={{ height: '300px' }}>
                <AiLessonChat messages={messages} setMessages={setMessages} />
              </div>
            </div>
          </div>
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

      {/* Waiting Modal */}
      <Dialog open={showWaitingModal} onOpenChange={setShowWaitingModal}>
        <DialogContent className="w-[90%] max-w-md p-0 border-none rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("waitingTitle")}
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {t("waitingMessage")}
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleCloseWaiting}
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {t("backToDashboard")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating text chat button (visible only on mobile) */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={cn(
          'xl:hidden fixed bottom-6 right-6 z-10 bg-blue-600 rounded-full p-3 shadow-lg',
          'hover:bg-blue-700 transition-colors'
        )}
        aria-label="Open Text Chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      {/* Additional Text Chat dialog (mobile only) */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen} >
        <DialogContent
          className="w-[95%] h-[460px] p-0 border-none rounded-[40px] overflow-hidden"
          hideCloseButton
        >
          <div className="h-full p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Text Chat Assistant
              </h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-[calc(100%-60px)]">
              <AiLessonChat className="rounded-none h-full" setMessages={setMessages} messages={messages} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LessonPage
