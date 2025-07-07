"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Trophy, Calendar, Users, DollarSign } from "lucide-react"

interface Tournament {
  id: number
  name: string
  game: string
  prizePool: number
  date: string
  image: string
  participants: number
}

interface TournamentCarouselProps {
  tournaments: Tournament[]
}

export function TournamentCarousel({ tournaments }: TournamentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tournaments.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tournaments.length) % tournaments.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="w-full flex-shrink-0 px-2">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-400/50 transition-all duration-300">
                <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                  <img
                    src={tournament.image || "/placeholder.svg"}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {tournament.game}
                    </Badge>
                    <div className="flex items-center text-green-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-bold">${tournament.prizePool.toLocaleString()}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{tournament.name}</h3>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(tournament.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {tournament.participants} players
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    <Trophy className="h-4 w-4 mr-2" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 border-gray-700 hover:bg-gray-800"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 border-gray-700 hover:bg-gray-800"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {tournaments.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-400" : "bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
