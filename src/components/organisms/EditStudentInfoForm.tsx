'use client'
import React, { ChangeEvent } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../atoms/form'
import { useForm } from 'react-hook-form'
import { IStudentData } from '@/types/student.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { getStudentEditSchema } from '@/validations/studentsSchemas'
import { Button } from '../atoms/button'
import { getEditStudentFormFields } from '@/data/student'
import { Input } from '../atoms/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../atoms/select'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import AvatarEditorWithCrop from './AvatarWithEdit'

type props = {
  deleteStudent: () => void;
  studentData: IStudentData | undefined
  onSubmit: (data: IStudentData) => void
  isPending: boolean
}
const EditStudentInfoFrom = ({
  studentData,
  deleteStudent,
  isPending,
  onSubmit
}: props) => {
  const t = useTranslations('editStudentPage')

  const form = useForm<IStudentData>({
    resolver: zodResolver(getStudentEditSchema(t)),
    defaultValues: studentData
  })

  const onAvatarChange = (newAvatar: string) => {
    form.setValue('avatar', newAvatar)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-3 mb-10'>
          <AvatarEditorWithCrop avatar={form.watch('avatar') || ''}
            onAvatarChange={onAvatarChange}
            avatarFallback={form.watch('firstName') || ''}
          />
          {getEditStudentFormFields(t).map((field: {
            name: string;
            label: string;
            type: string;
            placeholder: string;
            options?: string[];
          }) => (
            <div key={`esf-input-${field?.name}`}>
              <FormLabel className='text-base inline-block mb-1'>{field.label}</FormLabel>
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof IStudentData}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormControl>
                      {field.type !== 'select' ? (
                        <Input
                          placeholder={field.placeholder}
                          {...formField}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const value = field.type === 'number'
                              ? Number(e.target.value)
                              : e.target.value;
                            formField.onChange(value);
                          }}
                          value={formField.value ?? ''}
                          type={field.type}
                        />
                      ) : (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value?.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options && field?.options.map(option => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /></div>)
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