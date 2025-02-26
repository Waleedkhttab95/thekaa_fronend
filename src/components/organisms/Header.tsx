import LocaleSwitcher from '../molecules/LocaleSwitcher'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link';

const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  const containerClasses = 'mx-auto  sm:w-[93%] w-[96%] py-9 flex justify-between items-center';
  const logoClasses = 'hidden md:block md:w-[134px] lg:w-[150px]  h-[50px]';
  const mLogoClasses = 'block md:hidden'
  const hiddenDivClasses = 'lg:w-[140px] hidden lg:block';

  return (
    <div className={containerClasses}>
      <div className={hiddenDivClasses}></div>
      <Link href="/">
        <Image className={logoClasses} src={`/assets/images/${locale}-logo.svg`} width={150} height={50} alt={t('Thekaa')} />
        <Image className={mLogoClasses} src={`/assets/images/m-logo.svg`} width={55} height={54} alt={t('Thekaa')} />
      </Link>
      <LocaleSwitcher />
    </div>
  )
}

export default Header