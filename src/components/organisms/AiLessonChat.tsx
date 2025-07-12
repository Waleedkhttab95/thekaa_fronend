/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "../atoms/sooner";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../atoms/tooltip";
import ChatMessages from "../organisms/ChatMessages";
import { useVoiceToText } from "@/hooks/useVoiceToText";
import { Send } from "lucide-react";
import AiVoiceListening from "./AiVoiceListening";
import { cn } from "@/lib/utils";
import { AiAssistantMessage, getAiAssistantResponse } from "@/services/content";
import LoadingDots from "../atoms/loadingDots";
interface IProps {
  className?: string;
  messages: AiAssistantMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AiAssistantMessage[]>>;
}
const AiLessonChat = ({ className, messages, setMessages }: IProps) => {
  const t = useTranslations("lessonPage.aiChat");
  const [isLoading, setIsLoading] = useState(false);

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(messages, stopRecording);
    scrollToBottom();
  }, [messages, stopRecording]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };
  const { watch, register, reset, handleSubmit } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleStartVoiceClick = () => {
    startRecording();
  };
  const handleStopVoiceClick = async () => {
    stopRecording();
    const userMessage: AiAssistantMessage = {
      role: "user",
      content: textMessage ?? "",
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    try {
      const response = await getAiAssistantResponse(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      toast({
        title: t("error.title"),
        description: t("error.description"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = () => {
    cancelRecording();
  };
  const onSubmit = async (data: { message: string }) => {
    const userMessage: AiAssistantMessage = {
      role: "user",
      content: data.message,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    reset();
    setIsLoading(true);
    try {
      const response = await getAiAssistantResponse(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      toast({
        title: t("error.title"),
        description: t("error.description"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    toast({
      title: t("error.title"),
      description: error ?? t("error.description"),
      variant: "destructive",
    });
  }

  const transformMessages = (
    messages: { text: string; user?: boolean }[]
  ): AiAssistantMessage[] => {
    return messages.map((m) => ({
      role: m.user ? "user" : "assistant",
      content: m.text,
    }));
  };
  return (
    <div
      className={cn(
        "h-full bg-[#1DC0CA]/20 flex flex-col justify-between rounded-[40px] p-5",
        className
      )}
    >
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
          <div className="flex flex-center  gap-2 bg-primary px-2 py-3 mb-5 select-none rounded-full">
            <Image
              src="/assets/images/icons/robot.svg"
              width={27}
              height={27}
              alt={t("robot")}
            />
            <h2 className="font-bold text-primary-foreground">{t("askMe")}</h2>
          </div>
          {messages.length === 0 ? (
            <div>
              <p className="text-center font-bold text-secondary-foreground text-lg">
                {t("howICanHelp")}
              </p>
            </div>
          ) : (
            <div className="relative flex-1 overflow-y-auto px-5 py-2">
              <ChatMessages messages={messages} />
              {isLoading && (
                <div className="flex justify-end">
                  <div className="bg-card-transparent rounded-[40px] rounded-ts-none px-4 py-2 shadow-md max-w-[80%]">
                    <LoadingDots />
                  </div>
                </div>
              )}
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
  );
};

export default AiLessonChat;
