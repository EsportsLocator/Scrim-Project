import { Gamepad2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                EsportsHub
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for finding esports tournaments and gaming venues worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/venues" className="block text-gray-400 hover:text-white transition-colors">
                Find Venues
              </Link>
              <Link href="/tournaments" className="block text-gray-400 hover:text-white transition-colors">
                Find Tournaments
              </Link>
              <Link href="/submit" className="block text-gray-400 hover:text-white transition-colors">
                Submit Listing
              </Link>
              <Link href="/profile" className="block text-gray-400 hover:text-white transition-colors">
                Profile
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@esportshub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 EsportsHub. All rights reserved. Built for the gaming community.
          </p>
        </div>
      </div>
    </footer>
  )
}
