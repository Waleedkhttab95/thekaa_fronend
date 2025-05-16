"use client"

import LandingHowCanHelpCard from "../molecules/LandingHowCanHelpCard"


// Define a type for our feature items
type FeatureItem = {
  icon: string
  title: string
  description: string
  bgColor: string
}

export default function HowCanWeHelp() {
  // Dynamic data array for features
  const features: FeatureItem[] = [
    {
      icon: '/assets/images/icons/graduate-student.svg',
      title: "خطط تعليمية ذكية تتكيف مع أسلوبك وقدراتك",
      description: "من خلال الذكاء الاصطناعي، نقدم خطط تعلم مرنة تتكيف مع سرعة وتوجهات كل طالب.",
      bgColor: "bg-[#ffb6e1]",
    },
    {
      icon: '/assets/images/icons/open-book.svg',
      title: "رحلات تعليمية مخصصة لك",
      description: "الذكاء الاصطناعي يرافق طفلك بخطة مصممة خصيصاً حسب مستواه واهتماماته.",
      bgColor: "bg-[#22e3e3]",
    },
    {
      icon: '/assets/images/icons/pencil-ruler.svg',
      title: "تركيز خاص على احتياجات الطلاب في المملكة العربية السعودية",
      description:
        "تم تصميم المنصة لتلبية احتياجات الطلاب في المملكة العربية السعودية، مع مراعاة النظام التعليمي المحلي.",
      bgColor: "bg-[#22e3e3]",
    },
    {
      icon: '/assets/images/icons/graduate-student.svg',
      title: "جميع المناهج الدراسية في مكان واحد",
      description: "نوفر لك جميع المناهج الدراسية التي تحتاجها لتجربة تعلم شاملة، من جميع المراحل الدراسية.",
      bgColor: "bg-[#ffb6e1]",
    },
  ]

  return (
    <div className="py-20 px-4 mb-5 rounded-[40px] md:px-8 bg-[#22e3e3]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-black">كيف يمكن لـ &ldquo;ذكــاء&ldquo; أن يساعدك؟</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <LandingHowCanHelpCard
              key={`how-can-help-${index}`}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
            />
          ))}

        </div>
      </div>
    </div>
  )
}
