'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/routing';
import { Locales } from '@/types/locales.enum';
import { Button } from '../atoms/button';

export default function LocaleSwitcher() {

  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const otherLocale = locale === Locales.en ? Locales.ar : Locales.en;
  const pathname = usePathname();

  return (

    <Button className='inline-block bg-red-500'>
      <Link href={pathname} locale={otherLocale}>
        {t('switchLocale', { locale: otherLocale })}
      </Link>
    </Button>

  );


}