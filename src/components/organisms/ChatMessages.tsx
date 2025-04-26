import React from 'react'
import ChatMessage from '../molecules/ChatMessage'
type props = {
  messages: {
    text: string
    user?: boolean
  }[]
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