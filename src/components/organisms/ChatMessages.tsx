import React from 'react'
import ChatMessage from '../molecules/ChatMessage'
import { AiAssistantMessage } from '@/services/content'

type props = {
  messages: AiAssistantMessage[]
}
const ChatMessages = ({ messages }: props) => {
  return (
    <>
      {messages.map((message, index) =>
        <ChatMessage key={index} message={message} />
      )}
    </>
  );
}

export default ChatMessages