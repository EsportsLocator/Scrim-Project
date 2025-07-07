import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function VenueSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="bg-gray-900/50 border-gray-800 text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Venue Submitted!</h1>
              <p className="text-gray-300">
                Your venue has been submitted for review. We'll notify you once it's approved.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <MapPin className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 text-sm">Review typically takes 24-48 hours</p>
            </div>

            <div className="space-y-3">
              <Link href="/submit/venue">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black">Submit Another Venue</Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  View My Submissions
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
