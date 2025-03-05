'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../molecules/card'
import EditStudentInfoFrom from '../organisms/EditStudentInfoForm'
import { IStudentData } from '@/types/student.type'
import ConfirmDeleteDialog from '../organisms/ConfirmDeleteDialog'
import { useTranslations } from 'next-intl'
import SuccessDialog from '../organisms/SuccessDialog'
const studentData: IStudentData = {
  studentName: 'محمد',
  age: 10,
  educationLevel: '',
  subject: 'العلوم',
  avatar: ""
}
const EditStudentPage = () => {
  const t = useTranslations("editStudentPage");
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const confirmDeleteStudent = () => {
    setIsConfirmDeleteOpen(false);

    // delete Api 
    // after it open success 
    setTimeout(() => {
      setIsSuccessDialogOpen(true);
    }, 1000)
  }
  const openConfirmDeleteStudent = () => {
    setIsConfirmDeleteOpen(true)
  }
  return (
    <Card className='py-12 lg:px-[100px] xl:w-[55%] md:w-[75%] w-[95%] mx-auto'>
      <CardHeader className='pt-0'>
        <CardTitle className='text-center text-2xl'>{t("fileManagment")}</CardTitle>
      </CardHeader>
      <CardContent className='py-0'>
        <EditStudentInfoFrom studentData={studentData} deleteStudent={openConfirmDeleteStudent} />
        <ConfirmDeleteDialog
          isOpen={isConfirmDeleteDialogOpen}
          setIsOpen={setIsConfirmDeleteOpen}
          ConfirmDelete={confirmDeleteStudent}
          ConfirmMessage={t("confirmDeleteMessage")}
        />
        <SuccessDialog
          isOpen={isSuccessDialogOpen}
          setIsOpen={setIsSuccessDialogOpen}
          successMessage={t("studentDeletedSuccessfully")}
        />

      </CardContent>
    </Card>
  )
}

export default EditStudentPage