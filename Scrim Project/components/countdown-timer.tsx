"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft(null)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) {
    return (
      <div className="flex items-center text-sm text-gray-400">
        <Clock className="h-4 w-4 mr-1" />
        Tournament Started
      </div>
    )
  }

  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
      <div className="flex items-center text-sm text-blue-400 mb-1">
        <Clock className="h-4 w-4 mr-1" />
        Starts in:
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs text-gray-400">Days</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs text-gray-400">Hours</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-400">Min</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-400">Sec</div>
        </div>
      </div>
    </div>
  )
}
