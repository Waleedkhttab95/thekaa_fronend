/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../atoms/form'
import { useForm } from 'react-hook-form'
import { IStudentData } from '@/types/student.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { getStudentEditSchema } from '@/validations/studentsSchemas'
import { Button } from '../atoms/button'
import { getEditStudentFormFields } from '@/data/student'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import AvatarEditorWithCrop from './AvatarWithEdit'
import AddStudentFields from '../molecules/AddStudentFileds'

type props = {
  deleteStudent: () => void;
  studentData: IStudentData | undefined
  studentAvatar: string | undefined
  onSubmit: (data: Partial<IStudentData>) => void
  isPending: boolean;
  handleAvatarChange: (newAvatar: string) => void;
  resetAvatar: boolean
}
const EditStudentInfoFrom = ({
  studentData,
  studentAvatar,
  deleteStudent,
  isPending,
  onSubmit,
  handleAvatarChange,
  resetAvatar = false
}: props) => {
  const t = useTranslations('editStudentPage');
  const form = useForm<Partial<IStudentData>>({
    resolver: zodResolver(getStudentEditSchema(t)),
    defaultValues: studentData,
  })


  const steps = useMemo(() => getEditStudentFormFields(t), [t]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-3 mb-10'>
          <AvatarEditorWithCrop avatar={studentAvatar || ''}
            onAvatarChange={handleAvatarChange}
            avatarFallback={form.watch('firstName') || ''}
            resetAvatar={resetAvatar}
          />
          {steps.map((field: any) => (
            // <div key={`esf-input-${field?.name}`}>
            //   <FormLabel className='text-base inline-block mb-1'>{field.label}</FormLabel>
            //   <FormField
            //     key={field.name}
            //     control={form.control}
            //     name={field.name as keyof IStudentData}
            //     render={({ field: formField }) => (
            //       <FormItem>
            //         <FormControl>
            //           {field.type !== 'select' ? field.type === 'number' ?
            //             (
            //               <Input
            //                 placeholder={field.placeholder}
            //                 {...formField}
            //                 value={isNaN(formField.value as number) ? "" : formField.value}
            //                 onBlur={(e) => {
            //                   if (e.target.value === "") {
            //                     formField.onChange(0)
            //                   }
            //                   formField.onBlur?.()
            //                 }}
            //                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
            //                   const parsed = parseFloat(e.target.value);
            //                   const value = isNaN(parsed) ? "" : parsed;
            //                   formField.onChange(value);
            //                 }}
            //                 type={field.type}
            //               />
            //             )
            //             : (
            //               <Input
            //                 placeholder={field.placeholder}
            //                 {...formField}
            //                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
            //                   const value = field.type === 'number'
            //                     ? Number(e.target.value)
            //                     : e.target.value;
            //                   formField.onChange(value);
            //                 }}
            //                 value={formField.value ?? ''}
            //                 type={field.type}
            //               />
            //             ) : (
            //             <Select
            //               onValueChange={formField.onChange}
            //               defaultValue={formField.value?.toString()}
            //             >
            //               <SelectTrigger>
            //                 <SelectValue placeholder={field.placeholder} />
            //               </SelectTrigger>
            //               <SelectContent>
            //                 {field.options && field?.options.map(option => (
            //                   <SelectItem key={option} value={option}>
            //                     {option}
            //                   </SelectItem>
            //                 ))}
            //               </SelectContent>
            //             </Select>
            //           )}
            //         </FormControl>
            //         <FormMessage />
            //       </FormItem>
            //     )}
            //   /></div>)
            <div key={`esf-input-${field?.name}`} className='space-y-1 min-h-[80px]'>
              <FormLabel >{field.label}</FormLabel>
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof IStudentData}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormControl>
                      <AddStudentFields
                        currentStepData={field}
                        formField={formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )
          )}
        </div>
        <div className="flex justify-between flex-col gap-3 ">
          {(
            <Button
              type="button"
              variant="destructive_outline"
              onClick={() => deleteStudent()}
              disabled={isPending}
            >
              <Image
                src="/assets/images/icons/trash.svg"
                width={20}
                height={20}
                alt={t("deleteStudentFile")}
              />
              <span className='font-bold pt-1'>{t("deleteStudentFile")}</span>
            </Button>
          )}

          <Button type="submit" className='font-bold' disabled={isPending}>
            {t("saveChanges")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditStudentInfoFrom