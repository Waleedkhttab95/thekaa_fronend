import { useTranslations } from 'next-intl';
import Link from 'next/link';
// import ThemeSwitcher from '@/components/atoms/ThemeSwitcher';

export default function HomePage() {

  const t = useTranslations('HomePage');
  return (
    <div>
      <h1 className='text-red-600 dark:text-yellow-400'>{t('base')}</h1>
      <br />
      {/* <ThemeSwitcher /> */}
      <br />
      {/* using next/link for non-localized routes */}
      <Link href='/dashboard'> dashboard</Link>
      <h1 className="font-tajawal font-bold">بيزووو</h1>
      <h1 className="font-pingar font-medium">بيزووو</h1>
      <h1 className="font-ibm font-regular">بيزووو</h1>
    </div>
  );
}