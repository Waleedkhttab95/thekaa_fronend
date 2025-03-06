"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { PencilLineIcon } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/atoms/tooltip"
import { Slider } from "@/components/atoms/slider"

import Cropper, { Area, Point } from "react-easy-crop"
import { useTranslations } from "next-intl"
import { getAvatarInitials } from "@/utils/avatar"
type props = {
  avatar: string;
  avatarFallback: string;
  onAvatarChange: (newAvatar: string) => void
}
export default function AvatarEditorWithCrop({
  avatar: defaultAvatar,
  avatarFallback,
  onAvatarChange,
}: props) {
  const t = useTranslations("editStudentPage")
  const [avatar, setAvatar] = useState<string | null>(defaultAvatar);

  const [isEditing, setIsEditing] = useState(false)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string)
        setIsEditing(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }


  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new window.Image()
      image.addEventListener("load", () => resolve(image))
      image.addEventListener("error", (error) => reject(error))
      image.crossOrigin = "anonymous" // This avoids CORS issues
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return imageSrc
    }

    // Set canvas size to the desired output size
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Draw the cropped image
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )

    // As Base64 string
    return canvas.toDataURL("image/jpeg")
  }

  const saveCroppedImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
        setAvatar(croppedImage)
        onAvatarChange(croppedImage)
        setIsEditing(false)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 pt-0">
      <div className="relative group">
        <div className="relative w-[123px] h-[123px] rounded-full overflow-hidden shadow-xl">
          <Avatar className="w-full h-full">
            <AvatarImage src={avatar || "/placeholder.svg?height=160&width=160"} alt="Profile picture" />
            <AvatarFallback className="text-3xl">{getAvatarInitials(avatarFallback)}</AvatarFallback>
          </Avatar>

          <TooltipProvider>
            <Tooltip >
              <TooltipTrigger asChild>
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={triggerFileInput}
                  type="button"
                >
                  <PencilLineIcon className="size-[19px] text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{t("EditStudentPicture")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <Dialog open={isEditing} onOpenChange={setIsEditing} >
        <DialogContent className="sm:max-w-md  max-h-[95vh] scroll overflow-y-auto" >
          <DialogHeader>
            <DialogTitle>{t("EditStudentPicture")}</DialogTitle>
            <DialogDescription>{t("cropDescription")}</DialogDescription>
          </DialogHeader>

          {imageSrc && (
            <div className="relative h-60 w-full mt-4">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          )}

          <div className="mt-4 px-1">
            <label className="text-sm font-medium">{t("zoom")}</label>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="mt-2"
            />
          </div>

          <DialogFooter className="mt-4 flex gap-2 md:justify-between">
            <Button variant="outline" onClick={triggerFileInput}>
              {t("chooseDifferentImage")}
            </Button>
            <Button onClick={saveCroppedImage}>{t("saveChanges")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

