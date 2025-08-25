import { LandscapeForm } from "@/components/landscape-form"

export default function LandscapePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black text-foreground mb-4">IT Landscape Assessment</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us understand your current IT tool landscape across key categories. This information will be used to
            provide tailored automation recommendations.
          </p>
        </div>
        <LandscapeForm />
      </div>
    </div>
  )
}
