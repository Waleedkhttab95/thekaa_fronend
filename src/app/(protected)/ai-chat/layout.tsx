import AiChatLayout from '@/components/layouts/AiChatLayout'
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { getLocale } from 'next-intl/server'
import React, { PropsWithChildren } from 'react'

const layout = async ({ children }: PropsWithChildren) => {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  return (
    <html lang={locale} dir={dir}><body>

      <DashboardLayout><AiChatLayout>{children}</AiChatLayout></DashboardLayout></body></html>
  )
}

export default layout