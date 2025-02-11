import { useTranslations } from 'next-intl';
import { Link as LocalizedLink } from '@/i18n/routing';
import LocaleSwitcher from '@/components/atoms/button';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('base')}</h1>
      <LocaleSwitcher />
      <br />
      {/* for localized routes just  */}
      <LocalizedLink href="/about">About</LocalizedLink>
      {/* using next/link for non-localized routes */}
      <Link href='/dashboard'> dashboard</Link>
    </div>
  );
}