'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../molecules/card'
import { useTranslations } from 'next-intl'
import SonsFilesList from '../organisms/SonsFilesList'
import { IStudentData } from '@/types/student.type'
import { Button } from '../atoms/button'
import Image from 'next/image'
export const sons: IStudentData[] = [
  {
    id: '1',
    studentName: "وليد",
    age: 10,
    educationLevel: "إبتدائي",
    subject: "العلوم",
    avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
  },
  {
    id: '2',
    studentName: "فاطمة",
    age: 10,
    educationLevel: "إعدادي",
    subject: "الرياضيات",
    avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
  },
  {
    id: '3',
    studentName: "محمد",
    age: 10,
    educationLevel: "ثانوي",
    subject: "اللغة الإنجليزية",
    avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
  },

]
const SonsStudentsManagementPage = () => {
  const t = useTranslations()
  const [isEdited, setIsEdited] = useState(false);
  const onEditedChange = () => {
    setIsEdited((isEdited) => !isEdited)
  }
  return (
    <Card variant='transparent' className='mx-auto xl:w-[60%] md:w-[93%] w-[95%] py-8'>
      <CardHeader>
        <CardTitle className='text-3xl  text-center mb-5'>{t("SonsStudentsManagementPage.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <SonsFilesList isOpen={isEdited} sons={sons} />
      </CardContent>
      <CardFooter>
        <Button className='w-full md:w-[50%] mx-auto'
          onClick={() => onEditedChange()}
        >
          {isEdited ? (
            <span>{t("common.done")}</span>
          ) : (<>
            <Image
              src="/assets/images/icons/edit-profile.svg"
              width={21}
              height={20}
              alt={t("SonsStudentsManagementPage.manageSonsFiles")}
            />
            <span>{t("SonsStudentsManagementPage.manageSonsFiles")}</span>
          </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SonsStudentsManagementPage