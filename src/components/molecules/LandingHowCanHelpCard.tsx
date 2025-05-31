import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

type props = {
  icon: string
  title: string
  description: string
  bgColor: string
}

const LandingHowCanHelpCard = ({ icon, title, description, bgColor }: props) => {
  return (
    <motion.div 
      className="relative group transition-all duration-300 hover:-translate-y-2"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="absolute -z-0 -top-2 -right-2 w-full h-full rounded-[40px] bg-[#222] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
        whileHover={{ scale: 1.02 }}
      />

      <div className={`${bgColor} relative z-10 rounded-[40px] p-8 border border-black md:min-h-[400px] lg:min-h-[297px] transition-all duration-300 group-hover:shadow-xl`}>
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div 
            className="mb-8 select-none transition-transform duration-300 group-hover:scale-110"
            whileHover={{ 
              scale: 1.2,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            <Image width={60} height={72} src={icon} alt={title} className="w-auto h-auto" />
          </motion.div>
          <motion.h3 
            className="text-center text-2xl md:text-3xl font-extrabold mb-4 select-none transition-colors duration-300 group-hover:text-[#1a9e9a]" 
            style={{ letterSpacing: '-0.02em' }}
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-center text-lg md:text-xl text-[#2d2d2d] select-none leading-relaxed"
            whileHover={{ scale: 1.02 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default LandingHowCanHelpCard