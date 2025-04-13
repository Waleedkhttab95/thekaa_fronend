import SonsStudentsManagementPage from '@/components/pages/SonsStudentsManagementPage'
import { getLocale } from 'next-intl/server';
import React from 'react'
export async function generateMetadata() {
  const locale = await getLocale() as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: 'Sons Files Management',
    },
    ar: { title: "إدارة ملفات الأبناء" },
  };
  return metadataTranslations[locale]
}
const SonsStudentsManagement = () => {
  return (
    <SonsStudentsManagementPage />
  )
}

export default SonsStudentsManagement