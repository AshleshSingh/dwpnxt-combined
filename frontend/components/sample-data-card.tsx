"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet } from "lucide-react"

export function SampleDataCard() {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/sample-tickets.csv"
    link.download = "sample-tickets.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
          Sample Data
        </CardTitle>
        <CardDescription>Download sample IT ticket data to test the analysis features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <p>
              <strong>30 sample tickets</strong> with realistic data:
            </p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Hardware, Software, Network, Access categories</li>
              <li>• Priority levels and resolution times</li>
              <li>• Customer satisfaction scores</li>
              <li>• Assigned technicians and descriptions</li>
            </ul>
          </div>
          <Button onClick={handleDownload} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Sample CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
