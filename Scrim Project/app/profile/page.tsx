"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Mock data
const favoriteVenues = [
  {
    id: 1,
    name: "GameZone Arena",
    address: "123 Gaming St, Tech City",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    name: "Cyber Cafe Elite",
    address: "456 Esports Ave, Gaming District",
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const favoriteTournaments = [
  {
    id: 1,
    name: "CS2 Championship Series",
    game: "CS2",
    date: "2024-03-15",
    prizePool: 50000,
  },
  {
    id: 2,
    name: "Valorant Masters Cup",
    game: "Valorant",
    date: "2024-03-20",
    prizePool: 25000,
  },
]

const mySubmissions = [
  {
    id: 1,
    type: "tournament",
    name: "Local CS2 Tournament",
    status: "approved",
    submittedDate: "2024-02-15",
  },
  {
    id: 2,
    type: "venue",
    name: "Gaming Lounge Pro",
    status: "pending",
    submittedDate: "2024-02-20",
  },
  {
    id: 3,
    type: "tournament",
    name: "Valorant Weekly Cup",
    status: "rejected",
    submittedDate: "2024-02-10",
    rejectionReason: "Insufficient prize pool documentation",
  },
]

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("favorites")
  const [profile, setProfile] = useState({
    username: "GamerPro123",
    email: "gamer@example.com",
    location: "Tech City, CA",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [notifications, setNotifications] = useState({
    tournaments: true,
    venues: true,
    submissions: true,
    marketing: false,
  })

  useEffect(() => {
    const tab = searchParams?.get("tab")
    if (tab === "favorites" || tab === "submissions" || tab === "settings") {
      setActiveTab(tab)
    }
  }, [searchParams])

  const getStatusIcon = (status: string)
