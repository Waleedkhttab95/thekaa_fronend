'use client'
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../atoms/dialog'
import { Button } from '../atoms/button'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type props = {
  isOpen: boolean;
  successMessage: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SuccessDialog = (
  {
    successMessage,
    isOpen = false,
    setIsOpen,
  }
    : props) => {
  const t = useTranslations("common");
  const router = useRouter()
  const returnToDashboard = () => {
    setIsOpen(false)
    router.replace('/dashboard')
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}
    >
      <DialogContent className="md:h-[280px] md:w-[65vw] rounded w-[95vw]"
        onPointerDownOutside={(e) => e.preventDefault()}

      >
        <DialogHeader >
        </DialogHeader>
        <div >
          <Image
            src="/assets/images/icons/success.svg"
            width={61}
            height={67}
            alt={t("success")}
            className='mx-auto mb-4'
          />
          <DialogTitle className='text-center text-2xl'>{successMessage}</DialogTitle>
        </div>

        <DialogFooter className="my-4">
          <Button className='md:w-[50%] w-full mx-auto' onClick={() => returnToDashboard()}>
            {t("returnToDashboard")}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>)
}

export default SuccessDialog