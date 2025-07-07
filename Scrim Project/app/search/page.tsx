"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Map, List, Star, MapPin, Trophy, Calendar, DollarSign, Bookmark, X } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Mock combined search results
const mockResults = [
  {
    id: 1,
    type: "venue",
    name: "GameZone Arena",
    address: "123 Gaming St, Tech City",
    rating: 4.8,
    games: ["CS2", "Valorant"],
    amenities: ["PC Gaming", "Food", "Parking"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    type: "tournament",
    name: "CS2 Championship Series",
    game: "CS2",
    date: "2024-02-15",
    location: "GameZone Arena",
    prizePool: 50000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    type: "venue",
    name: "Cyber Cafe Elite",
    address: "456 Esports Ave, Gaming District",
    rating: 4.6,
    games: ["Dota 2", "Overwatch"],
    amenities: ["PC Gaming", "Console", "VR"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    type: "tournament",
    name: "Valorant Masters Cup",
    game: "Valorant",
    date: "2024-02-20",
    location: "Online",
    prizePool: 25000,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const gameTypes = ["CS2", "Valorant", "League of Legends", "Dota 2", "Overwatch", "Fortnite"]
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Date" },
  { value: "distance", label: "Distance" },
  { value: "rating", label: "Rating" },
  { value: "prize", label: "Prize Pool" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [selectedGames, setSelectedGames] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["venue", "tournament"])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [savedSearches, setSavedSearches] = useState<string[]>([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const filteredResults = mockResults.filter((result) => {
    const matchesSearch = result.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedTypes.includes(result.type)
    const matchesGame =
      selectedGames.length === 0 ||
      (result.type === "tournament" && selectedGames.includes((result as any).game)) ||
      (result.type === "venue" && selectedGames.some((game) => (result as any).games?.includes(game)))

    return matchesSearch && matchesType && matchesGame
  })

  const handleGameToggle = (game: string) => {
    setSelectedGames((prev) => (prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]))
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const saveSearch = () => {
    if (searchQuery && !savedSearches.includes(searchQuery)) {
      setSavedSearches((prev) => [...prev, searchQuery])
    }
  }

  const clearFilters = () => {
    setSelectedGames([])
    setSelectedTypes(["venue", "tournament"])
    setSortBy("relevance")
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Search <span className="text-green-400">Results</span>
          </h1>

          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search tournaments, venues, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-gray-900/50 border-gray-700 focus:border-green-400 focus:ring-green-400/20 text-white placeholder-gray-400 rounded-xl"
              />
            </div>
            <Button
              onClick={saveSearch}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save Search
            </Button>
          </div>

          {/* Saved Searches */}
          {savedSearches.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Saved Searches:</p>
              <div className="flex flex-wrap gap-2">
                {savedSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-800"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                    <X
                      className="h-3 w-3 ml-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSavedSearches((prev) => prev.filter((_, i) => i !== index))
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Mobile Filters */}
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="sm:hidden border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-900 border-gray-800 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <FilterContent
                    selectedTypes={selectedTypes}
                    selectedGames={selectedGames}
                    onTypeToggle={handleTypeToggle}
                    onGameToggle={handleGameToggle}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{filteredResults.length} results found</span>

            {/* View Toggle */}
            <div className="flex bg-gray-900 rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-green-500 text-black hover:bg-green-600" : "text-gray-300 hover:text-white"
                }
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={
                  viewMode === "map" ? "bg-green-500 text-black hover:bg-green-600" : "text-gray-300 hover:text-white"
                }
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden sm:block w-80">
            <Card className="bg-gray-900/50 border-gray-800 sticky top-24">
              <CardContent className="p-6">
                <FilterContent
                  selectedTypes={selectedTypes}
                  selectedGames={selectedGames}
                  onTypeToggle={handleTypeToggle}
                  onGameToggle={handleGameToggle}
                  onClearFilters={clearFilters}
                />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {viewMode === "map" ? (
              <Card className="bg-gray-900/50 border-gray-800 h-[600px]">
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Map View</h3>
                      <p className="text-gray-400">Map integration would go here</p>
                      <p className="text-sm text-gray-500 mt-2">Showing {filteredResults.length} results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Suggestions:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-800"
                      onClick={() => setSearchQuery("CS2")}
                    >
                      Search for CS2
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-800"
                      onClick={() => setSearchQuery("gaming cafe")}
                    >
                      Find gaming cafes
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-800"
                      onClick={() => setSearchQuery("tournament")}
                    >
                      Browse tournaments
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredResults.map((result) => (
                  <Card
                    key={`${result.type}-${result.id}`}
                    className="bg-gray-900/50 border-gray-800 hover:border-green-400/50 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      {result.type === "venue" ? (
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={result.image || "/placeholder.svg"}
                              alt={result.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Venue
                                  </Badge>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{result.name}</h3>
                                <p className="text-gray-400 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {(result as any).address}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-300 ml-1">{(result as any).rating}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm text-gray-400 mb-1">Games Available:</p>
                                <div className="flex flex-wrap gap-1">
                                  {(result as any).games?.map((game: string) => (
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
                              <div>
                                <p className="text-sm text-gray-400 mb-1">Amenities:</p>
                                <div className="flex flex-wrap gap-1">
                                  {(result as any).amenities?.map((amenity: string) => (
                                    <Badge key={amenity} variant="outline" className="border-gray-600 text-gray-300">
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={result.image || "/placeholder.svg"}
                              alt={(result as any).game}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="border-red-500/30 text-red-400">
                                  <Trophy className="h-3 w-3 mr-1" />
                                  Tournament
                                </Badge>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-1">{result.name}</h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date((result as any).date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {(result as any).location}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                                {(result as any).game}
                              </Badge>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                <DollarSign className="h-3 w-3 mr-1" />${(result as any).prizePool?.toLocaleString()}
                              </Badge>
                            </div>
                            <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                              <Trophy className="h-4 w-4 mr-2" />
                              Register Now
                            </Button>
                          </div>
                        </div>
                      )}
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

// Filter Content Component
function FilterContent({
  selectedTypes,
  selectedGames,
  onTypeToggle,
  onGameToggle,
  onClearFilters,
}: {
  selectedTypes: string[]
  selectedGames: string[]
  onTypeToggle: (type: string) => void
  onGameToggle: (game: string) => void
  onClearFilters: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-white mb-3">Content Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="venues"
              checked={selectedTypes.includes("venue")}
              onCheckedChange={() => onTypeToggle("venue")}
              className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <label htmlFor="venues" className="text-sm text-gray-300 cursor-pointer">
              Venues
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tournaments"
              checked={selectedTypes.includes("tournament")}
              onCheckedChange={() => onTypeToggle("tournament")}
              className="border-gray-600 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
            />
            <label htmlFor="tournaments" className="text-sm text-gray-300 cursor-pointer">
              Tournaments
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-white mb-3">Games</h3>
        <div className="space-y-2">
          {gameTypes.map((game) => (
            <div key={game} className="flex items-center space-x-2">
              <Checkbox
                id={game}
                checked={selectedGames.includes(game)}
                onCheckedChange={() => onGameToggle(game)}
                className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <label htmlFor={game} className="text-sm text-gray-300 cursor-pointer">
                {game}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  )
}
