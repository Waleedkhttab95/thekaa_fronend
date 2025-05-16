import Image from 'next/image'
import React from 'react'

const LandingTeachingWay = () => {
  return (
    <div className='py-4 mb-5 flex flex-col md:flex-row gap-5 items-center'>
      <div className="content flex-1">
        <h2 className="text-3xl md:text-4xl text-center  mb-6 pt-10 text-wrap font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,_#23F6F0_0%,_#F7AEF3_68%,_#3D313A_100%)]">
          الطريقة الأذكى لمساعدة طفلك على التعلم.
        </h2>
        <p className='md:text-2xl text-center md:text-start text-secondary md:max-w-[90%] text-wrap'>
          ذكاء` هو معلمك الذكي المصمم خصيصًا لطفلك، يقدّم تجربة تعليم شخصية باستخدام الذكاء الاصطناعي        </p>
        <p className='md:text-2xl text-center md:text-start text-secondary md:max-w-[90%] text-wrap'>
          نساعد الأهل في فهم مستوى أطفالهم وتوفير خطة دراسية تناسب قدراتهم، وتمنحهم دعمًا حقيقيًا في رحلتهم التعليمية.          </p>
      </div>
      <div className="image flex-1">
        <Image className='mx-auto' src={"/assets/images/subjects.svg"} width={517} height={702} alt='subjects' />
      </div>
    </div>
  )
}

export default LandingTeachingWay