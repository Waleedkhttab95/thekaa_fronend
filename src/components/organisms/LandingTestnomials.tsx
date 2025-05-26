"use client"
import { TestimonialCard } from "../molecules/TestonomialCard"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
// Import Autoplay module and styles
import { Autoplay } from "swiper/modules"
import Loading from "../atoms/loading"

export default function TestimonialSlider() {
  const t = useTranslations("HomePage.testimonials")
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering Swiper
  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) {
    return (
      <div className="w-full py-8" id="successStories-section">
        <Loading></Loading>
      </div>
    )
  }

  return (
    <div className="w-full py-24" id="successStories-section">
      <h2 className="section-heading !text-center mb-10">{t("title")}</h2>

      {/* First row - right to left */}
      <div className="mb-8">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          speed={5000}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          className="testimonial-swiper h-auto"
          style={{ height: "auto", minHeight: "200px" }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={`row1-${testimonial.id}`} className="testimonial-slide">
              <div className="testimonial-container">
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
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          speed={3000}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          mousewheel={false}
          className="testimonial-swiper h-auto"
          style={{ height: "auto", minHeight: "200px" }}
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
