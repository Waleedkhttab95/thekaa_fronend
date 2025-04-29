import { cn } from '@/lib/utils'
import React from 'react'

type props = {
  message: {
    text: string
    user?: boolean
  }
}
const ChatMessage = ({ message }: props) => {
  return (
    <div className={cn('flex w-[80%] md:w-[50%] break-all break-normal items-center mb-2',
      message.user ? 'justify-start' : 'justify-end ms-auto'
    )}>
      <div className='bg-card-transparent rounded-[40px] rounded-ts-none px-4 py-2 shadow-md max-w-[80%]'>
        <p className='text-md'>{message.text}</p>
      </div>
    </div>)
}

export default ChatMessage