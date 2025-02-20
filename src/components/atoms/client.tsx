import { useTranslations } from 'next-intl';
import React from 'react'

const ClientComp = () => {
  const t = useTranslations('HomePage');

  return (
    <>
      <div>from client</div>
      <h1>value : {t('base')}</h1>
    </>
  )
}

export default ClientComp