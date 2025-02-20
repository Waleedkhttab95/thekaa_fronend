'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/routing';
import { Locales } from '@/types/locales.enum';

export default function LocaleSwitcher() {

  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const otherLocale = locale === Locales.en ? Locales.ar : Locales.en;
  const pathname = usePathname();

  return (

    <Link href={pathname} locale={otherLocale} className=' inline-block bg-red-500 ' >
      {t('switchLocale', { locale: otherLocale })}
    </Link >

  );


}