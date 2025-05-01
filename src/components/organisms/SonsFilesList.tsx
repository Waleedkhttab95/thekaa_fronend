import { IStudentData } from '@/types/student.type'
import React from 'react'
import SonAvatar from '../molecules/SonAvatar'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '../atoms/button'
import { useRouter } from 'next/navigation'
import { ProtectedRoutes } from '@/config/routes'

type props = {
  sons: IStudentData[];
  isOpen: boolean
}
const SonsFilesList = ({
  sons,
  isOpen,
}: props) => {
  const t = useTranslations("common");
  const router = useRouter();
  const handleAddSon = () => {
    router.push(ProtectedRoutes.AddStudent)
  }
  return (
    <div className='flex gap-3  flex-wrap  justify-center '>
      {sons.map((son) => (
        <SonAvatar isOpen={isOpen} son={son} key={`Son ${son._id}`} />
      ))}
      <div>
        {sons.length < 4 && (
          <>
            <Button className='flex-center mb-3 border  border-dashed border-gray-500 bg-secondary rounded-full size-[169px] hover:bg-gray-300'
              onClick={() => handleAddSon()}>
              <Image
                src="/assets/images/icons/black-plus.svg"
                width={41}
                height={41}
                alt={t("addition")}
              />
            </Button>
            <h1 className='text-center text-xl font-bold'>{t("addition")}</h1>
          </>
        )}
      </div>
    </div>
  )
}

export default SonsFilesList