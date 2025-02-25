import { useTranslations } from 'next-intl';
import { Link as LocalizedLink } from '@/i18n/routing';
import LocaleSwitcher from '@/components/atoms/LocaleSwitcher';
import Link from 'next/link';
import ThemeSwitcher from '@/components/atoms/ThemeSwitcher';

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
      <h1 className="font-tajawal font-bold">بيزووو</h1>
      <h1 className="font-pingar font-medium">بيزووو</h1>
      <h1 className="font-ibm font-regular">بيزووو</h1>
    </div>
  );
}