"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TournamentSubmissionForm } from "@/components/tournament-submission-form"
import { VenueSubmissionForm } from "@/components/venue-submission-form"
import { Trophy, MapPin } from "lucide-react"

export default function SubmitPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("tournament")

  useEffect(() => {
    const tab = searchParams?.get("tab")
    if (tab === "venue" || tab === "tournament") {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Submit to <span className="text-blue-400">EsportsHub</span>
          </h1>
          <p className="text-gray-300 text-lg">Add tournaments and venues to help grow the gaming community</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border-gray-800 mb-8">
            <TabsTrigger
              value="tournament"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Add Tournament
            </TabsTrigger>
            <TabsTrigger
              value="venue"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Add Venue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tournament">
            <TournamentSubmissionForm />
          </TabsContent>

          <TabsContent value="venue">
            <VenueSubmissionForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
