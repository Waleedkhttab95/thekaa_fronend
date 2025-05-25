"use client"
import { motion } from "framer-motion"
import { TestimonialCard } from "../molecules/TestonomialCard"
import { useTranslations, useLocale } from "next-intl"

const TestimonialSlider = () => {
  const t = useTranslations("HomePage.testimonials")
  const locale = useLocale()

  // Check if current locale is RTL
  const isRTL = ["ar", "he", "fa", "ur"].includes(locale)

  // Define testimonials
  const testimonials = [
    {
      id: 1,
      name: t("cards.card1.name"),
      quote: t("cards.card1.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/65.jpg",
    },
    {
      id: 2,
      name: t("cards.card2.name"),
      quote: t("cards.card2.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/4.jpg",
    },
    {
      id: 3,
      name: t("cards.card3.name"),
      quote: t("cards.card3.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/10.jpg",
    },
    {
      id: 4,
      name: t("cards.card4.name"),
      quote: t("cards.card4.description"),
      avatar: "https://randomuser.me/api/portraits/med/women/10.jpg",
    },
    {
      id: 5,
      name: t("cards.card5.name"),
      quote: t("cards.card5.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/10.jpg",
    },
    {
      id: 6,
      name: t("cards.card6.name"),
      quote: t("cards.card6.description"),
      avatar: "https://randomuser.me/api/portraits/med/women/15.jpg",
    },
    {
      id: 7,
      name: t("cards.card7.name"),
      quote: t("cards.card7.description"),
      avatar: "https://randomuser.me/api/portraits/med/men/16.jpg",
    },
  ]

  // Split testimonials properly
  const midPoint = Math.ceil(testimonials.length / 2)
  const row1Testimonials = testimonials.slice(0, midPoint)
  const row2Testimonials = testimonials.slice(midPoint)

  // Create multiple copies for seamless infinite scroll - use more copies for smoother transition
  const createInfiniteArray = (arr: typeof testimonials) => {
    return [...arr, ...arr, ...arr, ...arr] // 4 copies instead of 3
  }

  const row1Data = createInfiniteArray(row1Testimonials)
  const row2Data = createInfiniteArray(row2Testimonials)

  // Use smaller percentage for smoother transition - 25% since we have 4 copies
  const animationDistance = "25%" // 25% instead of 33.333%

  // Adjust animation values based on text direction
  const getAnimationValues = () => {
    if (isRTL) {
      return {
        row1: [0, animationDistance],
        row2: [0, '-' + animationDistance],
      }
    } else {
      return {
        row1: [0, '-' + animationDistance],
        row2: [0, animationDistance],
      }
    }
  }

  const animationValues = getAnimationValues()

  return (
    <div id="successStories-section" className="w-full py-24 relative overflow-hidden">
      <h2 className="section-heading !text-center">{t("title")}</h2>
      <div className="flex flex-col md:py-12 gap-6">
        {/* First Row - Right to Left (visually) */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 py-4 flex-nowrap"
            animate={{
              x: animationValues.row1,
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20, // Slightly faster to match the smaller distance
                ease: "linear",
              },
            }}
            style={{
              willChange: "transform",
              display: "flex",
              width: "fit-content",
            }}
          >
            {row1Data.map((testimonial, index) => (
              <TestimonialCard key={`row1-${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </div>
        {/* First Row - Right to Left (visually) */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 py-4 flex-nowrap"
            animate={{
              x: animationValues.row2,
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20, // Slightly faster to match the smaller distance
                ease: "linear",

              },
            }}
            style={{
              willChange: "transform",
              display: "flex",
              width: "fit-content",
            }}
          >
            {row2Data.map((testimonial, index) => (
              <TestimonialCard key={`row2-${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </div>


      </div>
    </div>
  )
}

export default TestimonialSlider
