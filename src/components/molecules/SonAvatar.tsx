'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../atoms/avatar'
import { PencilLineIcon } from 'lucide-react'
import { getAvatarInitials } from '@/utils/avatar'
import { IStudentData } from '@/types/student.type'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../atoms/tooltip'
import { useTranslations } from 'next-intl'
import { ProtectedRoutes } from '@/config/routes'
type props = {
  son: IStudentData
  isOpen: boolean
}
const SonAvatar = ({
  son,
  isOpen = false
}: props) => {
  const router = useRouter();
  const t = useTranslations('common')
  const onEditClick = () => {
    router.push(`${ProtectedRoutes.EditStudent}/${son._id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 pt-0">
      <div className="relative group">
        <div className="relative mb-3 w-[169px] h-[169px] rounded-full overflow-hidden shadow-xl">
          <Avatar className="w-full  h-full">
            <AvatarImage src={son.avatar || "/assets/images/avatar-placeholder.jpg"} alt="Profile picture" />
            <AvatarFallback className="text-2xl">{getAvatarInitials(son.firstName + ' ' + son.lastName)}</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip
              delayDuration={50}>
              <TooltipTrigger asChild>
                <button
                  className={cn("absolute inset-0 flex items-center justify-center bg-black/40  transition-display",
                    isOpen ? 'flex' : 'hidden'
                  )}
                  onClick={() => onEditClick()}
                  type="button"
                >
                  <PencilLineIcon className="size-[19px] text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{t("edit")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <h1 className='text-center text-xl font-bold'>{son.firstName}</h1>
      </div>

    </div>)
}

export default SonAvatar