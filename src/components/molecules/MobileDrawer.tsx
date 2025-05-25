"use client"
import { Button } from "@/components/atoms/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/atoms/sheet"
import { IHomeNavs } from "@/types/navs"
import { getCookie } from "cookies-next/client"
import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
type props = {
  navs: IHomeNavs[]
}
export default function MobileDrawer({ navs }: props) {
  const t = useTranslations('HomePage')
  const accessToken = getCookie("Authentication");
  const router = useRouter();
  const handleLoginClick = () => {
    if (accessToken) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#333] text-white border-none" >
        <div className="flex flex-col gap-6 mt-10">
          {navs.map(nav => (
            <a href={nav.href} className="text-xl hover:underline select-none" key={`nav-m-${nav.name}`}>
              {nav.name}
            </a>))
          }
          <div className="flex flex-col gap-4 mt-6">
            <Button variant="secondary" className="border-white text-secondary-foreground hover:bg-white/10 hover:text-white">
              {t("signup")}
            </Button>
            <Button className="bg-[#222] hover:bg-[#333] text-white rounded-full px-6" onClick={handleLoginClick}>{accessToken ? t("dashboard") : t("login")}</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
