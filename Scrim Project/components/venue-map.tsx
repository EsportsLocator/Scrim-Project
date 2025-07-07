"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"

interface Venue {
  id: number
  name: string
  address: string
  rating: number
  coordinates: { lat: number; lng: number }
}

interface VenueMapProps {
  venues: Venue[]
}

export function VenueMap({ venues }: VenueMapProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 h-[600px]">
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden">
          {/* Map placeholder - in a real app, you'd integrate with Google Maps, Mapbox, etc. */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
              <p className="text-gray-400">Map integration would go here</p>
              <p className="text-sm text-gray-500 mt-2">Showing {venues.length} venues</p>
            </div>
          </div>

          {/* Mock venue markers */}
          {venues.slice(0, 3).map((venue, index) => (
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
  )
}
