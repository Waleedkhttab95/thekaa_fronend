"use client"

import MobileDrawer from "./MobileDrawer"

export default function LandingNavbar() {
  return (
    <>
      < div className="hidden md:flex items-center gap-6 text-white" >
        <a href="#" className="hover:underline">
          رابط 1
        </a>
        <a href="#" className="hover:underline">
          رابط 2
        </a>
        <a href="#" className="hover:underline">
          رابط 3
        </a>
        <a href="#" className="hover:underline">
          رابط 4
        </a>
        <a href="#" className="hover:underline">
          رابط 5
        </a>
      </div >
      {/* Mobile Menu */}
      < div className="md:hidden" >
        <MobileDrawer />
      </div >
    </ >
  )
}
