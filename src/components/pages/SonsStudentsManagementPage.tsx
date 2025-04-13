'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../molecules/card'
import { useTranslations } from 'next-intl'
import SonsFilesList from '../organisms/SonsFilesList'
import { Button } from '../atoms/button'
import Image from 'next/image'
import { useStudents } from '@/hooks/rqs/students'
import { useAxiosAuth } from '@/hooks/useAxiosAuth'
import Loading from '../atoms/loading'

const SonsStudentsManagementPage = () => {
  const t = useTranslations()
  const [isEdited, setIsEdited] = useState(false);
  const axiosAuth = useAxiosAuth()
  const onEditedChange = () => {
    setIsEdited((isEdited) => !isEdited)
  }
  const { data: sons, isLoading: isSonsLoading } = useStudents(axiosAuth);
  return (
    <Card variant='transparent' className='mx-auto xl:w-[60%] md:w-[93%] w-[95%] py-8'>
      <CardHeader>
        <CardTitle className='text-3xl  text-center mb-5'>{t("SonsStudentsManagementPage.title")}</CardTitle>
      </CardHeader>
      <CardContent className='min-h-[300px]'>
        {isSonsLoading ? <Loading /> : sons ? <SonsFilesList isOpen={isEdited} sons={sons} /> : <p>error</p>}
      </CardContent>
      <CardFooter>
        {sons && (<Button className='w-full md:w-[50%] mx-auto'
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
        </Button>)
        }
      </CardFooter>
    </Card>
  )
}

export default SonsStudentsManagementPage