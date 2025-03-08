'use client'
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../atoms/dialog'
import { Button } from '../atoms/button'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type props = {
  isOpen: boolean;
  successMessage: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  returnTo: string;
}
const SuccessDialog = (
  {
    successMessage,
    isOpen = false,
    setIsOpen,
    returnTo
  }
    : props) => {
  const t = useTranslations("common");
  const router = useRouter()
  const returnToDashboard = () => {
    setIsOpen(false)
    router.replace(returnTo)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}
    >
      <DialogContent className="md:h-[300px] md:w-[65vw]  rounded w-[95vw]"
        onPointerDownOutside={(e) => e.preventDefault()}
        hideCloseButton={true}
      >
        <div className='mt-8' >
          <Image
            src="/assets/images/icons/success.svg"
            width={61}
            height={67}
            alt={t("success")}
            className='mx-auto mb-4'
          />
          <DialogTitle className='text-center text-2xl'>{successMessage}</DialogTitle>
        </div>

        <DialogFooter  >
          <Button className='md:w-[50%] w-full mx-auto' onClick={() => returnToDashboard()}>
            {t("returnToDashboard")}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>)
}

export default SuccessDialog