import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProfileDropdown } from "@/components/profile-dropdown"

export function Navbar() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Trading Hub Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold">Trading Hub</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-sm font-medium hover:text-gray-300">
              Strategies
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-300">
              Analysis Tools
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-300">
              Market News
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-gray-300 text-white">
              Blogs
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-300">
              Resources
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full">
              Join Pro
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}
