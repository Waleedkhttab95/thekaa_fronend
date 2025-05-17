'use client';
import React from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "../molecules/TestonomialCard";
import { useTranslations } from "next-intl";

const TestimonialSlider = () => {
  const t = useTranslations("HomePage.testimonials");
  // Define testimonials
  const testimonials = [
    {
      id: 1,
      name: t("cards.card1.name"),
      quote: t("cards.card1.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/65.jpg"
    },
    {
      id: 2,
      name: t("cards.card2.name"),
      quote: t("cards.card1.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/4.jpg"
    },
    {
      id: 3,
      name: t("cards.card3.name"),
      quote: t("cards.card3.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/10.jpg"
    },
    {
      id: 4,
      name: t("cards.card4.name"),
      quote: t("cards.card4.description"),
      avatar: "https://randomuser.me/api/portraits/med/womens/10.jpg"
    },
    {
      id: 5,
      name: t("cards.card5.name"),
      quote: t("cards.card6.description"),
      avatar: "https://randomuser.me/api/portraits/med/mens/10.jpg"
    },
    {
      id: 6,
      name: t("cards.card6.name"),
      quote: t("cards.card6.description"),
      avatar: "https://randomuser.me/api/portraits/med/womens/15.jpg"
    },
    {
      id: 7,
      name: t("cards.card7.name"),
      quote: t("cards.card7.description"),
      avatar: "https://randomuser.me/api/portraits/child/mens/16.jpg"
    }
  ];



  return (
    <div className="w-full py-12 relative overflow-x-hidden">
      <h2 className="section-heading !text-center">
        قصص نجاح مع ذكاء
      </h2>      <div className="flex flex-col md:py-12 gap-6">          {/* First Row - Right to Left */}
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