"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload, Trophy, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const gameOptions = [
  "CS2",
  "Valorant",
  "League of Legends",
  "Dota 2",
  "Overwatch",
  "Fortnite",
  "Apex Legends",
  "Rocket League",
  "FIFA",
  "Call of Duty",
]

interface FormData {
  game: string
  tournamentName: string
  date: Date | undefined
  location: string
  prizePool: string
  registrationLink: string
  description: string
  image: File | null
}

interface FormErrors {
  [key: string]: string
}

export default function TournamentSubmissionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    game: "",
    tournamentName: "",
    date: undefined,
    location: "",
    prizePool: "",
    registrationLink: "",
    description: "",
    image: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.game) newErrors.game = "Please select a game"
    if (!formData.tournamentName.trim()) newErrors.tournamentName = "Tournament name is required"
    if (!formData.date) newErrors.date = "Please select a date"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.prizePool.trim()) newErrors.prizePool = "Prize pool is required"
    if (formData.prizePool && isNaN(Number(formData.prizePool))) {
      newErrors.prizePool = "Prize pool must be a valid number"
    }
    if (!formData.registrationLink.trim()) newErrors.registrationLink = "Registration link is required"
    if (formData.registrationLink && !isValidUrl(formData.registrationLink)) {
      newErrors.registrationLink = "Please enter a valid URL"
    }
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    router.push("/submit/tournament/success")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tournaments" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tournaments
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Submit <span className="text-red-400">Tournament</span>
          </h1>
          <p className="text-gray-300">Add a new esports tournament to our platform</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Trophy className="h-5 w-5 mr-2 text-red-400" />
              Tournament Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Game Selection */}
              <div className="space-y-2">
                <Label htmlFor="game" className="text-white">
                  Game *
                </Label>
                <Select
                  value={formData.game}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, game: value }))}
                >
                  <SelectTrigger
                    className={cn("bg-gray-800 border-gray-700 text-white", errors.game && "border-red-500")}
                  >
                    <SelectValue placeholder="Select a game" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {gameOptions.map((game) => (
                      <SelectItem key={game} value={game} className="text-white">
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.game && <p className="text-red-400 text-sm">{errors.game}</p>}
              </div>

              {/* Tournament Name */}
              <div className="space-y-2">
                <Label htmlFor="tournamentName" className="text-white">
                  Tournament Name *
                </Label>
                <Input
                  id="tournamentName"
                  value={formData.tournamentName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tournamentName: e.target.value }))}
                  className={cn(
                    "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                    errors.tournamentName && "border-red-500",
                  )}
                  placeholder="Enter tournament name"
                />
                {errors.tournamentName && <p className="text-red-400 text-sm">{errors.tournamentName}</p>}
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <Label className="text-white">Tournament Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                        !formData.date && "text-gray-400",
                        errors.date && "border-red-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  className={cn(
                    "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                    errors.location && "border-red-500",
                  )}
                  placeholder="Enter location or 'Online'"
                />
                {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
              </div>

              {/* Prize Pool */}
              <div className="space-y-2">
                <Label htmlFor="prizePool" className="text-white">
                  Prize Pool (USD) *
                </Label>
                <Input
                  id="prizePool"
                  type="number"
                  value={formData.prizePool}
                  onChange={(e) => setFormData((prev) => ({ ...prev, prizePool: e.target.value }))}
                  className={cn(
                    "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                    errors.prizePool && "border-red-500",
                  )}
                  placeholder="Enter prize pool amount"
                />
                {errors.prizePool && <p className="text-red-400 text-sm">{errors.prizePool}</p>}
              </div>

              {/* Registration Link */}
              <div className="space-y-2">
                <Label htmlFor="registrationLink" className="text-white">
                  Registration Link *
                </Label>
                <Input
                  id="registrationLink"
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData((prev) => ({ ...prev, registrationLink: e.target.value }))}
                  className={cn(
                    "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                    errors.registrationLink && "border-red-500",
                  )}
                  placeholder="https://example.com/register"
                />
                {errors.registrationLink && <p className="text-red-400 text-sm">{errors.registrationLink}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className={cn(
                    "bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[120px]",
                    errors.description && "border-red-500",
                  )}
                  placeholder="Describe your tournament, rules, format, etc. (minimum 50 characters)"
                />
                <div className="flex justify-between text-sm">
                  {errors.description && <p className="text-red-400">{errors.description}</p>}
                  <p className="text-gray-400 ml-auto">{formData.description.length}/50 minimum</p>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-white">Tournament Image</Label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">
                      {formData.image ? formData.image.name : "Click to upload tournament image"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
              >
                {isSubmitting ? "Submitting..." : "Submit Tournament"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
