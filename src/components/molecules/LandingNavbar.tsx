"use client"

import { useMemo } from "react"
import MobileDrawer from "./MobileDrawer"
import { useTranslations } from "next-intl"
import { IHomeNavs } from "@/types/navs"


export default function LandingNavbar() {
  const t = useTranslations('HomePage.navs')
  const navs = useMemo<IHomeNavs[]>(() => [
    { name: t("home"), href: "/#" },
    { name: t("features"), href: "#features-section" },
    { name: t("howCanHelp"), href: "/#howWeCanHelp-section" },
    { name: t("journeySteps"), href: "/#journey-section" },
    { name: t("successStories"), href: "/#successStories-section" },
  ], [t])
  return (
    <>
      < div className="hidden md:flex items-center gap-6 text-white" >
        {navs.map(nav => (
          <a href={nav.href} className="hover:underline select-none" key={`nav-${nav.name}`}>
            {nav.name}
          </a>))
        }


      </div >
      {/* Mobile Menu */}
      < div className="md:hidden" >
        <MobileDrawer navs={navs} />
      </div >
    </ >
  )
}
