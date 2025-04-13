import React, { useMemo, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../atoms/form';
import { Button } from '../atoms/button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getFromSteps } from '@/data/student';
import { IStudentData } from '@/types/student.type';
import { getStudentAddSchema } from '@/validations/studentsSchemas';
import AddStudentFields from '../molecules/AddStudentFileds';
import { useCountries, useGradeLevels, useSubjects } from '@/hooks/rqs/content';
import { Locales } from '@/types/locales.enum';
type props = {
  onSubmit: (data: Partial<IStudentData>) => void;
  isPending: boolean;
}

const AddStudentForm = ({ onSubmit: submitFormData, isPending }: props) => {
  const t = useTranslations("addStudentPage");
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<IStudentData>>({
    firstName: '',
    lastName: '',
    age: 0,
    grade: '',
    subject: '',
    phone: '',
    country: '',
    gender: ''

  });
  const { data: gradeLevels } = useGradeLevels(locale as Locales);
  const { data: subjects } = useSubjects(locale as Locales);
  const { data: countries } = useCountries(locale as Locales);
  const steps = useMemo(() => getFromSteps(t, {
    gradeLevels,
    subjects,
    countries
  }), [t, gradeLevels, subjects, countries]);
  const form = useForm({
    resolver: zodResolver(getStudentAddSchema(t)[currentStep]),
    defaultValues: formData,
  });
  const onSubmit = (data: Partial<IStudentData>) => {
    const updatedData: Partial<IStudentData> = { ...formData, ...data };
    setFormData(updatedData);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => {
        form.reset(updatedData);
      }, 0)
    } else {
      submitFormData(updatedData);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      form.reset(formData);
    }
  };


  const currentStepData = steps[currentStep];
  return (
    <Form {...form} key={currentStep}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmit)} onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }} >

        {currentStepData.map((field, index) => (
          <div className='space-y-1 mb-3 min-h-[80px]' key={`create student form -${index}`}>

            <FormLabel className={
              cn(field.name === 'subject' ? 'inline-block w-full text-center ' : '')
            }>{field.label}</FormLabel>
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
        ))}
        <div className="flex justify-between flex-col-reverse mt-6 gap-3 mb-8 md:flex-row">
          {(
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className={cn("md:w-[109px]", currentStep === 0 ? "invisible" : "visible")}
            >
              <Image
                src={'/assets/images/icons/arrow-right-black.svg'}
                alt="arrow-black"
                width={17.5}
                height={11.5}
                color="white"
                className="ltr:scale-x-[-1]"
              />
              <span className='pt-1'>{t("previous")}</span>

            </Button>
          )}

          <Button type="submit" className={"md:w-[109px]"} disabled={isPending}>
            <span className='pt-1'>{t("next")}</span>
            <Image
              src={'/arrow.svg'}
              alt="arrow"
              width={17.5}
              height={11.5}
              color="white"
              className="ltr:scale-x-[-1]"
            />
          </Button>
        </div>
      </form>
    </Form >)
}

export default AddStudentForm