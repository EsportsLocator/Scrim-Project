"use client"

import { useState, useEffect } from "react"

interface CounterAnimationProps {
  end: number
  duration: number
  start?: number
}

export function CounterAnimation({ end, duration, start = 0 }: CounterAnimationProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * (end - start) + start))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])

  return <span>{count.toLocaleString()}</span>
}
