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
import { ROUTES } from '@/config/routes'
import { useStudent, useStudentMutations } from '@/hooks/rqs/students'
import { useAxiosAuth } from '@/hooks/useAxiosAuth'
import { IStudentData } from '@/types/student.type'
import Loading from '../atoms/loading'
import { toast } from '../atoms/sooner'

const EditStudentPage = () => {
  const t = useTranslations("editStudentPage");
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const params = useParams();
  const studentId = params?.id?.toString() ?? "";
  const axiosAuth = useAxiosAuth()
  const { data: studentData, isLoading: isStudentDataLoading } = useStudent(axiosAuth, studentId);
  const { isPending: isUpdatePending, mutateAsync: mutateUpdateAsync } = useStudentMutations(axiosAuth).update
  const { isPending: isDeletePending, mutateAsync: mutateDeleteAsync } = useStudentMutations(axiosAuth).delete
  const onUpdateSubmit = async (data: Partial<IStudentData>) => {
    console.log(data)
    try {
      await mutateUpdateAsync({ ...data, _id: studentId })
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
  const confirmDeleteStudent = async () => {
    try {
      setIsConfirmDeleteOpen(false);
      await mutateDeleteAsync(studentId)
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
          (<EditStudentInfoFrom isPending={isUpdatePending || isDeletePending} onSubmit={onUpdateSubmit} studentData={studentData} deleteStudent={openDeleteStudentDialog} />)
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
          returnTo={ROUTES.SONS_FILES}
        />

      </CardContent>
    </Card>
  )
}

export default EditStudentPage