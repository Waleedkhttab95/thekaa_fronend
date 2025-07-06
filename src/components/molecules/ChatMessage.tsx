import { cn } from "@/lib/utils";
import React from "react";
import { AiAssistantMessage } from "@/services/content";

type props = {
  message: AiAssistantMessage;
};
const ChatMessage = ({ message }: props) => {
  return (
    <div
      className={cn(
        "flex w-[70%] md:w-[70%]  items-center mb-2  overflow-x-auto",
        message.role === "user" ? "justify-start" : "justify-end ms-auto"
      )}
    >
      <div className="bg-card-transparent rounded-[40px] rounded-ts-none px-4 py-2 shadow-md max-w-[80%]">
        <p className="text-md break-words break-normal text-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
