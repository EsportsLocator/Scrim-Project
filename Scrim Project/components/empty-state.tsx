"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Icon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button
          variant="outline"
          onClick={onAction}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
