import LocaleSwitcher from '../molecules/LocaleSwitcher'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link';

const Header = () => {
  const t = useTranslations();
  const containerClasses = 'mx-auto  sm:w-[93%] w-[96%] py-9 flex justify-between items-center';
  const logoClasses = 'w-[145px] lg:w-[184px]';
  const hiddenDivClasses = 'lg:w-[140px] hidden lg:block';

  return (
    <div className={containerClasses}>
      <div className={hiddenDivClasses}></div>
      <Link href="/">
        <Image className={logoClasses} src={'/assets/images/logo.svg'} width={184} height={78} alt={t('Thekaa')} />
      </Link>
      <LocaleSwitcher />
    </div>
  )
}

export default Header