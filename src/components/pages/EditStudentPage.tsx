/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../molecules/card'
import EditStudentInfoFrom from '../organisms/EditStudentInfoForm'
import ConfirmDeleteDialog from '../organisms/ConfirmDeleteDialog'
import { useTranslations } from 'next-intl'
import SuccessDialog from '../organisms/SuccessDialog'
import { useParams } from 'next/navigation'
import { useStudent, useStudentMutations } from '@/hooks/rqs/students'
import { useAxiosAuth } from '@/hooks/useAxiosAuth'
import { IStudentData } from '@/types/student.type'
import Loading from '../atoms/loading'
import { toast } from '../atoms/sooner'
import { useQueryClient } from '@tanstack/react-query'
import { STUDENTS_QUERY } from '@/config/qr.constants'
import { ProtectedRoutes } from '@/config/routes'
import { base64ToFile } from '@/utils/avatar'

const EditStudentPage = () => {
  const t = useTranslations("editStudentPage");
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('');
  const [resetAvatar, setIsResetAvatar] = useState(false);
  const params = useParams();
  const studentId = params?.id?.toString() ?? "";
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const { data: studentData, isLoading: isStudentDataLoading } = useStudent(axiosAuth, studentId);
  const { isPending: isUpdatePending, mutateAsync: mutateUpdateAsync } = useStudentMutations(axiosAuth).update
  const { isPending: isUpdateAvatarPending, mutateAsync: mutateAvatarAsync } = useStudentMutations(axiosAuth).updateAvatar
  const { isPending: isDeletePending, mutateAsync: mutateDeleteAsync } = useStudentMutations(axiosAuth).delete
  const onUpdateSubmit = async (data: Partial<IStudentData>) => {
    console.log(data)
    try {
      await mutateUpdateAsync({ ...data, _id: studentId })
      await queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] })

      setIsSuccessDialogOpen(true);
      setSuccessMessage(t("studentEditedSuccessfully"))
    } catch (error: any) {
      toast({
        title: t("error.title"),
        description: t("error.description"),
        variant: "destructive"
      })
    }

  }
  const handleAvatarChange = async (avatar: string) => {
    try {
      const avatarFile = await base64ToFile(avatar, "avatar.png")
      await mutateAvatarAsync({ avatar: avatarFile, _id: studentId })
      await queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] })
    } catch (error: any) {
      setIsResetAvatar(true)
      toast({
        title: t("error.updateAvatar.title"),
        description: t("error.updateAvatar.description"),
        variant: "destructive"
      })
    } finally {
      setTimeout(() => {
        setIsResetAvatar(false)
      }
        , 500)

    }
  }
  const confirmDeleteStudent = async () => {
    try {
      setIsConfirmDeleteOpen(false);
      await mutateDeleteAsync(studentId)
      await queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] })
      setIsSuccessDialogOpen(true);
      setSuccessMessage(t("studentDeletedSuccessfully"))
    } catch (error: any) {
      toast({
        title: t("error.delete.title"),
        description: t("error.delete.description"),
        variant: "destructive"
      })

    }
  }
  const openDeleteStudentDialog = () => {
    setIsConfirmDeleteOpen(true)

  }


  return (
    <Card className='py-12 lg:px-[100px] xl:w-[55%] md:w-[75%] w-[95%] mx-auto'>
      <CardHeader className='pt-0'>
        <CardTitle className='text-center text-2xl'>{t("fileManagment")}</CardTitle>
      </CardHeader>
      <CardContent className='py-0 min-h-[300px]'>
        {isStudentDataLoading ? <Loading /> :
          (<EditStudentInfoFrom resetAvatar={resetAvatar} studentAvatar={studentData?.profileImage} handleAvatarChange={handleAvatarChange} isPending={isUpdatePending || isDeletePending} onSubmit={onUpdateSubmit} studentData={studentData} deleteStudent={openDeleteStudentDialog} />)
        }<ConfirmDeleteDialog
          isOpen={isConfirmDeleteDialogOpen}
          setIsOpen={setIsConfirmDeleteOpen}
          ConfirmDelete={confirmDeleteStudent}
          ConfirmMessage={t("confirmDeleteMessage")}
        />
        <SuccessDialog
          isOpen={isSuccessDialogOpen}
          setIsOpen={setIsSuccessDialogOpen}
          successMessage={successMessage}
          returnTo={ProtectedRoutes.SonsFiles}
          successActionText={t("studentEditedSuccessfullyActionText")}
        />

      </CardContent>
    </Card>
  )
}

export default EditStudentPage