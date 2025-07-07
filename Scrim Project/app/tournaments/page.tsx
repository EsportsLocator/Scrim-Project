"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  CalendarIcon,
  Trophy,
  MapPin,
  List,
  CalendarDays,
  Clock,
  DollarSign,
  Users,
  Wifi,
  Monitor,
  Filter,
  Star,
  Heart,
} from "lucide-react"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import { CountdownTimer } from "@/components/countdown-timer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Mock tournament data
const mockTournaments = [
  {
    id: 1,
    name: "CS2 Championship Series",
    game: "CS2",
    prizePool: 50000,
    date: "2024-03-15",
    time: "18:00",
    location: "GameZone Arena",
    type: "offline",
    participants: 64,
    maxParticipants: 64,
    image: "/placeholder.svg?height=100&width=100",
    status: "open",
    featured: true,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Valorant Masters Cup",
    game: "Valorant",
    prizePool: 25000,
    date: "2024-03-20",
    time: "20:00",
    location: "Online",
    type: "online",
    participants: 45,
    maxParticipants: 128,
    image: "/placeholder.svg?height=100&width=100",
    status: "open",
    featured: true,
    isFavorite: true,
  },
  {
    id: 3,
    name: "League of Legends Pro League",
    game: "League of Legends",
    prizePool: 100000,
    date: "2024-03-25",
    time: "16:00",
    location: "Cyber Cafe Elite",
    type: "offline",
    participants: 32,
    maxParticipants: 32,
    image: "/placeholder.svg?height=100&width=100",
    status: "full",
    featured: false,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Dota 2 International Qualifier",
    game: "Dota 2",
    prizePool: 75000,
    date: "2024-04-01",
    time: "19:00",
    location: "Online",
    type: "online",
    participants: 128,
    maxParticipants: 256,
    image: "/placeholder.svg?height=100&width=100",
    status: "open",
    featured: false,
    isFavorite: false,
  },
]

const gameTypes = ["CS2", "Valorant", "League of Legends", "Dota 2", "Overwatch", "Fortnite", "Apex Legends"]
const prizeRanges = [
  { label: "$0 - $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $10,000", min: 1000, max: 10000 },
  { label: "$10,000+", min: 10000, max: Number.POSITIVE_INFINITY },
]

