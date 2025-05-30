'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '../atoms/button'
import LandingNavbar from '../molecules/LandingNavbar'
import Image from 'next/image'
import { getCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const LandingHeader = () => {
  const t = useTranslations('HomePage')
  const accessToken = getCookie("Authentication");
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to detect when to fix the header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    if (accessToken) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className='pt-5'>
      <div
        className={cn(
          "z-50 flex items-center justify-between px-4 py-2 transition-all duration-300",
          isScrolled
            ? "fixed top-2 left-0 right-0 mx-auto w-[95%] md:w-[90%] lg:w-[83%] bg-transparent backdrop-blur-sm"
            : "mb-10 bg-[#a393a7] rounded-full"
        )}
      >
        <div className="flex items-center gap-2">
          <Image 
            className="text-white text-2xl font-bold" 
            src="/assets/images/white-logo.svg" 
            width={94} 
            height={26} 
            alt='Thekaa Logo' 
          />
        </div>

        {/* <LandingNavbar /> */}

        <div className="hidden lg:flex items-center gap-3">
          {!accessToken && (
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300" 
              onClick={handleLoginClick}
            >
              {t("login")}
            </Button>
          )}
        </div>
      </div>

      {/* Spacer div to prevent content jump when header becomes fixed */}
      {isScrolled && <div className="h-16 mb-10"></div>}
    </div>
  )
}

export default LandingHeader