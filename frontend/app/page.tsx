import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Brain, FileText, Zap, Shield, Target } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-serif font-black text-foreground">DWPNxt</h1>
            </div>
            <Badge variant="secondary" className="hidden md:flex">
              Enterprise Preview
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6">
            AI-Powered IT Service Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-foreground mb-6 leading-tight">
            Transform Your IT Operations with <span className="text-primary">Intelligent Analysis</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            DWPNxt analyzes your IT landscape and ticket data to uncover automation opportunities, identify patterns,
            and provide actionable insights that drive operational excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/landscape">
                Start Landscape Intake
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/upload">
                Upload Tickets
                <FileText className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Enterprise Security
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Real-time Analysis
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Actionable Insights
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Comprehensive IT Analysis Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From landscape assessment to automated insights, DWPNxt provides the tools you need to optimize your IT
              operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Landscape Mapping</CardTitle>
                <CardDescription>
                  Comprehensive tool inventory across DEX, ITSM, RPA, IDP, and more categories
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-serif">AI-Powered Insights</CardTitle>
                <CardDescription>
                  Advanced pattern recognition and automation opportunity discovery using AI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Ticket Analysis</CardTitle>
                <CardDescription>
                  Deep dive into ticket patterns, categories, and resolution opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="font-serif">Automation Roadmap</CardTitle>
                <CardDescription>
                  Prioritized automation opportunities with impact and feasibility scoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-chart-4" />
                </div>
                <CardTitle className="font-serif">PowerShell Generation</CardTitle>
                <CardDescription>Ready-to-use automation scripts with safety checks and documentation</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-5/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-chart-5" />
                </div>
                <CardTitle className="font-serif">Enterprise Ready</CardTitle>
                <CardDescription>Secure, scalable, and designed for enterprise IT environments</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-serif font-bold text-foreground">DWPNxt</span>
          </div>
          <p className="text-muted-foreground">Enterprise IT Service Management Analysis Platform</p>
        </div>
      </footer>
    </div>
  )
}
