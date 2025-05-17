import { Locales } from '@/types/locales.enum'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LandingFooter = () => {
  const locale = useLocale();
  const t = useTranslations("HomePage.footer");
  const socialMediaData = [
    {
      id: "1",
      text: t("twitter"),
      icon: "/assets/images/icons/twitter.svg",
      url: "/"
    },
    {
      id: "2",
      text: t("facebook"),
      icon: "/assets/images/icons/facebook.svg",
      url: "/"
    },
    {
      id: "3",
      text: t("linkedin"),
      icon: "/assets/images/icons/linkedin.svg",
      url: "/"
    },
    {
      id: "4",
      text: t("instagram"),
      icon: "/assets/images/icons/instagram.svg",
      url: "/"
    }
  ]
  return (
    <div className="h-16 bg-[#23f6f0] flex justify-between items-center p-4 px-2 md:px-24 w-full">
      {locale === Locales.ar ? (
        <Image
          src={"/assets/images/ar-logo.svg"}
          alt="logo"
          width={94}
          height={26}
          className='w-12 h-5  md:w-24 md:h-6'

        />
      ) : (
        <Image
          src={"/assets/images/en-logo.svg"}
          alt="logo"
          width={94}
          height={26}
          className='w-12 h-5  md:w-24 md:h-6'
        />
      )}
      <p className='text-xs text-center md:text-start md:text-md'>
        {t("allRights")} {new Date().getFullYear()}
      </p>
      <ul className='flex gap-0 md:gap-2'>
        {socialMediaData.map(social => (
          <li key={"social-media" + social.id}>
            <Link target='_blank' href={social.url} title={social.text}>
              <Image src={social.icon} width={21} height={21} alt={social.text} />
            </Link>
          </li>))}

      </ul>
    </div>)
}

export default LandingFooter