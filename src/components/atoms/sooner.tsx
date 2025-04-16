"use client"

import { useTheme } from "next-themes"
import { Toaster, toast as sonnerToast } from "sonner"
import { useLocale } from "next-intl"
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success" | "info" | "warning"
}

export function Sonner() {
  const { theme } = useTheme()
  const locale = useLocale()
  const isRtl = locale === "ar"

  return (
    <Toaster
      theme={theme as "light" | "dark" | "system"}
      position={isRtl ? "top-left" : "top-right"}
      closeButton
      richColors
      expand={false}
      duration={4000}
      dir={isRtl ? "rtl" : "ltr"}
    />
  )
}

export function toast({ title, description, variant = "default" }: ToastProps) {
  const icon = {
    success: <CheckCircle className="h-5 w-5" />,
    destructive: <XCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    default: <Info className="h-5 w-5" />,
  }[variant]

  // Map our variants to Sonner's built-in types
  const type = {
    success: "success",
    destructive: "error",
    warning: "warning",
    info: "info",
    default: "default",
  }[variant] as "success" | "error" | "warning" | "info" | "default"

  if (type === "default") {
    return sonnerToast(title || "", {
      description,
      icon,
    });
  }

  return sonnerToast[type as "success" | "error" | "warning" | "info"](title || "", {
    description,
    icon,
  })
}

