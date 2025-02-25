"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="group">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent transition-all duration-500 group-hover:from-gray-500 group-hover:via-gray-300 group-hover:to-white">
                TACTICAL
              </span>
              <span className="text-white ml-2 relative">
                HIVE
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </span>
            </div>
          </div>
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-white text-base font-medium hover:text-gray-300 transition-colors duration-300">
            Home
          </Link>
          <a 
            href="#our-story" 
            onClick={(e) => scrollToSection(e, 'our-story')}
            className="text-white text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            Our Story
          </a>
          <a 
            href="#capabilities" 
            onClick={(e) => scrollToSection(e, 'capabilities')}
            className="text-white text-base font-medium hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            Capabilities
          </a>
          <Button 
            onClick={(e) => scrollToSection(e, 'contact')}
            variant="outline" 
            className="text-white border border-white hover:bg-white hover:text-black transition-all duration-300 text-base px-6 py-2 h-auto"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  )
}

