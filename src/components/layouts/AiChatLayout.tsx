import React, { PropsWithChildren } from 'react'

const AiChatLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='container mx-auto w-[98%] md:w-[90%] lg:w-[80%] xl:w-full overflow-hidden bg-[url(/assets/images/ai-chat-bg.svg)] bg-cover bg-no-repeat  h-[402px] min-h-[402px] rounded-[40px] px-5 py-10  '>
      {children}
    </div>
  )
}

export default AiChatLayout