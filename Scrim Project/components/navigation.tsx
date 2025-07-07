"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Gamepad2, MapPin, Trophy, Plus, User, Menu, Search, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/venues", label: "Find Venues", icon: MapPin },
    { href: "/tournaments", label: "Find Tournaments", icon: Trophy },
    { href: "/search", label: "Search", icon: Search },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            EsportsHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  pathname === item.href ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Submit Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem asChild>
                <Link href="/submit?tab=tournament" className="text-white cursor-pointer">
                  <Trophy className="h-4 w-4 mr-2" />
                  Add Tournament
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/submit?tab=venue" className="text-white cursor-pointer">
                  <MapPin className="h-4 w-4 mr-2" />
                  Add Venue
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="text-white cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-white cursor-pointer">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-900 border-gray-800 text-white">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <Link
                  href="/submit?tab=tournament"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <Trophy className="h-5 w-5" />
                  <span>Add Tournament</span>
                </Link>
                <Link
                  href="/submit?tab=venue"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Add Venue</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
