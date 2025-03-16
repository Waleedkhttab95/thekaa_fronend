'use client'
import React, { ChangeEvent } from 'react'
import { Input } from '../atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../atoms/select';
import { RadioGroup, RadioGroupItem } from '../atoms/radio-group';
import { Label } from '../atoms/label';
import { IStudentData } from '@/types/student.type';
import { ControllerRenderProps } from 'react-hook-form';
import { getFromSteps } from '@/data/student';
import Image from 'next/image';
import { useLocale } from 'next-intl';
type props = {
  formField: ControllerRenderProps<IStudentData, keyof IStudentData>
  currentStepData: ReturnType<typeof getFromSteps>[number]
}
const AddStudentFields = ({
  currentStepData,
  formField
}: props) => {
  const locale = useLocale();

  if (currentStepData.type === 'number'
    || currentStepData.type === 'text')
    return (
      <Input
        placeholder={currentStepData.placeholder}
        {...formField}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = currentStepData.type === 'number'
            ? Number(e.target.value)
            : e.target.value;
          formField.onChange(value);
        }}
        value={formField.value ?? ''}
        type={currentStepData.type}
      />
    )
  else if (currentStepData.type === 'select')
    return (
      <Select
        onValueChange={formField.onChange}
        defaultValue={formField.value?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder={currentStepData.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {currentStepData.options && currentStepData?.options.map(option => (
            <SelectItem key={option as string} value={option as string}>
              {option as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  else if (currentStepData.type === 'combo')
    return (
      <RadioGroup
        onValueChange={formField.onChange}
        value={formField.value as string}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-4"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}

      >
        {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {currentStepData.options?.map((option: any) => (
          <div key={`subject-${option.id}`} className="relative">
            <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
            <Label htmlFor={option.id} className="cursor-pointer block lg:size-[150px] mx-auto">
              <div
                className={`flex flex-col items-center justify-center p-4 text-center h-full border rounded-md select-none transition-all ${formField.value === option.id
                  ? "border-primary border-2 bg-primary/5"
                  : "border-border hover:border-primary/50"
                  }`}
              >
                <Image src={option.icon} width={69} height={69} alt={option.name} className="mb-6 size-[69px]" />
                <span className="text-sm font-bold">{option.name}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    )
  else return null


}

export default AddStudentFields