export default function TournamentsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [selectedGames, setSelectedGames] = useState<string[]>([])
  const [selectedPrizeRanges, setSelectedPrizeRanges] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [isLoading, setIsLoading] = useState(false)
  const [tournaments, setTournaments] = useState(mockTournaments)

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.game.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGames = selectedGames.length === 0 || selectedGames.includes(tournament.game)
    const matchesPrizeRange =
      selectedPrizeRanges.length === 0 ||
      selectedPrizeRanges.some((range) => {
        const prizeRange = prizeRanges.find((r) => r.label === range)
        return prizeRange && tournament.prizePool >= prizeRange.min && tournament.prizePool <= prizeRange.max
      })
    const matchesDate = !selectedDate || tournament.date === format(selectedDate, "yyyy-MM-dd")
    const matchesType = !onlineOnly || tournament.type === "online"
    const matchesStatus = registrationStatus === "all" || tournament.status === registrationStatus

    return matchesSearch && matchesGames && matchesPrizeRange && matchesDate && matchesType && matchesStatus
  })

  const featuredTournaments = filteredTournaments.filter((t) => t.featured)

  const handleGameToggle = (game: string) => {
    setSelectedGames((prev) => (prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]))
  }

  const handlePrizeRangeToggle = (range: string) => {
    setSelectedPrizeRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
  }

  const toggleFavorite = (tournamentId: number) => {
    setTournaments((prev) =>
      prev.map((tournament) =>
        tournament.id === tournamentId ? { ...tournament, isFavorite: !tournament.isFavorite } : tournament,
      ),
    )
    toast({
      title: "Favorite updated",
      description: "Tournament has been added to your favorites",
    })
  }

  const clearFilters = () => {
    setSelectedGames([])
    setSelectedPrizeRanges([])
    setSelectedDate(undefined)
    setOnlineOnly(false)
    setRegistrationStatus("all")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Open</Badge>
      case "full":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Full</Badge>
      case "closed":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Closed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Esports <span className="text-blue-400">Tournaments</span>
          </h1>
          <p className="text-gray-300 text-lg">Compete in tournaments and win amazing prizes</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search tournaments by name or game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400/20 text-white placeholder-gray-400 rounded-xl"
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex bg-gray-900 rounded-lg p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-300 hover:text-white"
              }
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={
                viewMode === "calendar" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-300 hover:text-white"
              }
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </Button>
          </div>

          <div className="text-sm text-gray-400">{filteredTournaments.length} tournaments found</div>
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

                {/* Registration Status */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Registration Status</h4>
                  <Select value={registrationStatus} onValueChange={setRegistrationStatus}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Tournaments
                      </SelectItem>
                      <SelectItem value="open" className="text-white">
                        Open Registration
                      </SelectItem>
                      <SelectItem value="full" className="text-white">
                        Full
                      </SelectItem>
                      <SelectItem value="closed" className="text-white">
                        Closed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Online/Offline Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-only" className="text-white">
                    Online tournaments only
                  </Label>
                  <Switch id="online-only" checked={onlineOnly} onCheckedChange={setOnlineOnly} />
                </div>

                {/* Date Filter */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Date</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                          !selectedDate && "text-gray-400",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
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
                          className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label htmlFor={game} className="text-sm text-gray-300 cursor-pointer">
                          {game}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prize Range */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Prize Pool</h4>
                  <div className="space-y-2">
                    {prizeRanges.map((range) => (
                      <div key={range.label} className="flex items-center space-x-2">
                        <Checkbox
                          id={range.label}
                          checked={selectedPrizeRanges.includes(range.label)}
                          onCheckedChange={() => handlePrizeRangeToggle(range.label)}
                          className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label htmlFor={range.label} className="text-sm text-gray-300 cursor-pointer">
                          {range.label}
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
            {/* Featured Tournaments */}
            {featuredTournaments.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  Featured Tournaments
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {featuredTournaments.slice(0, 2).map((tournament) => (
                    <Card
                      key={tournament.id}
                      className="bg-gradient-to-br from-blue-900/20 to-green-900/20 border-blue-400/30 hover:border-blue-400/50 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Featured</Badge>
                            {getStatusBadge(tournament.status)}
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`${tournament.isFavorite ? "text-red-500" : "text-gray-400"} hover:text-red-400`}
                            onClick={() => toggleFavorite(tournament.id)}
                          >
                            <Heart className={`h-5 w-5 ${tournament.isFavorite ? "fill-current" : ""}`} />
                          </Button>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {new Date(tournament.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {tournament.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tournament.location}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {tournament.game}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              <DollarSign className="h-3 w-3 mr-1" />${tournament.prizePool.toLocaleString()}
                            </Badge>
                          </div>
                          <CountdownTimer targetDate={`${tournament.date}T${tournament.time}`} />
                        </div>

                        <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                          <Trophy className="h-4 w-4 mr-2" />
                          Register Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Tournament List/Calendar */}
            {viewMode === "calendar" ? (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <CalendarDays className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Calendar View</h3>
                    <p className="text-gray-400">Calendar integration would go here</p>
                    <p className="text-sm text-gray-500 mt-2">Showing {filteredTournaments.length} tournaments</p>
                  </div>
                </CardContent>
              </Card>
            ) : isLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <LoadingSpinner />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTournaments.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="No tournaments found"
                description="Try adjusting your search criteria or filters"
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="space-y-6">
                {filteredTournaments.map((tournament) => (
                  <Card
                    key={tournament.id}
                    className="bg-gray-900/50 border-gray-800 hover:border-blue-400/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Tournament Image */}
                        <div className="w-full md:w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <img
                            src={tournament.image || "/placeholder.svg"}
                            alt={tournament.game}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute top-2 right-2 ${
                              tournament.isFavorite ? "text-red-500" : "text-gray-400"
                            } hover:text-red-400`}
                            onClick={() => toggleFavorite(tournament.id)}
                          >
                            <Heart className={`h-4 w-4 ${tournament.isFavorite ? "fill-current" : ""}`} />
                          </Button>
                        </div>

                        {/* Tournament Info */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {tournament.featured && (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Featured
                                  </Badge>
                                )}
                                {getStatusBadge(tournament.status)}
                              </div>
                              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                                {tournament.name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-1" />
                                  {new Date(tournament.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {tournament.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {tournament.location}
                                </div>
                              </div>
                            </div>

                            <CountdownTimer targetDate={`${tournament.date}T${tournament.time}`} />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {tournament.game}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              <DollarSign className="h-3 w-3 mr-1" />${tournament.prizePool.toLocaleString()}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              <Users className="h-3 w-3 mr-1" />
                              {tournament.participants}/{tournament.maxParticipants} players
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`border-gray-600 ${
                                tournament.type === "online" ? "text-blue-400" : "text-green-400"
                              }`}
                            >
                              {tournament.type === "online" ? (
                                <Wifi className="h-3 w-3 mr-1" />
                              ) : (
                                <Monitor className="h-3 w-3 mr-1" />
                              )}
                              {tournament.type}
                            </Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold"
                              disabled={tournament.status === "full" || tournament.status === "closed"}
                            >
                              <Trophy className="h-4 w-4 mr-2" />
                              {tournament.status === "full"
                                ? "Tournament Full"
                                : tournament.status === "closed"
                                  ? "Registration Closed"
                                  : "Register Now"}
                            </Button>
                            <Button
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Past Tournaments Link */}
            <div className="text-center mt-12">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                View Past Tournaments Archive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
