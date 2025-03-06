'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../atoms/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../atoms/tooltip'
import { PencilLineIcon } from 'lucide-react'
import { getAvatarInitials } from '@/utils/avatar'
import { IStudentData } from '@/types/student.type'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
type props = {
  son: IStudentData
  isOpen: boolean
}
const SonAvatar = ({
  son,
  isOpen = false
}: props) => {
  const router = useRouter();
  const onEditClick = () => {
    router.push(`/edit-student/${son.id}`)
  }
  return (
    <div className="flex flex-col items-center justify-center py-6 pt-0">
      <div className="relative group">
        <div className="relative mb-2 w-[169px] h-[169px] rounded-full overflow-hidden shadow-xl">
          <Avatar className="w-full  h-full">
            <AvatarImage src={son.avatar || "/placeholder.svg?height=160&width=160"} alt="Profile picture" />
            <AvatarFallback className="text-2xl">{getAvatarInitials(son.studentName)}</AvatarFallback>
          </Avatar>
          <button
            className={cn("absolute inset-0 flex items-center justify-center bg-black/40  transition-opacity",
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => onEditClick()}
            type="button"
          >
            <PencilLineIcon className="size-[19px] text-white" />
          </button>
        </div>
        <h1 className='text-center font-bold'>{son.studentName}</h1>

      </div>
    </div>)
}

export default SonAvatar