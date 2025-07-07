"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, MapPin, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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

const amenityOptions = [
  "PC Gaming",
  "Console Gaming",
  "VR Gaming",
  "Food & Drinks",
  "Parking",
  "WiFi",
  "Air Conditioning",
  "Streaming Setup",
  "Private Rooms",
  "Tournament Area",
]

interface FormData {
  venueName: string
  address: string
  selectedGames: string[]
  openingTime: string
  closingTime: string
  selectedAmenities: string[]
  contactEmail: string
  contactPhone: string
  website: string
  description: string
  images: File[]
}

interface FormErrors {
  [key: string]: string
}

export function VenueSubmissionForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    venueName: "",
    address: "",
    selectedGames: [],
    openingTime: "",
    closingTime: "",
    selectedAmenities: [],
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
    images: [],
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.venueName.trim()) newErrors.venueName = "Venue name is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (formData.selectedGames.length === 0) newErrors.selectedGames = "Select at least one game"
    if (!formData.openingTime) newErrors.openingTime = "Opening time is required"
    if (!formData.closingTime) newErrors.closingTime = "Closing time is required"
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required"
    if (formData.contactEmail && !isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email"
    }
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccessModal(true)
    toast({
      title: "Venue submitted!",
      description: "Your venue has been submitted for review.",
    })
  }

  const handleGameToggle = (game: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedGames: prev.selectedGames.includes(game)
        ? prev.selectedGames.filter((g) => g !== game)
        : [...prev.selectedGames, game],
    }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((a) => a !== amenity)
        : [...prev.selectedAmenities, amenity],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const resetForm = () => {
    setFormData({
      venueName: "",
      address: "",
      selectedGames: [],
      openingTime: "",
      closingTime: "",
      selectedAmenities: [],
      contactEmail: "",
      contactPhone: "",
      website: "",
      description: "",
      images: [],
    })
    setErrors({})
    setShowSuccessModal(false)
  }

  return (
    <>
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <MapPin className="h-5 w-5 mr-2 text-green-400" />
            Venue Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Venue Name */}
            <div className="space-y-2">
              <Label htmlFor="venueName" className="text-white">
                Venue Name *
              </Label>
              <Input
                id="venueName"
                value={formData.venueName}
                onChange={(e) => setFormData((prev) => ({ ...prev, venueName: e.target.value }))}
                className={cn(
                  "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                  errors.venueName && "border-red-500",
                )}
                placeholder="Enter venue name"
              />
              {errors.venueName && <p className="text-red-400 text-sm">{errors.venueName}</p>}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Address *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className={cn(
                  "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                  errors.address && "border-red-500",
                )}
                placeholder="Enter full address"
              />
              {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
            </div>

            {/* Games Available */}
            <div className="space-y-3">
              <Label className="text-white">Games Available *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gameOptions.map((game) => (
                  <div key={game} className="flex items-center space-x-2">
                    <Checkbox
                      id={game}
                      checked={formData.selectedGames.includes(game)}
                      onCheckedChange={() => handleGameToggle(game)}
                      className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label htmlFor={game} className="text-sm text-gray-300 cursor-pointer">
                      {game}
                    </label>
                  </div>
                ))}
              </div>
              {errors.selectedGames && <p className="text-red-400 text-sm">{errors.selectedGames}</p>}
            </div>

            {/* Operating Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openingTime" className="text-white">
                  Opening Time *
                </Label>
                <Input
                  id="openingTime"
                  type="time"
                  value={formData.openingTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, openingTime: e.target.value }))}
                  className={cn("bg-gray-800 border-gray-700 text-white", errors.openingTime && "border-red-500")}
                />
                {errors.openingTime && <p className="text-red-400 text-sm">{errors.openingTime}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="closingTime" className="text-white">
                  Closing Time *
                </Label>
                <Input
                  id="closingTime"
                  type="time"
                  value={formData.closingTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, closingTime: e.target.value }))}
                  className={cn("bg-gray-800 border-gray-700 text-white", errors.closingTime && "border-red-500")}
                />
                {errors.closingTime && <p className="text-red-400 text-sm">{errors.closingTime}</p>}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label className="text-white">Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.selectedAmenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                      className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label htmlFor={amenity} className="text-sm text-gray-300 cursor-pointer">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-white">
                  Contact Email *
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  className={cn(
                    "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
                    errors.contactEmail && "border-red-500",
                  )}
                  placeholder="contact@venue.com"
                />
                {errors.contactEmail && <p className="text-red-400 text-sm">{errors.contactEmail}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-white">
                  Contact Phone
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="https://venue-website.com"
              />
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
                placeholder="Describe your venue, facilities, atmosphere, etc. (minimum 50 characters)"
              />
              <div className="flex justify-between text-sm">
                {errors.description && <p className="text-red-400">{errors.description}</p>}
                <p className="text-gray-400 ml-auto">{formData.description.length}/50 minimum</p>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-white">Venue Images</Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">
                    {formData.images.length > 0
                      ? `${formData.images.length} image(s) selected`
                      : "Click to upload venue images"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
            >
              {isSubmitting ? "Submitting..." : "Submit Venue"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-400">
              <CheckCircle className="h-6 w-6 mr-2" />
              Venue Submitted Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300">
              Your venue has been submitted for review. We'll notify you once it's approved and live on the platform.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-sm">Review typically takes 24-48 hours</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={resetForm} className="flex-1 bg-green-500 hover:bg-green-600 text-black">
                Submit Another Venue
              </Button>
              <Link href="/profile?tab=submissions" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  View Pending Submissions
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
