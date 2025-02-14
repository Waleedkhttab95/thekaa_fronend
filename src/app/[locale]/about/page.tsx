import LocaleSwitcher from '@/app/components/atoms/LocaleSwitcher'
import ClientComp from '@/app/components/atoms/client'
import ServerComp from '@/app/components/atoms/server'
import React from 'react'

const AboutPage = () => {
  return (
    <div>
      page
      <ServerComp />
      <ClientComp />
      <LocaleSwitcher />
    </div>

  )
}

export default AboutPage