"use client"
import { useTranslations } from 'next-intl'
import Image from 'next/image';
import React from 'react'
import { Button } from '../atoms/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const LandingHeroSection = () => {
  const t = useTranslations('HomePage.hero');
  const router = useRouter()
  const HandleStartClick = () => {
    router.push('/sign-up');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      className='py-4 mb-5 relative'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="absolute size-[250px] lg:size-[594px] bg-[#23F6F0] rounded-full blur-[120px] lg:blur-[200px] top-48 -right-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute z-20 size-[150px] lg:size-[400px] bg-[url('/assets/images/bg-circle.svg')] bg-cover bg-no-repeat top-56 lg:top-90 -right-24 lg:-right-36"
        animate={{
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className='relative z-20 flex flex-col md:flex-row items-center gap-5 min-h-[80vh]'>
        <motion.div 
          className="hero-content lg:max-w-[40.3%]"
          variants={itemVariants}
        >
          <motion.h1 
            className="section-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            {t("title")}
          </motion.h1>
          <motion.p 
            className='md:text-2xl mb-8 text-center md:text-start text-secondary md:max-w-[90%] leading-relaxed'
            variants={itemVariants}
          >
            {t("description")}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4"
          >
            <Button 
              variant={'default'} 
              className='block w-full md:w-60 bg-[#23F6F0] hover:bg-[#1a9e9a] text-[#1a1a1a] text-lg font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2 focus:outline-none' 
              onClick={HandleStartClick}
              
            >
              {t("startTrialFree")}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-image select-none"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="/assets/images/hero-image.png" 
            width={700} 
            height={548} 
            alt="Hero Image" 
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LandingHeroSection