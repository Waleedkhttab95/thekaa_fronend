"use client";
import { Send } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AiVoiceListening from "../organisms/AiVoiceListening";
import { useVoiceToText } from "@/hooks/useVoiceToText";
import { toast } from "../atoms/sooner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../atoms/tooltip";
import AiChatLayout from "../layouts/AiChatLayout";
import ChatMessages from "../organisms/ChatMessages";

const AiChatPage = () => {
  const [messages, setMessages] = useState<{ text: string; user?: boolean }[]>(
    []
  );
  const {
    isRecording,
    isProcessing,
    formattedTime,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
    textMessage,
  } = useVoiceToText();
  const t = useTranslations("aiChatPage");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages, stopRecording]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { watch, register, reset, handleSubmit } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleStartVoiceClick = () => {
    startRecording();
  };
  const handleStopVoiceClick = () => {
    stopRecording();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: textMessage ?? "",
        user: true,
      },
      {
        text: "مرحبا بك في ذكاء",
        user: false,
      },
    ]);
  };
  const handleCancelClick = () => {
    cancelRecording();
  };
  const onSubmit = (data: { message: string }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.message, user: true },
      { text: "مرحبا بك في ذكاء", user: false },
    ]);
    reset();
  };

  if (error) {
    toast({
      title: t("error.title"),
      description: error ?? t("error.description"),
      variant: "destructive",
    });
  }
  return (
    <AiChatLayout>
      <div className="h-full flex flex-col justify-center">
        {isRecording ? (
          <AiVoiceListening
            formattedTime={formattedTime}
            isRecording={isRecording}
            isProcessing={isProcessing}
            handleStopVoiceClick={handleStopVoiceClick}
            handleCancelClick={handleCancelClick}
          />
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center">
                <h1 className="font-bold text-[28px] text-center ">
                  {t("doICanHelp")}
                </h1>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <ChatMessages messages={messages} />
                <div ref={messagesEndRef} />
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 px-[10px] py-2 items-center justify-between bg-white rounded-[40px] mt-5"
            >
              <input
                {...register("message")}
                type="text"
                className="w-full h-auto break-words focus:outline-none ps-3 font-semibold"
                placeholder={t("askAboutAnything")}
              />
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <button
                        disabled={!watch("message")}
                        className="bg-[#1DC0CA] disabled:bg-[#1DC0CA]/40 text-white size-[42px] flex flex-center rounded-full "
                      >
                        <Send className="size-[19px]" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{t("send")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={handleStartVoiceClick}
                        className="bg-primary text-white size-[42px] flex flex-center rounded-full"
                      >
                        <Image
                          src="/assets/images/icons/voice.svg"
                          width={21}
                          height={21}
                          alt={t("sendAvoiceMessage")}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{t("sendAvoiceMessage")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </>
        )}
      </div>
    </AiChatLayout>
  );
};

export default AiChatPage;
