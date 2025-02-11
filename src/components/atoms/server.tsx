import { getTranslations } from 'next-intl/server';
import React from 'react'

const ServerComp = async () => {
  const t = await getTranslations('HomePage');

  return (
    <>
      <div>from server</div>
      <h1>value : {t('base')}</h1>
    </>
  )
}

export default ServerComp