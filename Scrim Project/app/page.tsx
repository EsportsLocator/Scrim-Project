"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Trophy, Users, Star, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { CounterAnimation } from "@/components/counter-animation"
import { TournamentCarousel } from "@/components/tournament-carousel"

// Mock data
const featuredTournaments = [
  {
    id: 1,
    name: "CS2 World Championship",
    game: "CS2",
    prizePool: 100000,
    date: "2024-03-15",
    image: "/placeholder.svg?height=200&width=300",
    participants: 64,
  },
  {
    id: 2,
    name: "Valorant Masters Cup",
    game: "Valorant",
    prizePool: 75000,
    date: "2024-03-20",
    image: "/placeholder.svg?height=200&width=300",
    participants: 32,
  },
  {
    id: 3,
    name: "League of Legends Pro Series",
    game: "League of Legends",
    prizePool: 150000,
    date: "2024-03-25",
    image: "/placeholder.svg?height=200&width=300",
    participants: 16,
  },
]

const popularVenues = [
  {
    id: 1,
    name: "GameZone Arena",
    address: "123 Gaming St, Tech City",
    rating: 4.8,
    games: ["CS2", "Valorant", "LoL"],
    image: "/placeholder.svg?height=200&width=300",
    hours: "10 AM - 2 AM",
  },
  {
    id: 2,
    name: "Cyber Cafe Elite",
    address: "456 Esports Ave, Gaming District",
    rating: 4.6,
    games: ["Dota 2", "Overwatch", "Fortnite"],
    image: "/placeholder.svg?height=200&width=300",
    hours: "12 PM - 12 AM",
  },
  {
    id: 3,
    name: "Pro Gaming Lounge",
    address: "789 Competition Blvd, Victory Plaza",
    rating: 4.9,
    games: ["Apex Legends", "Rocket League", "FIFA"],
    image: "/placeholder.svg?height=200&width=300",
    hours: "2 PM - 3 AM",
  },
  {
    id: 4,
    name: "Digital Arena",
    address: "321 Virtual St, Cyber City",
    rating: 4.7,
    games: ["CS2", "Valorant", "Call of Duty"],
    image: "/placeholder.svg?height=200&width=300",
    hours: "9 AM - 1 AM",
  },
]

export default function HomePage() {
  const [tournamentSearch, setTournamentSearch] = useState("")
  const [venueSearch, setVenueSearch] = useState("")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-green-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Gaming Community
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Discover esports tournaments, gaming venues, and competitive events near you. Connect with players
              worldwide.
            </p>

            {/* Dual Search Bars */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {/* Tournament Search */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Trophy className="h-6 w-6 text-blue-400" />
                    <h3 className="text-lg font-semibold">Find Tournaments</h3>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search tournaments..."
                      value={tournamentSearch}
                      onChange={(e) => setTournamentSearch(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-600 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                  <Link href={`/tournaments${tournamentSearch ? `?q=${tournamentSearch}` : ""}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      Search Tournaments
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Venue Search */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-6 w-6 text-green-400" />
                    <h3 className="text-lg font-semibold">Find Venues</h3>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search venues..."
                      value={venueSearch}
                      onChange={(e) => setVenueSearch(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-600 focus:border-green-400 focus:ring-green-400/20"
                    />
                  </div>
                  <Link href={`/venues${venueSearch ? `?q=${venueSearch}` : ""}`}>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      Search Venues
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                <CounterAnimation end={1247} duration={2000} />
              </div>
              <p className="text-gray-400">Tournaments Listed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                <CounterAnimation end={856} duration={2000} />
              </div>
              <p className="text-gray-400">Venues Found</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                <CounterAnimation end={12543} duration={2000} />
              </div>
              <p className="text-gray-400">Users Registered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                <CounterAnimation end={89} duration={2000} />
              </div>
              <p className="text-gray-400">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-blue-400">Tournaments</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't miss out on these exciting upcoming tournaments with amazing prize pools
            </p>
          </div>

          <TournamentCarousel tournaments={featuredTournaments} />

          <div className="text-center mt-8">
            <Link href="/tournaments">
              <Button
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
              >
                View All Tournaments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Venues */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular <span className="text-green-400">Venues</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Top-rated gaming venues with the best equipment and atmosphere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularVenues.map((venue) => (
              <Card
                key={venue.id}
                className="bg-gray-900/50 border-gray-800 hover:border-green-400/50 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">{venue.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{venue.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {venue.address}
                  </p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {venue.games.slice(0, 3).map((game) => (
                        <Badge
                          key={game}
                          variant="secondary"
                          className="bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                        >
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">{venue.hours}</p>

                  <Link href={`/venues/${venue.id}`}>
                    <Button size="sm" className="w-full bg-green-500 hover:bg-green-600 text-black">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/venues">
              <Button
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black bg-transparent"
              >
                View All Venues
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Get started with EsportsHub in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">1. Search & Discover</h3>
              <p className="text-gray-300">
                Find tournaments and venues near you using our powerful search filters and interactive map.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">2. Connect & Register</h3>
              <p className="text-gray-300">
                Join tournaments, book venue sessions, and connect with other gamers in your community.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Play className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">3. Play & Compete</h3>
              <p className="text-gray-300">
                Participate in tournaments, improve your skills, and climb the leaderboards to become a champion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
