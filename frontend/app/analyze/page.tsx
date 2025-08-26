"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, AlertTriangle, BarChart3, Brain, FileText, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalysisResult {
  summary: {
    overallSentiment: string
    totalTickets: number
    avgResolutionTime: number
    slaBreaches: number
    keyThemes: string[]
    priorityActions: string[]
  }
  trends: Array<{ month: string; tickets: number }>
  categories: Array<{
    Driver: string
    Tickets: number
    Median_AHT: number
    SLA_Breach_%: number
  }>
}

export default function AnalyzePage() {
  const searchParams = useSearchParams()
  const fileUrl = searchParams.get("file")
  const filename = searchParams.get("filename")

  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (fileUrl && filename) {
      startAnalysis()
    }
  }, [fileUrl, filename])

  const startAnalysis = async () => {
    if (!fileUrl || !filename) return

    setAnalyzing(true)
    setError(null)
    setProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 500)

      const fileResponse = await fetch(fileUrl)
      const blob = await fileResponse.blob()
      const formData = new FormData()
      formData.append("file", blob, filename)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const analysisResult = await response.json()
      setResult(analysisResult)
    } catch (err) {
      setError("Failed to analyze file. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setAnalyzing(false)
    }
  }

  if (!fileUrl || !filename) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No file specified for analysis. Please upload a file first.</AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Link href="/upload" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ← Back to Upload
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Analysis Results</h1>
          <p className="text-xl text-slate-600">
            Analyzing: <span className="font-medium text-slate-900">{filename}</span>
          </p>
        </div>

        {analyzing && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-900 font-serif flex items-center justify-center gap-2">
                <Brain className="h-6 w-6 text-emerald-600" />
                AI Analysis in Progress
              </CardTitle>
              <CardDescription>Processing your data and generating insights...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-slate-600">{Math.round(progress)}% Complete</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-emerald-600" />
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{result.summary.totalTickets}</p>
                      <p className="text-sm text-slate-600">Total Tickets</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{result.summary.avgResolutionTime}h</p>
                      <p className="text-sm text-slate-600">Avg Resolution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{result.categories.length}</p>
                      <p className="text-sm text-slate-600">Categories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{result.summary.slaBreaches}</p>
                      <p className="text-sm text-slate-600">SLA Breaches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trends and Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Ticket Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="tickets" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {result.categories.slice(0, 5).map((cat, index) => (
                      <li key={index} className="flex items-center justify-between text-sm text-slate-600">
                        <span className="font-medium text-slate-900">{cat.Driver}</span>
                        <span>{cat.Tickets}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Themes and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Key Themes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.summary.keyThemes.map((theme, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Priority Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {result.summary.priorityActions.map((action, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center pt-6">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 mr-4">
                <Link href="/dashboard">View Full Dashboard</Link>
              </Button>
              <Link href="/upload" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Analyze Another File
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
