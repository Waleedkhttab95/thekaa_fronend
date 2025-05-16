'use client'
import React from 'react'
import { Button } from '../atoms/button'
import LandingNavbar from '../molecules/LandingNavbar'
import Image from 'next/image'
import { getCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const LandingHeader = () => {
  const t = useTranslations('HomePage')
  const accessToken = getCookie("Authentication");
  const router = useRouter();
  const handleLoginClick = () => {
    if (accessToken) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className='pt-5'>
      <div className="mb-10 bg-[#a393a7] rounded-full flex items-center justify-between  px-4 py-2">
        < div className="flex items-center gap-2" >
          <Image className="text-white text-2xl font-bold" src="/assets/images/white-logo.svg" width={94} height={26} alt='' />

        </div >
        <LandingNavbar />
        < div className="hidden md:flex items-center gap-3" >
          {!accessToken && <Button variant="ghost" className="text-white hover:text-white hover:bg-transparent">
            {t("signup")}
          </Button>}
          <Button className="bg-[#222] hover:bg-[#333] text-white rounded-full px-6" onClick={handleLoginClick}>{accessToken ? t("dashboard") : t("login")}</Button>
        </div >

      </div>
    </div>
  )
}

export default LandingHeader