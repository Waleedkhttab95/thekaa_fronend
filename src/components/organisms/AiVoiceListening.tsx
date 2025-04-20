import Image from 'next/image'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../atoms/tooltip'
import { useTranslations } from 'next-intl'

type props = {
  handleStopVoiceClick: () => void
  handleCancelClick: () => void
  isRecording?: boolean
  isProcessing?: boolean
  formattedTime?: string
}
const AiVoiceListening = ({ handleStopVoiceClick, handleCancelClick, formattedTime }: props) => {
  const t = useTranslations("aiChatPage")

  return (
    <div>
      <div className='flex-center rounded-full mx-auto size-[141px] bg-white animate-pulse mb-8'>
        <Image src="/assets/images/m-logo.svg" alt="logo" width={81} height={76} />

      </div>
      <p className='font-bold text-[18px] mb-8 text-center '>{t("talkOrAskAboutAnyThing")}</p>
      <p className='text-center text-xl font-bold mb-5'>{formattedTime}</p>
      <div className='flex gap-2 px-[10px] py-2 items-center justify-center'>
        <TooltipProvider>
          <Tooltip
            delayDuration={50}>
            <TooltipTrigger asChild>
              <button className='flex-center size-[60px] border border-primary bg-white rounded-full' onClick={handleCancelClick}>
                <Image src="/assets/images/icons/x.svg" width={17} height={18} alt={t("cancel")} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{t("cancel")}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip
            delayDuration={50}>
            <TooltipTrigger asChild>
              <button className='flex-center size-[60px] border border-primary bg-white rounded-full animate-pulse' onClick={handleStopVoiceClick}>
                <Image src="/assets/images/icons/microphone.svg" width={18} height={22} alt={t("send")} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{t("send")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default AiVoiceListening