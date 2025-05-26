"use client"
import { TestimonialCard } from "../molecules/TestonomialCard"
import { useTranslations } from "next-intl"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
// Import required modules
import { Autoplay } from "swiper/modules"
// Import Swiper core
import { register } from "swiper/element/bundle"
import useIsMobile from "@/hooks/useIsMobile"

// Register Swiper custom elements
register()

export default function TestimonialSlider() {
  const t = useTranslations("HomePage.testimonials");
  const isMobile = useIsMobile()
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
  return (
    <div className="w-full py-8">
      {/* First row - right to left */}
      <div className="mb-8">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={isMobile ? 1 : 3} // Show exactly 3 slides
          spaceBetween={16} // Minimal space between slides
          loop={true}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          className="testimonial-swiper"
          wrapperClass="testimonial-wrapper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={`row1-${testimonial.id}`} className="testimonial-slide">
              <div className="testimonial-container ">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Second row - left to right */}
      <div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={isMobile ? 1 : 3} // Show exactly 3 slides
          spaceBetween={16} // Minimal space between slides
          loop={true}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true, // Reverse direction for second row
          }}
          allowTouchMove={false}
          className="testimonial-swiper"
          wrapperClass="testimonial-wrapper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={`row2-${testimonial.id}`} className="testimonial-slide">
              <div className="testimonial-container">
                <TestimonialCard testimonial={testimonial} index={index + testimonials.length} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
