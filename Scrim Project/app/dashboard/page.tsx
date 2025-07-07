"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Trophy,
  MapPin,
  User,
  Bell,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Activity,
  Star,
  Calendar,
} from "lucide-react"

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
    date: "2024-02-15",
    prizePool: 50000,
  },
  {
    id: 2,
    name: "Valorant Masters Cup",
    game: "Valorant",
    date: "2024-02-20",
    prizePool: 25000,
  },
]

const mySubmissions = [
  {
    id: 1,
    type: "tournament",
    name: "Local CS2 Tournament",
    status: "approved",
    submittedDate: "2024-01-15",
  },
  {
    id: 2,
    type: "venue",
    name: "Gaming Lounge Pro",
    status: "pending",
    submittedDate: "2024-01-20",
  },
  {
    id: 3,
    type: "tournament",
    name: "Valorant Weekly Cup",
    status: "rejected",
    submittedDate: "2024-01-10",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "favorite",
    action: "Added GameZone Arena to favorites",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "submission",
    action: "Submitted Gaming Lounge Pro for review",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    type: "tournament",
    action: "Registered for CS2 Championship",
    timestamp: "3 days ago",
  },
]

export default function DashboardPage() {
  const [profile, setProfile] = useState({
    username: "GamerPro123",
    email: "gamer@example.com",
    location: "Tech City, CA",
  })

  const [notifications, setNotifications] = useState({
    tournaments: true,
    venues: true,
    submissions: true,
    marketing: false,
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-green-400">{profile.username}</span>
          </h1>
          <p className="text-gray-300">Manage your gaming preferences and submissions</p>
        </div>

        <Tabs defaultValue="favorites" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="favorites" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
            >
              <Trophy className="h-4 w-4 mr-2" />
              My Submissions
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Favorite Venues */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2 text-green-400" />
                    Favorite Venues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favoriteVenues.map((venue) => (
                    <div key={venue.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                      <img
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{venue.name}</h3>
                        <p className="text-sm text-gray-400">{venue.address}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300 ml-1">{venue.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  ))}
                  {favoriteVenues.length === 0 && (
                    <p className="text-gray-400 text-center py-4">No favorite venues yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Favorite Tournaments */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Trophy className="h-5 w-5 mr-2 text-red-400" />
                    Favorite Tournaments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favoriteTournaments.map((tournament) => (
                    <div key={tournament.id} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{tournament.name}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                              {tournament.game}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(tournament.date).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm text-green-400 mt-1">
                            ${tournament.prizePool.toLocaleString()} prize pool
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {favoriteTournaments.length === 0 && (
                    <p className="text-gray-400 text-center py-4">No favorite tournaments yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">My Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mySubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        {submission.type === "tournament" ? (
                          <Trophy className="h-8 w-8 text-red-400" />
                        ) : (
                          <MapPin className="h-8 w-8 text-green-400" />
                        )}
                        <div>
                          <h3 className="font-semibold text-white">{submission.name}</h3>
                          <p className="text-sm text-gray-400">
                            Submitted on {new Date(submission.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className={getStatusColor(submission.status)}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {mySubmissions.length === 0 && <p className="text-gray-400 text-center py-8">No submissions yet</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Settings className="h-5 w-5 mr-2" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-black">Save Changes</Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Tournament Updates</Label>
                      <p className="text-sm text-gray-400">Get notified about new tournaments</p>
                    </div>
                    <Switch
                      checked={notifications.tournaments}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, tournaments: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Venue Updates</Label>
                      <p className="text-sm text-gray-400">Get notified about new venues</p>
                    </div>
                    <Switch
                      checked={notifications.venues}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, venues: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Submission Status</Label>
                      <p className="text-sm text-gray-400">Updates on your submissions</p>
                    </div>
                    <Switch
                      checked={notifications.submissions}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, submissions: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Marketing</Label>
                      <p className="text-sm text-gray-400">Promotional emails and offers</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  {recentActivity.length === 0 && <p className="text-gray-400 text-center py-8">No recent activity</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
