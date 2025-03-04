'use client'
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../molecules/card';
import Image from 'next/image';
import AddStudentForm from '../organisms/AddStudentForm';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Button } from '../atoms/button';
import Link from 'next/link';
import { TFunctionType } from '@/types/common.type';

type setCurrentStepFnType = Dispatch<SetStateAction<number>>;

const getOuterSteps = (t: TFunctionType, setCurrentStep: setCurrentStepFnType) => [
  {
    id: 'initial_add_Student',
    title: t('addStudentInfoToThekaa'),
    description: t('addStudentInfoToThekaaDescription'),
    icon: "/assets/images/student.svg",
    content: (
      <Button className='w-full md:w-[50%] flex font-bold mx-auto ' onClick={() => setCurrentStep((curr: number) => curr + 1)}>
        <Image src="/assets/images/icons/plus.svg" width={19} height={19} alt={t("startAddNewStudent")} />
        <span >{t("startAddNewStudent")}</span>
      </Button>
    )
  },
  {
    id: 'add_student_info',
    title: t('studentInfo'),
    description: t('addStudentInfo'),
    icon: "/assets/images/student.svg",
    content: <AddStudentForm finish={() => setCurrentStep(2)} />
  },
  {
    id: 'success_student_added',
    title: t('studentAddedSuccessfully'),
    description: t('StartLevelExam'),
    icon: "/assets/images/icons/complete.svg",
    content: (
      <div className='flex justify-between items-center gap-5'>
        <Link href="/test" className='block w-full' >
          <Button className='w-full'>
            {t("start")}
          </Button>
        </Link>
        <Link href="/dashboard" className=' block w-full'>
          <Button className='w-full' variant='outline'>
            {t("skip")}
          </Button>
        </Link>

      </div>
    )
  }
]

export default function AddStudentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const t = useTranslations('addStudentPage');
  const outerSteps = useMemo(() => getOuterSteps(t, setCurrentStep), [t]);
  const currentStepData = outerSteps[currentStep];
  return (
    <Card className={"px-2 md:px-12 flex flex-col justify-center min-h-[452px] lg:px-24 xl:w-[50%] md:w-[75%] w-[95%] mx-auto"}>
      <CardHeader className="text-center mb-1">
        <Image src={currentStepData.icon} className="mx-auto mb-3" width={48} height={67} alt={t("studentInfo")} />
        <CardTitle className="text-2xl font-bold mb-4">{currentStepData.title}</CardTitle>
        <CardDescription className="text-gray-500 text-lg">{currentStepData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {
          currentStepData.content
        }
      </CardContent>
    </Card >
  );
}