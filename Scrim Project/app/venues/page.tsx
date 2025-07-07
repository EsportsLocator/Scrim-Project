"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  MapPin,
  Star,
  Heart,
  NavigationIcon,
  Clock,
  Filter,
  Map,
  Grid3X3,
  Wifi,
  Car,
  Coffee,
  Gamepad2,
  Monitor,
  Headphones,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"
import { useToast } from "@/hooks/use-toast"

// Mock venue data
const mockVenues = [
  {
    id: 1,
    name: "GameZone Arena",
    address: "123 Gaming St, Tech City",
    games: ["CS2", "Valorant", "League of Legends"],
    hours: "10 AM - 2 AM",
    rating: 4.8,
    amenities: ["PC Gaming", "Food", "Parking", "WiFi"],
    coordinates: { lat: 40.7128, lng: -74.006 },
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Cyber Cafe Elite",
    address: "456 Esports Ave, Gaming District",
    games: ["Dota 2", "Overwatch", "Fortnite"],
    hours: "12 PM - 12 AM",
    rating: 4.6,
    amenities: ["PC Gaming", "Console", "VR", "Food"],
    coordinates: { lat: 40.7589, lng: -73.9851 },
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Pro Gaming Lounge",
    address: "789 Competition Blvd, Victory Plaza",
    games: ["Apex Legends", "Rocket League", "FIFA"],
    hours: "2 PM - 3 AM",
    rating: 4.9,
    amenities: ["Console", "VR", "Parking", "WiFi"],
    coordinates: { lat: 40.7505, lng: -73.9934 },
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
]

const gameTypes = [
  "CS2",
  "Valorant",
  "League of Legends",
  "Dota 2",
  "Overwatch",
  "Fortnite",
  "Apex Legends",
  "Rocket League",
  "FIFA",
]
const amenityTypes = ["PC Gaming", "Console", "VR", "Food", "Parking", "WiFi"]

export default function VenuesPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [selectedGames, setSelectedGames] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [radiusFilter, setRadiusFilter] = useState([25])
  const [sortBy, setSortBy] = useState("distance")
  const [viewMode, setViewMode] = useState<"map" | "grid">("grid")
  const [isLoading, setIsLoading] = useState(false)
  const [venues, setVenues] = useState(mockVenues)

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGames = selectedGames.length === 0 || selectedGames.some((game) => venue.games.includes(game))
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => venue.amenities.includes(amenity))

    return matchesSearch && matchesGames && matchesAmenities
  })

  const handleGameToggle = (game: string) => {
    setSelectedGames((prev) => (prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]))
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const toggleFavorite = (venueId: number) => {
    setVenues((prev) =>
      prev.map((venue) => (venue.id === venueId ? { ...venue, isFavorite: !venue.isFavorite } : venue)),
    )
    toast({
      title: "Favorite updated",
      description: "Venue has been added to your favorites",
    })
  }

  const clearFilters = () => {
    setSelectedGames([])
    setSelectedAmenities([])
    setRadiusFilter([25])
    setSortBy("distance")
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Gaming <span className="text-green-400">Venues</span>
          </h1>
          <p className="text-gray-300 text-lg">Discover the best esports venues and gaming cafes near you</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search venues by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-gray-900/50 border-gray-700 focus:border-green-400 focus:ring-green-400/20 text-white placeholder-gray-400 rounded-xl"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="distance" className="text-white">
                  Distance
                </SelectItem>
                <SelectItem value="rating" className="text-white">
                  Rating
                </SelectItem>
                <SelectItem value="newest" className="text-white">
                  Newest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{filteredVenues.length} venues found</span>

            {/* View Toggle */}
            <div className="flex bg-gray-900 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-green-500 text-black hover:bg-green-600" : "text-gray-300 hover:text-white"
                }
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={
                  viewMode === "map" ? "bg-green-500 text-black hover:bg-green-600" : "text-gray-300 hover:text-white"
                }
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
                    Clear All
                  </Button>
                </div>

                {/* Location Radius */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Distance</h4>
                  <div className="space-y-3">
                    <Slider
                      value={radiusFilter}
                      onValueChange={setRadiusFilter}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-400">Within {radiusFilter[0]} miles</p>
                  </div>
                </div>

                {/* Game Types */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Game Types</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {gameTypes.map((game) => (
                      <div key={game} className="flex items-center space-x-2">
                        <Checkbox
                          id={game}
                          checked={selectedGames.includes(game)}
                          onCheckedChange={() => handleGameToggle(game)}
                          className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <label htmlFor={game} className="text-sm text-gray-300 cursor-pointer">
                          {game}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {amenityTypes.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityToggle(amenity)}
                          className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <label htmlFor={amenity} className="text-sm text-gray-300 cursor-pointer flex items-center">
                          {amenity === "PC Gaming" && <Monitor className="h-4 w-4 mr-1" />}
                          {amenity === "Console" && <Gamepad2 className="h-4 w-4 mr-1" />}
                          {amenity === "VR" && <Headphones className="h-4 w-4 mr-1" />}
                          {amenity === "Food" && <Coffee className="h-4 w-4 mr-1" />}
                          {amenity === "Parking" && <Car className="h-4 w-4 mr-1" />}
                          {amenity === "WiFi" && <Wifi className="h-4 w-4 mr-1" />}
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === "map" ? (
              <Card className="bg-gray-900/50 border-gray-800 h-[600px]">
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
                      <p className="text-gray-400">Map integration would go here</p>
                      <p className="text-sm text-gray-500 mt-2">Showing {filteredVenues.length} venues</p>
                    </div>

                    {/* Mock venue markers */}
                    {filteredVenues.slice(0, 3).map((venue, index) => (
                      <div
                        key={venue.id}
                        className="absolute bg-green-500 text-black px-3 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-green-400 transition-colors"
                        style={{
                          left: `${20 + index * 25}%`,
                          top: `${30 + index * 15}%`,
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <div>
                            <div className="font-semibold text-sm">{venue.name}</div>
                            <div className="flex items-center text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              {venue.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <LoadingSpinner />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredVenues.length === 0 ? (
              <EmptyState
                icon={MapPin}
                title="No venues found"
                description="Try adjusting your search criteria or filters"
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="bg-gray-900/50 border-gray-800 hover:border-green-400/50 transition-all duration-300 group"
                  >
                    <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden relative">
                      <img
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`absolute top-2 right-2 ${
                          venue.isFavorite ? "text-red-500" : "text-gray-400"
                        } hover:text-red-400`}
                        onClick={() => toggleFavorite(venue.id)}
                      >
                        <Heart className={`h-5 w-5 ${venue.isFavorite ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                          {venue.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{venue.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-400 mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{venue.address}</span>
                      </div>

                      <div className="flex items-center text-gray-400 mb-4">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{venue.hours}</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-400 mb-2">Games Available:</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.games.map((game) => (
                            <Badge
                              key={game}
                              variant="secondary"
                              className="bg-green-500/20 text-green-400 border-green-500/30"
                            >
                              {game}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-400 mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" className="border-gray-600 text-gray-300">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold">
                          <NavigationIcon className="h-4 w-4 mr-2" />
                          Directions
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`border-gray-600 ${
                            venue.isFavorite ? "text-red-500 border-red-500" : "text-gray-300"
                          } hover:bg-gray-800`}
                          onClick={() => toggleFavorite(venue.id)}
                        >
                          <Heart className={`h-4 w-4 ${venue.isFavorite ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
