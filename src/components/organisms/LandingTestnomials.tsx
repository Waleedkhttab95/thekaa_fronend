'use client';
import React from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "../molecules/TestonomialCard";

const TestimonialSlider = () => {
  // Define testimonials
  const testimonials = [
    {
      id: 1,
      name: "أمير",
      quote: "المحتوى على ذكاء مدروس لمستويات مختلفة.",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "عبد الرحمن",
      quote: "أدوات المتابعة في ذكاء ممتازة، أقدر أعرف وين كل طالب يحتاج دعم.",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "محمد",
      quote: "منصة ذكاء غيرت نظرة ولدي للتعلم، صار يطلب يدخل عليها بنفسه!",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 4,
      name: "مرام",
      quote: "كنت ضايعة في اختيار المنهج المناسب، ذكاء دلني على كل شيء.",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 5,
      name: "عبدالله",
      quote: "ذكاء فعلا أداة ذكية، ما هو مجرد دروس محفوظة، هو يتفاعل مع الطفل بشكل حي.",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 6,
      name: "فاطمة",
      quote: "أبغى أوصي أصحابي ذكاء، عشان يتعلم سوا!",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 7,
      name: "خالد",
      quote: "كل ما أخلص درس في ذكاء أحصل نجوم، أحسني إني بطل!",
      avatar: "/api/placeholder/100/100"
    }
  ];

  // Title component with gradient text
  const Title = () => (

    <h2 className="text-3xl md:text-4xl text-center mb-8 pt-10 text-wrap font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,_#23F6F0_0%,_#F7AEF3_68%,_#3D313A_100%)]">
      قصص نجاح مع ذكاء
    </h2>
  );

  return (
    <div className="w-full py-12 relative overflow-x-hidden">
      <Title />
      <div className="flex flex-col md:py-12 gap-6">          {/* First Row - Right to Left */}
        <div className="relative overflow-x-hidden">
          <div className="overflow-x-hidden w-full">
            <motion.div
              className="flex gap-4 py-4 flex-nowrap min-w-full"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 10,
                  ease: "linear"
                }
              }}
              style={{
                // Enable GPU acceleration for smoother animation
                willChange: "transform"
              }}
            >
              {/* Original set */}
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`row1-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}

              {/* Duplicate set for seamless looping */}
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`row1-dup-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>          {/* Second Row - Left to Right */}
        <div className="relative overflow-hidden">
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex gap-4 py-4 flex-nowrap min-w-full"
              animate={{
                x: ["-50%", "0%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 10,
                  ease: "linear"
                }
              }}
              style={{
                // Enable GPU acceleration for smoother animation
                willChange: "transform"
              }}
            >
              {/* Original set */}
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`row2-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}

              {/* Duplicate set for seamless looping */}
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`row2-dup-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>        </div>
    </div>
  );
};

export default TestimonialSlider;