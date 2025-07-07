"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, DollarSign } from "lucide-react"

interface Tournament {
  id: number
  name: string
  game: string
  prizePool: number
  date: string
  time: string
}

interface TournamentCalendarProps {
  tournaments: Tournament[]
}

export function TournamentCalendar({ tournaments }: TournamentCalendarProps) {
  // Group tournaments by date
  const tournamentsByDate = tournaments.reduce(
    (acc, tournament) => {
      const date = tournament.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(tournament)
      return acc
    },
    {} as Record<string, Tournament[]>,
  )

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Calendar className="h-5 w-5 mr-2" />
          Tournament Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(tournamentsByDate).map(([date, dayTournaments]) => (
            <div key={date}>
              <h3 className="text-lg font-semibold text-white mb-3">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="space-y-3">
                {dayTournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-red-400/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{tournament.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                            {tournament.game}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            <DollarSign className="h-3 w-3 mr-1" />${tournament.prizePool.toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">{tournament.time}</div>
                        <Trophy className="h-5 w-5 text-red-400 ml-auto mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(tournamentsByDate).length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No tournaments scheduled</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
