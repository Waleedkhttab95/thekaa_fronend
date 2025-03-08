'use client'
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../atoms/dialog'
import { Button } from '../atoms/button'
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type props = {
  ConfirmDelete: () => void;
  isOpen: boolean;
  ConfirmMessage: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConfirmDeleteDialog = (
  {
    ConfirmDelete,
    ConfirmMessage,
    isOpen = false,
    setIsOpen
  }
    : props) => {
  const t = useTranslations("common")
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogContent className="md:h-[260px] md:w-[65vw] rounded w-[95vw]">
        <DialogHeader></DialogHeader>
        <div >
          <Image
            src="/assets/images/icons/lg-trash.svg"
            width={61}
            height={67}
            alt={t("delete")}
            className='mx-auto mb-4'
          />
          <DialogTitle className='text-center'>{ConfirmMessage}</DialogTitle>
        </div>

        <DialogFooter className="my-4 flex-col md:flex-row gap-2">
          <Button className='flex-1' variant="destructive_outline" onClick={() => ConfirmDelete()}>{t("confirmDelete")}</Button>
          <Button className='flex-1' onClick={() => setIsOpen(false)}>
            {t("cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
}

export default ConfirmDeleteDialog