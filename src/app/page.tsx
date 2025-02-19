import { useTranslations } from 'next-intl';
import { Link as LocalizedLink } from '@/i18n/routing';
import LocaleSwitcher from '@/app/components/atoms/LocaleSwitcher';
import Link from 'next/link';
import ThemeSwitcher from '@/app/components/atoms/ThemeSwitcher';

export default function HomePage() {

  const t = useTranslations('HomePage');
  return (
    <div>
      <h1 className='text-red-600 dark:text-yellow-400'>{t('base')}</h1>
      <LocaleSwitcher />
      <br />
      <ThemeSwitcher />
      <br />
      {/* for localized routes just  */}
      <br />
      <LocalizedLink href="/about">About</LocalizedLink>
      {/* using next/link for non-localized routes */}
      <Link href='/dashboard'> dashboard</Link>

    </div>
  );
}